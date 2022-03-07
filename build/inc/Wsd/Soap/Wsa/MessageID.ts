import {Common} from '../../Common';
import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Wsa} from './Wsa';

/**
 * MessageID
 */
export class MessageID implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'MessageID';

    /**
     * id
     * @protected
     */
    protected _id: string = '';

    /**
     * constructor
     * @param id
     */
    constructor(id?: string) {
        if (id) {
            this._id = `urn:${id}`;
        } else {
            this._id = `urn:${Common.getNewMsgId()}`;
        }
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag(Wsa.PREFIX, MessageID.TAG, this._id, index);
    }

}