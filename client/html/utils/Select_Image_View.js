


export class Select_Image_View {

    /**
     * @param {HTMLElement} parent
     * @param {string[]} images_url 
     * @param {[()=>{}]} callbacks 
     */
    constructor(
        parent,
        images_url,
        callbacks,
        max_width = innerWidth / 2,
        max_height = innerHeight / 2,
    ) {
        this.container = document.createElement('div')
        this.container.classList.add('button')
        parent.appendChild(this.container)

        const on_close = (e) => {
            if (e.composedPath().includes(this.select) === false) {
                this.select.remove()
                removeEventListener('pointerdown', on_close)
            }
        }

        const display_select = (e) => {
            parent.appendChild(this.select)
            let x = e.clientX
            let y = e.clientY

            let column_nb = 10
            this.select.style.gridTemplateColumns = `repeat(${column_nb--}, 1fr)`
            while (this.select.offsetWidth > max_width) {
                this.select.style.gridTemplateColumns = `repeat(${column_nb--}, 1fr)`
            }

            const height = this.select.offsetHeight
            const width = this.select.offsetWidth
            if (x + width > innerWidth) x = innerWidth - width
            if (y + height > innerHeight) y = innerHeight - height

            this.select.style.left = `${x}px`
            this.select.style.top = `${y}px`

            addEventListener('pointerdown', on_close)
        }

        this.container.onclick = display_select

        this.select = document.createElement('div')
        this.select.style.position = 'fixed'
        this.select.style.display = 'grid'
        this.select.style.gridTemplateColumns = 'repeat(10, 1fr)'
        this.select.style.alignItems = 'center'
        this.select.style.justifyItems = 'center'
        this.select.style.maxHeight = `${max_height}px`
        this.select.style.overflowY = 'auto'

        for (let i = 0; i < images_url.length; i++) {
            const url = images_url[i]

            const image = document.createElement('img')
            image.style.width = '50px'
            image.style.padding = '5px'
            image.src = url
            this.select.appendChild(image)

            if (i === 0) this.container.appendChild(image.cloneNode(false))

            image.onclick = () => {
                this.container.innerHTML = ''
                const clone = image.cloneNode(false)
                clone.style.padding = '0'
                this.container.appendChild(clone)
                callbacks[i]()
                this.select.remove()
                removeEventListener('pointerdown', on_close)
            }
        }
    }
}






