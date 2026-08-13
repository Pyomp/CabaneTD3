
const div = document.createElement('div')
const createSVGElement = (svgStr) => {
    div.innerHTML = svgStr
    return div.firstChild
}

export const svgToImg = (rawSVG, img = new Image()) => {
    return new Promise((resolve) => {
        img.onload = () => {
            resolve(img)
        }
        img.onerror = (err) => {
            console.log(err)
            resolve()
        }
        img.src = "data:image/svg+xml;base64," + btoa(rawSVG)
    })
}

export const svgToCanvas = (rawSVG, canvas = document.createElement('canvas')) => {
    const buffImage = new Image()
    return new Promise((resolve) => {
        buffImage.onload = () => {
            canvas.width = buffImage.width
            canvas.height = buffImage.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(buffImage, 0, 0)

            resolve(canvas)
        }
        buffImage.onerror = (err) => {
            console.log(err)
            resolve()
        }
        buffImage.src = "data:image/svg+xml;base64," + btoa(rawSVG)
    })
}

const energyBall = `<svg width="101" height="101" viewBox="-0.5 -0.5 101 101" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient xlink:href="#a" id="c" gradientUnits="userSpaceOnUse" cx="50" cy="50" fx="50" fy="50" r="50"/><radialGradient xlink:href="#b" id="d" cx="50" cy="50" fx="50" fy="50" r="50" gradientUnits="userSpaceOnUse"/><linearGradient id="b"><stop style="stop-color:#fff" offset="0"/><stop style="stop-color:#fff;stop-opacity:.90025574" offset=".529"/><stop style="stop-color:#fff;stop-opacity:.60102302" offset=".817"/><stop style="stop-color:#fff;stop-opacity:0" offset="1"/></linearGradient><linearGradient id="a"><stop style="stop-color:#000" offset="0"/><stop style="stop-color:#fff;stop-opacity:0" offset="1"/></linearGradient></defs><g style="fill:url(#c)"><circle cx="50" cy="50" fill="#fff" pointer-events="all" r="50" style="fill:url(#d)"/></g></svg>`
export const energyBallSVG = ()=>{return createSVGElement(energyBall)}
export const energyBallIMG = (width, height)=>{return svgToImg(energyBall, width, height)}
export const energyBallCANVAS = (width, height)=>{return svgToCanvas(energyBall, width, height)}

const interaction = `<svg width="101" height="101" viewBox="-0.5 -0.5 101 101" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient xlink:href="#a" id="b" cx="50.337" cy="49.957" fx="50.337" fy="49.957" r="49.888" gradientTransform="matrix(1.2312 .00742 -.00756 1.25384 -11.26 -13.055)" gradientUnits="userSpaceOnUse"/><linearGradient id="a"><stop style="stop-color:#ff3434;stop-opacity:0" offset="0"/><stop style="stop-color:#3439ff;stop-opacity:0" offset=".574"/><stop style="stop-color:#9b9eff;stop-opacity:.5" offset=".753"/><stop style="stop-color:#0005fd;stop-opacity:0" offset=".813"/><stop style="stop-color:#fff;stop-opacity:.89019608" offset="1"/><stop style="stop-color:#545454;stop-opacity:0" offset="1"/></linearGradient></defs><ellipse style="fill:url(#b);fill-rule:evenodd;stroke-width:40.2693;stroke-linecap:round;stroke-linejoin:round;paint-order:stroke markers fill;stroke:none;fill-opacity:1" cx="50.337" cy="49.957" rx="49.888" ry="50.078"/></svg>`
export const interactionSVG = ()=>{return createSVGElement(interaction)}
export const interactionIMG = (width, height)=>{return svgToImg(interaction, width, height)}
export const interactionCANVAS = (width, height)=>{return svgToCanvas(interaction, width, height)}

const spark_drawio = `<svg xmlns="http://www.w3.org/2000/svg" width="101" height="101" viewBox="-0.5 -0.5 101 101"><circle cx="50" cy="50" fill="#fff" pointer-events="all" r="50"/></svg>`
export const spark_drawioSVG = ()=>{return createSVGElement(spark_drawio)}
export const spark_drawioIMG = (width, height)=>{return svgToImg(spark_drawio, width, height)}
export const spark_drawioCANVAS = (width, height)=>{return svgToCanvas(spark_drawio, width, height)}

const spark_opt = `<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg"><radialGradient id="a" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" offset="0"/><stop stop-color="#fff" stop-opacity=".5" offset=".25"/><stop stop-color="#fff" stop-opacity=".25" offset=".5"/><stop stop-color="#fff" stop-opacity=".1" offset=".75"/><stop stop-color="#fff" stop-opacity="0" offset="1"/></radialGradient><circle cx="50" cy="50" r="50" fill="url(#a)"/></svg>`
export const spark_optSVG = ()=>{return createSVGElement(spark_opt)}
export const spark_optIMG = (width, height)=>{return svgToImg(spark_opt, width, height)}
export const spark_optCANVAS = (width, height)=>{return svgToCanvas(spark_opt, width, height)}

const spark = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="101" height="101" viewBox="-0.5 -0.5 101 101"><defs><radialGradient xlink:href="#a" id="c" gradientUnits="userSpaceOnUse" cx="50" cy="50" fx="50" fy="50" r="50"/><radialGradient xlink:href="#b" id="d" cx="50" cy="50" fx="50" fy="50" r="50" gradientUnits="userSpaceOnUse"/><linearGradient id="b"><stop style="stop-color:#fff" offset="0"/><stop style="stop-color:#fff;stop-opacity:.5" offset=".28"/><stop style="stop-color:#fff;stop-opacity:.24909092" offset=".508"/><stop style="stop-color:#fff;stop-opacity:.09636363" offset=".739"/><stop style="stop-color:#fff;stop-opacity:0" offset="1"/></linearGradient><linearGradient id="a"><stop style="stop-color:#000" offset="0"/><stop style="stop-color:#fff;stop-opacity:0" offset="1"/></linearGradient></defs><g style="fill:url(#c)"><circle cx="50" cy="50" fill="#fff" pointer-events="all" r="50" style="fill:url(#d)"/></g></svg>`
export const sparkSVG = ()=>{return createSVGElement(spark)}
export const sparkIMG = (width, height)=>{return svgToImg(spark, width, height)}
export const sparkCANVAS = (width, height)=>{return svgToCanvas(spark, width, height)}
