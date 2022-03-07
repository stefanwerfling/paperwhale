/**
 * XmlHelper
 */
export class XmlHelper {

    /**
     * elementTag
     * @param prefix
     * @param tag
     * @param content
     * @param index
     */
    public static elementTag(prefix: string, tag: string, content: string, index: number = 0, attribute: string|null = null): string {
        const tabs = '\t'.repeat(index);
        let attrStr = '';

        if (attribute !== null) {
            attrStr = ` ${attribute}`;
        }

        return `${tabs}<${prefix}:${tag}${attrStr}>${content}</${prefix}:${tag}>`;
    }

}