export class Render {
    static getOnlyBody(html) {
        const bodyStart = String(html).search(/<body>/g)
        const onlyBody = String(html).slice(bodyStart)

        const innerBody = String(onlyBody).replace(/<body>(.*?)<\/body>/g, "")

        const scriptStart = String(innerBody).search(/<script type="module"/g)
        const finalHtml = String(innerBody).slice(8, scriptStart)
        
        return finalHtml
    }

    static getOnlyHead(html) {
        const headStart = String(html).search(/<meta charset="UTF-8">/g)
        const headEnd = String(html).search(/<\/head>/g)

        const innerHead = String(html).slice(headStart, headEnd)

        return innerHead
    }

    static getOnlyScripts(html) {
        const scriptStart = String(html).search(/<script/g)
        const scriptEnd = String(html).search(/<\/script>/g)

        const innerScript = String(html).slice(scriptStart, scriptEnd)

        return innerScript
    }

    static inner(element, html) {
        const htmlContent = this.getOnlyBody(html)
        const head = document.querySelector("head")

        const headContent = this.getOnlyHead(html)

        head.innerHTML = headContent;
        element.innerHTML = htmlContent;
    }

    static addScriptTag(element, html) {
        const scriptTag = this.getOnlyScripts(html)

        element.innerHTML += scriptTag;
    }
        
    static append(element, html) {
        const htmlContent = this.getOnlyBody(html)

        console.log(htmlContent)

        element.innerHTML += htmlContent;
    }

    static prepend(element, html) {
        const htmlContent = this.getOnlyBody(html)

        element.innerHTML = htmlContent + element.innerHTML;
    }
}