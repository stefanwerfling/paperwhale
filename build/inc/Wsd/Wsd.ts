import cookieParser from 'cookie-parser';
import {scheduleJob} from 'node-schedule';
import {HttpServer} from '../Server/HttpServer';
import {DeviceInfo} from './DeviceInfo';
import {Discovery} from './Discovery';
import {EndTo} from './Server/EndTo';
import {NotifyTo} from './Server/NotifyTo';
import {Subscribe, SubscribeDeviceInfo} from './Subscribe';

/**
 * Wsd
 */
export class Wsd {

    /**
     * wsd service id
     * @protected
     */
    protected _serviceId: string = 'e802b4da-1f68-e3ee-13d7-96ac62e9bbb9';

    /**
     * host for wsd
     * @protected
     */
    protected _host: string = '';

    /**
     * port
     * default is 5357
     * @protected
     */
    protected _port: number = 5357;

    /**
     * discovery
     * @protected
     */
    protected _discovery: Discovery;

    /**
     * http server
     * @protected
     */
    protected _server: HttpServer;

    /**
     * devices info
     * @protected
     */
    protected _deviceInfos: DeviceInfo[] = [];

    /**
     * constructor
     * @param host
     * @param port
     */
    constructor(host: string, port?: number) {
        this._host = host;

        if (port) {
            this._port = port;
        }

        this._discovery = new Discovery();
        this._server = new HttpServer({
            port: this._port,
            middleWares: [
                cookieParser()
            ],
            routes: [],
            controllers: [
                EndTo,
                NotifyTo
            ]
        });
    }

    /**
     * add device info
     * @param device
     */
    public addDeviceInfo(device: DeviceInfo): void {
        this._deviceInfos.push(device);
    }

    /**
     * _sendSubscribe
     * @protected
     */
    protected async _sendSubscribe(): Promise<void> {
        const devices = this._discovery.getDevices();

        for (const device of devices) {
            for (const deviceInfo of this._deviceInfos) {
                const subscribe = new Subscribe(device);

                const subscribeDevice: SubscribeDeviceInfo = {
                    identId: deviceInfo.identId,
                    destinations: deviceInfo.destinations,
                    expires: deviceInfo.expires,
                    endto: `http://${this._host}:${this._port}/endto/`,
                    notifyto: `http://${this._host}:${this._port}/notifyto/`
                };

                await subscribe.send(subscribeDevice, this._serviceId);
            }
        }
    }

    /**
     * listen
     */
    public listen(): void {
        // start http wsd server
        this._server.listen();

        // first send
        this._sendSubscribe();

        // interval sending
        scheduleJob('*/1 * * * *', async() => {
            await this._sendSubscribe();
        });
    }

}