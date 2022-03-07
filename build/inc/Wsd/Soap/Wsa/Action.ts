import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Wsa} from './Wsa';

/**
 * Action
 */
export class Action implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Action';

    /**
     * action
     * @protected
     */
    protected _action: string = '';

    /**
     * constructor
     * @param action
     */
    constructor(action: string) {
        this._action = action;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag(Wsa.PREFIX, Action.TAG, this._action, index);
    }

}