import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Address} from './Address';
import {Wsa} from './Wsa';

/**
 * From
 */
export class From implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'From';

    /**
     * action
     * @protected
     */
    protected _address: Address;

    /**
     * constructor
     * @param address
     */
    constructor(address: Address) {
        this._address = address;
    }

    /**
     * getAddress
     */
    public getAddress(): Address {
        return this._address;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag(Wsa.PREFIX, From.TAG, this._address.generate(index + 1), index);
    }

}