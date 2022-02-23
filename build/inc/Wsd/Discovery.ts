import {XMLParser} from 'fast-xml-parser';
import {scheduleJob} from 'node-schedule';
import {Common} from './Common';
import {Device} from './Device';
import {UdpBroadcast} from './Protocol/UdpBroadcast';

/**
 * Discovery
 */
export class Discovery {

    /**
     * udp broadcast
     * @protected
     */
    protected _udpb: UdpBroadcast;

    /**
     * founding devices
     * @protected
     */
    protected _devices: Map<string, Device> = new Map<string, Device>();

    /**
     * constructor
     * @param ip
     */
    constructor(ip: string|null = null) {
        this._udpb = new UdpBroadcast(ip);
        this._udpb.setOnMessage((msg) => {
            this._reciveProbeMatch(msg.toString());
        });

        scheduleJob('*/1 * * * *', async() => {
            this.sendProbe();
        });
    }

    /**
     * _reciveProbeMatch
     * @param msg
     * @protected
     */
    protected _reciveProbeMatch(msg: string): void {
        if (msg) {
            const options = {
                removeNSPrefix: true
            };

            let NSPrefix = 'soap';

            if (msg.indexOf('SOAP-ENV')) {
                NSPrefix = 'SOAP-ENV';
            }

            const parser = new XMLParser(options);
            const xmlObj = parser.parse(msg);

            if (typeof xmlObj.Envelope !== 'undefined') {
                const envelope = xmlObj.Envelope;

                if (typeof envelope.Body !== 'undefined') {
                    const body = envelope.Body;

                    if (typeof body.ProbeMatches !== 'undefined') {
                        const matches = body.ProbeMatches;

                        if (typeof matches.ProbeMatch !== 'undefined') {
                            const match = matches.ProbeMatch;

                            const wsaAddress = match.EndpointReference.Address;

                            if (this._devices.has(wsaAddress)) {
                                this._devices.delete(wsaAddress);
                            }

                            this._devices.set(wsaAddress, {
                                address: wsaAddress,
                                types: match.Types as string,
                                xaddrs: match.XAddrs as string,
                                scopes: match.Scopes as string,
                                metadataversion: match.MetadataVersion as number,
                                NSPrefix
                            });
                        }
                    }
                }
            }
            console.log(xmlObj);
        }
    }

    /**
     * sendProbe
     * @protected
     */
    protected sendProbe(): void {
        const msgid = Common.getNewMsgId();
        const msg = '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wsd="http://schemas.xmlsoap.org/ws/2005/04/discovery" xmlns:wsdp="http://schemas.xmlsoap.org/ws/2006/02/devprof">\n' +
            '   <soap:Header>\n' +
            '       <wsa:To>urn:schemas-xmlsoap-org:ws:2005:04:discovery</wsa:To>\n' +
            '       <wsa:Action>http://schemas.xmlsoap.org/ws/2005/04/discovery/Probe</wsa:Action>\n' +
            `       <wsa:MessageID>urn:${msgid}</wsa:MessageID>\n` +
            '   </soap:Header>\n' +
            '   <soap:Body>\n' +
            '       <wsd:Probe>\n' +
            '           <wsd:Types>wsdp:Device</wsd:Types>\n' +
            '       </wsd:Probe>\n' +
            '   </soap:Body>\n' +
            '</soap:Envelope>';

        this._udpb.sendMsg(msg);
    }

    /**
     * getDevices
     */
    public getDevices(): Device[] {
        const list: Device[] = [];

        for (const device of this._devices.values()) {
            list.push(device);
        }

        return list;
    }

}