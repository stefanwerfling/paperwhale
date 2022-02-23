import {scheduleJob} from 'node-schedule';
import {DeviceInfo} from './DeviceInfo';
import {Discovery} from './Discovery';
import {Subscribe} from './Subscribe';

/**
 * Wsd
 */
export class Wsd {

    /**
     * wsd service id
     * @protected
     */
    protected _serviceId = 'e802b4da-1f68-e3ee-13d7-96ac62e9bbb9';

    /**
     * discovery
     * @protected
     */
    protected _discovery: Discovery;

    /**
     * devices info
     * @protected
     */
    protected _deviceInfos: DeviceInfo[] = [];

    /**
     * constructor
     */
    constructor() {
        this._discovery = new Discovery();
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
                await subscribe.send(deviceInfo, this._serviceId);
            }
        }
    }

    /**
     * listen
     */
    public listen(): void {
        // first send
        this._sendSubscribe();

        // interval sending
        scheduleJob('*/1 * * * *', async() => {
            await this._sendSubscribe();
        });
    }

}