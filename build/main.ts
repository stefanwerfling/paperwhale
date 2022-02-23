import {DeviceDestinationClientContext} from './inc/Wsd/DeviceDestination';
import {Wsd} from './inc/Wsd/Wsd';

/**
 *
 */
(async(): Promise<void> => {
    const wsd = new Wsd();

    wsd.addDeviceInfo({
        identId: 'cf812aee-d68f-4368-97ac-a341191afac5',
        expires: 1,
        endto: 'http://192.168.0.123:5357/endto/',
        notifyto: 'http://192.168.0.123:5357/notifyto/',
        destinations: [{
            clientDisplayName: 'Paperwhale-Document',
            clientContext: DeviceDestinationClientContext.Scan
        }]
    });

    wsd.addDeviceInfo({
        identId: 'df975389-d4d5-47d8-ba14-707b0c467c27',
        expires: 1,
        endto: 'http://192.168.0.123:5357/endto/',
        notifyto: 'http://192.168.0.123:5357/notifyto/',
        destinations: [{
            clientDisplayName: 'Paperwhale-Stb',
            clientContext: DeviceDestinationClientContext.Scan
        }]
    });

    wsd.listen();
})();