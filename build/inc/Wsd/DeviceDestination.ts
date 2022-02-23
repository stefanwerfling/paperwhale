/**
 * DeviceDestinationClientContext
 */
export enum DeviceDestinationClientContext {
    Scan = 'Scan',
    ScanToPrint = 'ScanToPrint',
    ScanToEmail = 'ScanToEmail',
    ScanToFax = 'ScanToFax',
    ScanToOCR = 'ScanToOCR'
}

/**
 * DeviceDestination
 */
export type DeviceDestination = {
    clientDisplayName: string;
    clientContext: DeviceDestinationClientContext|string;
};