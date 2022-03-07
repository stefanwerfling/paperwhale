import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';

/**
 * Header
 */
export class Header implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Header';

    /**
     * default prefix
     * @protected
     */
    protected _prefix: string = 'soap';

    /**
     * entires
     * @protected
     */
    protected _entries: IXmlObject[] = [];

    /**
     * setPrfix
     * @param prefix
     */
    public setPrfix(prefix: string): void {
        this._prefix = prefix;
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
        let content = '';

        for (const entrie of this._entries) {
            content += entrie.generate(index + 1);
        }

        return XmlHelper.elementTag(this._prefix, Header.TAG, content, index);
    }

}