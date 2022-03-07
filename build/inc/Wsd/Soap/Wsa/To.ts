import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Wsa} from './Wsa';

/**
 * To
 */
export class To implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'To';

    /**
     * to
     * @protected
     */
    protected _to: string = '';

    /**
     * constructor
     * @param to
     */
    constructor(to: string) {
        this._to = to;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag(Wsa.PREFIX, To.TAG, this._to, index);
    }

}