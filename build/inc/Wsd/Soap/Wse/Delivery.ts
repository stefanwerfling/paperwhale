import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Wse} from './Wse';

/**
 * Delivery
 */
export class Delivery implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Delivery';

    /**
     * attributs
     * @protected
     */
    protected _attributs: Map<string, string> = new Map<string, string>();

    /**
     * entires
     * @protected
     */
    protected _entries: IXmlObject[] = [];

    /**
     * addAttribut
     * @param name
     * @param value
     */
    public addAttribut(name: string, value: string): void {
        this._attributs.set(name, value);
    }

    /**
     * addEntrie
     * @param entrie
     */
    public addEntrie(entrie: IXmlObject): void {
        this._entries.push(entrie);
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

        let content = '';

        for (const entrie of this._entries) {
            content += entrie.generate(index + 1);
        }

        return XmlHelper.elementTag(Wse.PREFIX, Delivery.TAG, content, index, attributs);
    }

}