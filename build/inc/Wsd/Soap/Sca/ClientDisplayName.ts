import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Sca} from './Sca';

/**
 * ClientDisplayName
 */
export class ClientDisplayName implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'ClientDisplayName';

    /**
     * action
     * @protected
     */
    protected _name: string = '';

    /**
     * constructor
     * @param name
     */
    constructor(name: string) {
        this._name = name;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag(Sca.PREFIX, ClientDisplayName.TAG, this._name, index);
    }

}