import {XMLParser} from 'fast-xml-parser';
import {scheduleJob} from 'node-schedule';
import {Device} from './Device';
import {UdpBroadcast} from './Protocol/UdpBroadcast';
import {SoapMessage} from './Soap/SoapMessage';
import {Action} from './Soap/Wsa/Action';
import {MessageID} from './Soap/Wsa/MessageID';
import {To} from './Soap/Wsa/To';
import {Probe} from './Soap/Wsd/Probe';
import {WsdTypes} from './Soap/Wsd/WsdTypes';

/**
 * Discovery
 * @see https://github.com/shengjuntu/onvif-discovery/blob/master/wsddapi.c
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
        console.log('WSD-Discovery: recive ProbeMatches');

        if (msg) {
            const options = {
                removeNSPrefix: true
            };

            let NSPrefix = 'soap';

            if (msg.indexOf('SOAP-ENV') > -1) {
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

                            console.log(`WSD-Discovery: add/update device: '${wsaAddress}' xaddres: '${match.XAddrs}' Types: '${match.Types}'`);
                        }
                    }
                }
            }
        }
    }

    /**
     * sendProbe
     * @protected
     */
    protected sendProbe(): void {
        const soapMsg = new SoapMessage();

        soapMsg.getEnvelope().addSchema('soap', 'http://www.w3.org/2003/05/soap-envelope');
        soapMsg.getEnvelope().addSchema('wsa', 'http://schemas.xmlsoap.org/ws/2004/08/addressing');
        soapMsg.getEnvelope().addSchema('wsd', 'http://schemas.xmlsoap.org/ws/2005/04/discovery');
        soapMsg.getEnvelope().addSchema('wsdp', 'http://schemas.xmlsoap.org/ws/2006/02/devprof');

        const header = soapMsg.getEnvelope().getHeader();
        header.addEntrie(new To('urn:schemas-xmlsoap-org:ws:2005:04:discovery'));
        header.addEntrie(new Action('http://schemas.xmlsoap.org/ws/2005/04/discovery/Probe'));
        header.addEntrie(new MessageID());

        const prob = new Probe();
        prob.getTypes().setType(WsdTypes.Device);
        soapMsg.getEnvelope().getBody().addEntrie(prob);

        this._udpb.sendMsg(soapMsg.generate());

        console.log('WSD-Discovery: send Probe');
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