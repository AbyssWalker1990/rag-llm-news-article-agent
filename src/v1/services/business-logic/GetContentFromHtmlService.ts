import { JSDOM } from 'jsdom'

class GetContentFromHtmlService {
    public handle(html: JSDOM): { title: string; textContent: string } {
        const { document } = html.window
        const title = document.querySelector('title')?.textContent?.trim() || ''
        const textContent = this.extractText(document.body)

        return { title, textContent }
    }

    private extractText(element: Node): string {
        let text = ''

        if (element.nodeName.toLowerCase() === 'script' || element.nodeName.toLowerCase() === 'style') {
            return ''
        }

        element.childNodes.forEach((childNode: Node) => {
            if (childNode.nodeType === 3 && childNode.textContent?.trim() !== '') {
                text += childNode.textContent?.replace(/\s+/g, ' ').trim() + '\n' || ''
            } else if (childNode.nodeType === 1) {
                text += this.extractText(childNode)
            }
        })

        return text
    }
}

export default GetContentFromHtmlService
