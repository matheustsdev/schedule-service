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

    static async header() {
        const screenWidth = window.innerWidth

        window.addEventListener("resize", () => {                        
            if(screenWidth <= 768 && window.innerWidth > 768 || screenWidth > 768 && window.innerWidth <= 768) {
                window.location.reload()
            }
        })

        // Header html text
        const headerText = await fetch(`/Frontend/src/components/header/${screenWidth <= 768 ? "mobile" : "desktop"}.html`).then(res => res.text())

        // Nav html text
        const navStart = String(headerText).search(/<nav id="header">/g)
        const navEnd = String(headerText).search(/<\/nav>/g)

        const nav = String(headerText).slice(navStart, navEnd+6)

        // Style html text
        const styleStart = String(headerText).search(/<link rel="stylesheet"/g)
        const styleEnd = String(headerText).search(/.css">/g)
        
        const style = String(headerText).slice(styleStart, styleEnd+6)
        
        // Elements query
        const headerElement = document.querySelector("header")
        const headElement = document.querySelector("head")

        // HTML injection
        this.append(headElement, style)
        this.inner(headerElement, nav)

        // Header script
        if( screen.width <= 768) {
            document.querySelector("#header button").addEventListener("click", () => {
                const openHeader = document.querySelector("#header")

                openHeader.classList.toggle("active")
            })

            document.querySelector("#header ul img").addEventListener("click", () => {
                const closeHeader = document.querySelector("#header")

                closeHeader.classList.toggle("active")
            })
        }

        
    }

    static head (html) {
        const head = document.querySelector("head")

        const headContent = this.getOnlyHead(html)

        head.innerHTML = headContent;
    }

    static inner(element, html) {
        element.innerHTML = html;
    }

    static addScriptTag(element, html) {
        const scriptTag = this.getOnlyScripts(html)

        element.innerHTML += scriptTag;
    }
        
    static append(element, html) {

        element.innerHTML += html;
    }

    static prepend(element, html) {
        const htmlContent = this.getOnlyBody(html)

        element.innerHTML = htmlContent + element.innerHTML;
    }
}