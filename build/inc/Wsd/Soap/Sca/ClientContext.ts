import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Sca} from './Sca';

/**
 * ClientContext
 */
export class ClientContext implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'ClientContext';

    /**
     * context
     * @protected
     */
    protected _context: string = '';

    /**
     * constructor
     * @param context
     */
    constructor(context: string) {
        this._context = context;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        return XmlHelper.elementTag(Sca.PREFIX, ClientContext.TAG, this._context, index);
    }

}