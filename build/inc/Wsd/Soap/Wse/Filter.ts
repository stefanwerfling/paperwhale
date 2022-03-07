import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Wse} from './Wse';

/**
 * Filter
 */
export class Filter implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Filter';

    /**
     * value
     * @protected
     */
    protected _value: string = '';

    /**
     * attributs
     * @protected
     */
    protected _attributs: Map<string, string> = new Map<string, string>();

    /**
     * addAttribut
     * @param name
     * @param value
     */
    public addAttribut(name: string, value: string): void {
        this._attributs.set(name, value);
    }

    /**
     * setValue
     * @param value
     */
    public setValue(value: string): void {
        this._value = value;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        let attributs = '';

        this._attributs.forEach((value, key) => {
            attributs += ` ${key}="${value}"`;
        });

        return XmlHelper.elementTag(Wse.PREFIX, Filter.TAG, this._value, index, attributs);
    }
}