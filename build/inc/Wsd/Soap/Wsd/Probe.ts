import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Types} from './Types';

/**
 * Probe
 */
export class Probe implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Probe';

    /**
     * types
     * @protected
     */
    protected _types: Types = new Types();

    /**
     * getTypes
     */
    public getTypes(): Types {
        return this._types;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag('wsd', Probe.TAG, this._types.generate(index + 1), index);
    }

}