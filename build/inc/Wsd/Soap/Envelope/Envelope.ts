import {IXmlObject} from '../Base/IXmlObject';
import {XmlHelper} from '../Base/XmlHelper';
import {Body} from './Body';
import {Header} from './Header';

/**
 * Envelope
 */
export class Envelope implements IXmlObject {

    /**
     * TAG
     */
    public static TAG = 'Envelope';

    /**
     * default prefix
     * @protected
     */
    protected _prefix: string = 'soap';

    /**
     * schemas
     * @protected
     */
    protected _schemas: Map<string, string> = new Map<string, string>();

    /**
     * header
     * @protected
     */
    protected _header: Header = new Header();

    /**
     * body
     * @protected
     */
    protected _body: Body = new Body();

    /**
     * setPrefix
     * @param prefix
     */
    public setPrefix(prefix: string): void {
        this._prefix = prefix;
    }

    /**
     * addSchema
     * @param name
     * @param url
     * @protected
     */
    public addSchema(name: string, url: string): void {
        this._schemas.set(name, url);
    }

    /**
     * getHeader
     */
    public getHeader(): Header {
        return this._header;
    }

    /**
     * getBody
     */
    public getBody(): Body {
        return this._body;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number): string {
        this._header.setPrfix(this._prefix);
        this._body.setPrfix(this._prefix);

        let content = this._header.generate(index + 1);
        content += '\n';
        content += this._body.generate(index + 1);

        let attribute = '';

        this._schemas.forEach((value, key) => {
            attribute += ` xmlns:${key}="${value}"`;
        });

        return XmlHelper.elementTag(this._prefix, Envelope.TAG, content, index, attribute);
    }

}