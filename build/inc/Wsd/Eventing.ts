import {Common} from './Common';
import {Device} from './Device';
import {DeviceDestination} from './DeviceDestination';
import got from 'got';
import {ClientContext} from './Soap/Sca/ClientContext';
import {ClientDisplayName} from './Soap/Sca/ClientDisplayName';
import {Destination} from './Soap/Sca/Destination';
import {Destinations} from './Soap/Sca/Destinations';
import {SoapMessage} from './Soap/SoapMessage';
import {Action} from './Soap/Wsa/Action';
import {Address} from './Soap/Wsa/Address';
import {From} from './Soap/Wsa/From';
import {MessageID} from './Soap/Wsa/MessageID';
import {ReferenceParameters} from './Soap/Wsa/ReferenceParameters';
import {ReplyTo} from './Soap/Wsa/ReplyTo';
import {To} from './Soap/Wsa/To';
import {Delivery} from './Soap/Wse/Delivery';
import {EndTo} from './Soap/Wse/EndTo';
import {Expires} from './Soap/Wse/Expires';
import {Filter} from './Soap/Wse/Filter';
import {Identifier} from './Soap/Wse/Identifier';
import {NotifyTo} from './Soap/Wse/NotifyTo';
import {Subscribe} from './Soap/Wse/Subscribe';

/**
 * SubscribeDeviceInfo
 */
export type SubscribeDeviceInfo = {
    // identification id
    identId: string;
    // display and context
    destinations: DeviceDestination[];
    // expires time in minutes
    expires: number;
    // url to endpoint
    endto: string;
    // url to notify
    notifyto: string;
};

/**
 * subcribe
 */
export class Eventing {

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

    /**
     * sendSubscribe
     * @param deviceInfo
     * @param fromId
     */
    public async sendSubscribe(deviceInfo: SubscribeDeviceInfo, fromId: string): Promise<void> {
        const msgid = Common.getNewMsgId();

        const soapMsg = new SoapMessage();
        soapMsg.getEnvelope().setPrefix(this._device.NSPrefix);
        soapMsg.getEnvelope().addSchema('soap', 'http://www.w3.org/2003/05/soap-envelope');
        soapMsg.getEnvelope().addSchema('wsa', 'http://schemas.xmlsoap.org/ws/2004/08/addressing');
        soapMsg.getEnvelope().addSchema('wse', 'http://schemas.xmlsoap.org/ws/2004/08/eventing');
        soapMsg.getEnvelope().addSchema('sca', 'http://schemas.microsoft.com/windows/2006/08/wdp/scan');

        const header = soapMsg.getEnvelope().getHeader();
        header.addEntrie(new To(`${this._device.xaddrs}/scan`));
        header.addEntrie(new Action('http://schemas.xmlsoap.org/ws/2004/08/eventing/Subscribe'));
        header.addEntrie(new MessageID(`uuid:${msgid}`));
        header.addEntrie(new ReplyTo(new Address('http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous')));
        header.addEntrie(new From(new Address(`urn:uuid:${fromId}`)));

        const endTo = new EndTo();
        endTo.addEntrie(new Address(`${deviceInfo.endto}${deviceInfo.identId}`));

        const refParam = new ReferenceParameters();
        refParam.addEntrie(new Identifier(`urn:uuid:${deviceInfo.identId}`));
        endTo.addEntrie(refParam);

        const delivery = new Delivery();
        delivery.addAttribut('Mode', 'http://schemas.xmlsoap.org/ws/2004/08/eventing/DeliveryModes/Push');

        const notifyTo = new NotifyTo();
        notifyTo.addEntrie(new Address(`${deviceInfo.notifyto}${deviceInfo.identId}`));

        const nrefParam = new ReferenceParameters();
        nrefParam.addEntrie(new Identifier(`urn:uuid:${deviceInfo.identId}`));
        notifyTo.addEntrie(nrefParam);

        delivery.addEntrie(notifyTo);

        const filter = new Filter();
        filter.addAttribut('Dialect', 'http://schemas.xmlsoap.org/ws/2006/02/devprof/Action');
        filter.setValue('http://schemas.microsoft.com/windows/2006/08/wdp/scan/ScanAvailableEvent');

        const subscribe = new Subscribe();
        subscribe.addEntrie(endTo);
        subscribe.addEntrie(delivery);
        subscribe.addEntrie(new Expires());
        subscribe.addEntrie(filter);

        const scanDesList = new Destinations();

        for (const destination of deviceInfo.destinations) {
            const scaDes = new Destination();
            scaDes.addEntrie(new ClientDisplayName(destination.clientDisplayName));
            scaDes.addEntrie(new ClientContext(destination.clientContext));

            scanDesList.addEntrie(scaDes);
        }

        subscribe.addEntrie(scanDesList);
        soapMsg.getEnvelope().getBody().addEntrie(subscribe);

        console.log(`WSD-Subcribe: send to ${this._device.xaddrs}`);

        const msg = soapMsg.generate();

        try {
            const response = await got.post({
                method: 'POST',
                url: `${this._device.xaddrs}/scan`,
                responseType: 'text',
                resolveBodyOnly: false,
                headers: {
                    'Content-Type': 'application/soap+xml',
                    'Connection': 'Keep-Alive',
                    'User-Agent': 'WSDAPI',
                    'Pragma': 'no-cache'
                },
                body: msg
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

}