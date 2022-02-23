import {DeviceDestination} from './DeviceDestination';

/**
 * DeviceInfo
 */
export type DeviceInfo = {
    // identification id
    identId: string;
    // display and context
    destinations: DeviceDestination[];
    // url to endpoint
    endto: string;
    // url to notify
    notifyto: string;
    // expires time in minutes
    expires: number;
};