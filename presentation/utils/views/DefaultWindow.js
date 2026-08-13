import { cbH, createTimeoutBuffer } from '../../../../utils/utils.js'
import { createHTMLElement, setStyle } from '../htmlElement.js'
import { i18nH } from '../i18n.js'
import { pointerMove } from '../input_utils.js'
import { closeIMG } from '../icons/icons.js'
import { STYLE } from '../style/Style.js' 
import { OpacityAnimation } from '../animations/opacityAnimation.js'
import { LOCALSTORAGE_WINDOW_UPGRADE } from '../../../../constants/localStorage.js'

const principalContainer = createHTMLElement('div', {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%', pointerEvents: 'none',
    zIndex: '1',
}, document.body)

const instancesDisplayed = []
// INPUT.defaultCloseCb.add(() => {
//     const l = instancesDisplayed.length
//     if (l > 0) instancesDisplayed[l - 1].close()
// })

export class DefaultHTMLWindow {

    static close_all = () => {
        for (const w of instancesDisplayed) {
            w.close()
        }
    }

    constructor(id) {
        // view
        this.container = createHTMLElement('div', {
            position: 'fixed',
            // maxHeight: '100%',
            // maxWidth: '100%',
            padding: '0',
            background: STYLE.var.colorBackground,
            borderRadius: '3px',
            pointerEvents: 'auto'
        })

        const header = createHTMLElement('div', {
            display: 'flex',
            height: '20px',
            fontSize: '15px',
            alignItems: 'center',
            borderBottom: 'solid 1px var(--color-line)',

            width: `fit-content`,
        }, document.body)

        const move = createHTMLElement('div', { padding: '20px', width: '100%', cursor: 'grab', }, header)
        // moveIMG(14, 14)
        // setStyle(move, header, {
        //     padding: '13px',
        //     cursor: 'grab',
        //     marginLeft: 'auto',
        //     pointerEvents: 'none',
        // })

        const close = closeIMG(14, 14)
        setStyle(close, {
            padding: '13px',
            cursor: 'pointer',
        })

        if (id === LOCALSTORAGE_WINDOW_UPGRADE) { close.id = 'tuto_1_4' }

        header.appendChild(close)

        const contentContainer = createHTMLElement('div', {
            // overflow: 'auto',
            // maxWidth: '100%',
            // width: '100%'
        }, this.container)
        const contentFg = createHTMLElement('div', {
            // overflow: 'auto',
            // maxHeight: 'calc(100% - 30px)',
            // height: 'fit-content',
            // width: 'fit-content'
        }, contentContainer)

        this.container.prepend(header)
        header.style.width = `auto`

        // callback
        this.displayCb = new Set()
        this.closeCb = new Set()
        this.moveCb = new Set()

        // data
        // const id = id || ''
        let x = innerWidth * 0.4
        let y = innerHeight * 0.2

        this.toJson = () => {
            return `{"x":${x.toFixed(0)},"y":${y.toFixed(0)},`
                + `"displayed":${this.container.parentNode ? "true" : "false"}`
                + `}`
        }

        const localStorageSave = createTimeoutBuffer(() => {
            localStorage.setItem(id, this.toJson())
        }, 1000)

        const contentContainer_style = contentContainer.style
        const placement = () => {
            const { width, height } = this.container.getBoundingClientRect()
            if (width < 40 || height < 20) return
            if (height > innerHeight - 10) {
                const new_height = innerHeight - 30
                contentContainer_style.height = new_height + 'px'
                if (y + height > innerHeight) y = innerHeight - height
            } else {
                contentContainer_style.height = ''
                if (y + height > innerHeight) y = innerHeight - height
            }
            if (x + width > innerWidth) x = innerWidth - width
            if (x < 0) x = 0

            if (y < 10) y = 10

            this.container.style.top = y + 'px'
            this.container.style.left = x + 'px'

            localStorageSave()
        }

        addEventListener('resize', placement)

        pointerMove(move, (e, dx, dy) => { x += dx; y += dy; cbH(this.moveCb); placement() })
        //

        const zIndexUpdate = () => {
            for (let i = 0; i < instancesDisplayed.length; i++) {
                const s = instancesDisplayed[i].container.style
                s.backgroundImage = 'none'
                s.zIndex = i
            }
            if (instancesDisplayed.length > 0) {
                instancesDisplayed[0].container.style.backgroundImage =
                    'linear-gradient(rgba(255,255,255,.05), rgba(255,255,255,.05))'
            }
        }

        this.container.addEventListener('pointerdown', () => {
            const index = instancesDisplayed.indexOf(this)
            if (index !== instancesDisplayed.length - 1) {
                instancesDisplayed.splice(index, 1)
                instancesDisplayed.push(this)
                zIndexUpdate()
            }
        }, { capture: true })

        /********************/
        /*      add tab     */
        /********************/
        const openTabCb = {}
        const closeTabCb = {}
        this.addOpenTabCb = (name, cb) => {
            if (!openTabCb[name]) {
                openTabCb[name] = new Set()
            }
            openTabCb[name].add(cb)
        }
        this.addCloseTabCb = (name, cb) => {
            if (!closeTabCb[name]) {
                closeTabCb[name] = new Set()
            }
            closeTabCb[name].add(cb)
        }

        const display_tabs = {}
        let currentTabName
        let currentTabElement
        const resizeObserver = new ResizeObserver(placement)
        this.addTab = (name, div) => {
            const tab = createHTMLElement('div', {
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                cursor: 'pointer'
            })
            header.insertBefore(tab, move)
            i18nH(createHTMLElement('span', {
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                height: '40px', padding: '0 10px', whiteSpace: 'nowrap',
            }, tab), name)
            const active_tab = () => {
                if (currentTabName !== name) {
                    if (closeTabCb[currentTabName]) cbH(closeTabCb[currentTabName])
                    currentTabElement.style.background = ''
                    contentFg.innerHTML = ''
                    currentTabName = name
                    currentTabElement = tab
                    contentFg.appendChild(div)
                    tab.style.background = 'rgba(255, 255, 255, 0.13)'
                    if (openTabCb[name]) cbH(openTabCb[name])
                }
            }
            display_tabs[name] = active_tab
            tab.addEventListener('click', active_tab)

            if (!currentTabName) {
                currentTabName = name
                currentTabElement = tab
                contentFg.appendChild(div)
                tab.style.background = 'rgba(255, 255, 255, 0.13)'
                if (openTabCb[name]) cbH(openTabCb[name])
            }

            resizeObserver.observe(div)
        }

        const opacityAnimation = OpacityAnimation(this.container, principalContainer)
        this.display = (name) => {
            const index = instancesDisplayed.indexOf(this)
            if (index === -1) {
                instancesDisplayed.push(this)
                opacityAnimation.display()
                placement()
                cbH(this.displayCb)
            } else {
                instancesDisplayed.splice(index, 1)
                instancesDisplayed.push(this)
            }
            zIndexUpdate()

            if (openTabCb[currentTabName]) cbH(openTabCb[currentTabName])

            const cb = display_tabs[name]
            if (cb) cb()
        }

        this.close = () => {
            if (this.container.parentNode) {

                cbH(this.closeCb)
                opacityAnimation.close()
                const index = instancesDisplayed.indexOf(this)
                instancesDisplayed.splice(index, 1)
                zIndexUpdate()

                localStorageSave()
            }
        }
        close.onclick = this.close
        close.onpointerdown = (e) => {
            e.preventDefault(); e.stopPropagation()
        }

        this.toggle = (name) => {
            if (this.container.parentNode) this.close()
            else this.display(name)
        }


        const init = () => {
            delete this.init
            const save = localStorage.getItem(id)
            if (save) {
                let data
                try { data = JSON.parse(save) } catch (e) { console.warn(e); return false }
                if (typeof data.x !== 'number' || data.x === NaN
                    || typeof data.y !== 'number' || data.y === NaN
                    || typeof data.displayed !== 'boolean') return
                x = data.x
                y = data.y
                placement()
                if (data.displayed === true) this.display()
            }
            return this
        }
        init()
    }
}
