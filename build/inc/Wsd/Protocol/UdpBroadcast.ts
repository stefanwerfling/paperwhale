import udp = require('dgram');
import {RemoteInfo, Socket} from 'dgram';

/**
 * UdpBroadcastListner
 */
export type UdpBroadcastListner = (msg: Buffer, rinfo: RemoteInfo) => void;

/**
 * UdpBroadcast
 */
export class UdpBroadcast {

    /**
     * multicast port
     * @protected
     */
    protected _mcastport = 3702;

    /**
     * multicast ip
     * @protected
     */
    protected _mcastip: string = '239.255.255.250';

    /**
     * udp socket
     * @protected
     */
    protected _socket: Socket;

    /**
     * on message
     * @protected
     */
    protected _onMessage: UdpBroadcastListner|null = null;

    /**
     * constructor
     * @param mcastip
     * @param mcastport
     */
    constructor(mcastip: string|null = null, mcastport: number|null = null) {
        if (mcastip !== null) {
            this._mcastip = mcastip;
        }

        if (mcastport !== null) {
            this._mcastport = mcastport;
        }

        this._socket = udp.createSocket({
            type: 'udp4',
            reuseAddr: true
        });

        // this._socket.addMembership(this._mcastip, '192.168.68.115');
        this._socket.bind(this._mcastport);

        this._socket.on('message', (data, rinfo) => {
            if (this._onMessage !== null) {
                this._onMessage(data, rinfo);
            }

            // console.log('Message received from ', rinfo.address, ' : ', data.toString());
        });
    }

    /**
     * setOnMessage
     * @param listner
     */
    public setOnMessage(listner: UdpBroadcastListner): void {
        this._onMessage = listner;
    }

    /**
     * sendMsg
     * @param msg
     */
    public sendMsg(msg: string): void {
        this._socket.send(Buffer.from(msg),
            0,
            msg.length,
            this._mcastport,
            this._mcastip,
            (err: any) => {
                if (err) {
                    console.log(err);
                }
            });
    }

}