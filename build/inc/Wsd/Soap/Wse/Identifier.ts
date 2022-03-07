import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Wse} from './Wse';

/**
 * Identifier
 */
export class Identifier implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Identifier';

    /**
     * id
     * @protected
     */
    protected _id: string;

    /**
     * constructor
     * @param id
     */
    public constructor(id: string) {
        this._id = id;

    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag(Wse.PREFIX, Identifier.TAG, this._id, index);
    }

}