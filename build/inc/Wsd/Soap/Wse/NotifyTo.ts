import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Wse} from './Wse';

/**
 * NotifyTo
 */
export class NotifyTo implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'NotifyTo';

    /**
     * entires
     * @protected
     */
    protected _entries: IXmlObject[] = [];

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

        return XmlHelper.elementTag(Wse.PREFIX, NotifyTo.TAG, content, index);
    }

}