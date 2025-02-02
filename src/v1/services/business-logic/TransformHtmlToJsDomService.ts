import { JSDOM } from 'jsdom'

class TransformHtmlToJsDomService {
    public handle(html: string): JSDOM {
        const jsdom = new JSDOM(html, {
            url: 'http://localhost',
        })

        return jsdom
    }
}

export default TransformHtmlToJsDomService
