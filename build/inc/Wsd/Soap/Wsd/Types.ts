import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {WsdTypes} from './WsdTypes';

/**
 * Types
 */
export class Types implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Types';

    /**
     * wsd type
     * @protected
     */
    protected _types: WsdTypes[] = [WsdTypes.Device];

    /**
     * setType
     * @param type
     */
    public setType(type: WsdTypes): void {
        this._types = [type];
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag('wsd', Types.TAG, this._types.join(' '), index);
    }

}