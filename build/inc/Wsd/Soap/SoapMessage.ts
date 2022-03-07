import {IXmlObject} from './Base/IXmlObject';
import {Envelope} from './Envelope/Envelope';

/**
 * SoapMessage
 */
export class SoapMessage implements IXmlObject {

    /**
     * envelope
     * @protected
     */
    protected _envelope: Envelope = new Envelope();

    /**
     * getEnvelope
     */
    public getEnvelope(): Envelope {
        return this._envelope;
    }

    /**
     * generate
     * @param index
     */
    public generate(index: number = 0): string {
        let content = '<?xml version="1.0" encoding="utf-8"?>\n';

        content += this._envelope.generate(index);

        return content;
    }

}