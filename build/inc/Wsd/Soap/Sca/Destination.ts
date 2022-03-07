import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Sca} from './Sca';

/**
 * Destination
 */
export class Destination implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'ScanDestination';

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
    public generate(index: number = 0): string {
        let content = '';

        for (const entrie of this._entries) {
            content += entrie.generate(index + 1);
        }

        return XmlHelper.elementTag(Sca.PREFIX, Destination.TAG, content, index);
    }

}