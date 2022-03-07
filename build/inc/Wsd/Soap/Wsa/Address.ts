import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Wsa} from './Wsa';

/**
 * Address
 */
export class Address implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Address';

    /**
     * address
     * @protected
     */
    protected _address: string = '';

    /**
     * constructor
     * @param address
     */
    constructor(address: string) {
        this._address = address;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag(Wsa.PREFIX, Address.TAG, this._address, index);
    }

}