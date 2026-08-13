export const createSeparationBar = (parent) => {
    const separationBar = document.createElement('div')
    {
        const s = separationBar.style
        s.width = '80%'
        s.margin = '3px auto'
        s.height = '1px'
        s.background = '#444444'
    }
    parent.appendChild(separationBar)
    return separationBar
}

export const create_separation_bar_no_marge = (parent) => {
    const separationBar = document.createElement('div')
    {
        const s = separationBar.style
        s.width = '80%'
        s.margin = '0 auto'
        s.height = '1px'
        s.background = '#444444'
    }
    parent.appendChild(separationBar)
    return separationBar
}