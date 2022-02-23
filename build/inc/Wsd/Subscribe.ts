import {Common} from './Common';
import {Device} from './Device';
import {DeviceInfo} from './DeviceInfo';
import got from 'got';

/**
 * subcribe
 */
export class Subscribe {

    /**
     * device
     * @protected
     */
    protected _device: Device;

    /**
     * constructor
     * @param device
     */
    constructor(device: Device) {
        this._device = device;
    }

    public async send(deviceInfo: DeviceInfo, fromId: string): Promise<void> {
        const NSPrefix = this._device.NSPrefix;
        const msgid = Common.getNewMsgId();
        const expire = `PT${deviceInfo.expires}M`;

        let scanDestinations = '';

        for (const destination of deviceInfo.destinations) {
            scanDestinations += `<sca:ScanDestination>
              <sca:ClientDisplayName>${destination.clientDisplayName}</sca:ClientDisplayName>
              <sca:ClientContext>${destination.clientContext}</sca:ClientContext>
            </sca:ScanDestination>`;
        }

        const msg = `<?xml version="1.0" encoding="utf-8"?>
            <${NSPrefix}:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wse="http://schemas.xmlsoap.org/ws/2004/08/eventing" xmlns:sca="http://schemas.microsoft.com/windows/2006/08/wdp/scan">
            <${NSPrefix}:Header>
                <wsa:To>${this._device.xaddrs}</wsa:To>
                <wsa:Action>http://schemas.xmlsoap.org/ws/2004/08/eventing/Subscribe</wsa:Action>
                <wsa:MessageID>urn:${msgid}</wsa:MessageID>
                <wsa:ReplyTo>
                    <wsa:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</wsa:Address>
                </wsa:ReplyTo>
                <wsa:From>
                    <wsa:Address>urn:${fromId}</wsa:Address>
                </wsa:From>
            </${NSPrefix}:Header>
            <${NSPrefix}:Body>
                <wse:Subscribe>
                    <wse:EndTo>
                        <wsa:Address>${deviceInfo.endto}${deviceInfo.identId}</wsa:Address>
                        <wsa:ReferenceParameters>
                            <wse:Identifier>urn:${deviceInfo.identId}</wse:Identifier>
                        </wsa:ReferenceParameters>
                    </wse:EndTo>
                    <wse:Delivery Mode="http://schemas.xmlsoap.org/ws/2004/08/eventing/DeliveryModes/Push">
                        <wse:NotifyTo>
                            <wsa:Address>${deviceInfo.notifyto}${deviceInfo.identId}</wsa:Address>
                            <wsa:ReferenceParameters>
                                <wse:Identifier>urn:${deviceInfo.identId}</wse:Identifier>
                            </wsa:ReferenceParameters>
                        </wse:NotifyTo>
                    </wse:Delivery>
                    <wse:Expires>${expire}</wse:Expires>
                    <wse:Filter Dialect="http://schemas.xmlsoap.org/ws/2006/02/devprof/Action">http://schemas.microsoft.com/windows/2006/08/wdp/scan/ScanAvailableEvent</wse:Filter>
                    <sca:ScanDestinations>
                        ${scanDestinations}
                    </sca:ScanDestinations>
                </wse:Subscribe>
            </${NSPrefix}:Body>
        </${NSPrefix}:Envelope>`;

        const response = await got.post({
            method: 'POST',
            url: `${this._device.xaddrs}/`,
            responseType: 'text',
            resolveBodyOnly: false,
            headers: {
                'Content-Type': 'application/soap+xml; charset="utf-8',
                'Connection': 'Keep-Alive'
            },
            body: msg
        });

        console.log(response.body);
    }

}