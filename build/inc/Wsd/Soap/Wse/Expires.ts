import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Wse} from './Wse';

/**
 * Expires
 */
export class Expires implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Expires';

    /**
     * time
     * @protected
     */
    protected _time: number;

    /**
     * constructor
     * @param time
     */
    public constructor(time: number = 1) {
        this._time = time;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag(Wse.PREFIX, Expires.TAG, `PT${this._time}H`, index);
    }

}