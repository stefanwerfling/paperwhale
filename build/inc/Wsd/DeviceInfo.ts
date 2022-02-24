import {DeviceDestination} from './DeviceDestination';

/**
 * DeviceInfo
 */
export type DeviceInfo = {
    // identification id
    identId: string;
    // display and context
    destinations: DeviceDestination[];
    // expires time in minutes
    expires: number;
};