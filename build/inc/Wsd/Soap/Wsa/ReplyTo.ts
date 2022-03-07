import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Address} from './Address';
import {Wsa} from './Wsa';

/**
 * ReplyTo
 */
export class ReplyTo implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'ReplyTo';

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
        return XmlHelper.elementTag(Wsa.PREFIX, ReplyTo.TAG, this._address.generate(index + 1), index);
    }

}