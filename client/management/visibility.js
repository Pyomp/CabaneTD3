

let visibilityHidden, visibilityChange
// Opera 12.10 and Firefox 18 and later support 
if (typeof document.hidden !== "undefined") {
    visibilityHidden = "hidden"
    visibilityChange = "visibilitychange"
} else if (typeof document.mozHidden !== "undefined") {
    visibilityHidden = "mozHidden"
    visibilityChange = "mozvisibilitychange"
} else if (typeof document.msHidden !== "undefined") {
    visibilityHidden = "msHidden"
    visibilityChange = "msvisibilitychange"
} else if (typeof document.webkitHidden !== "undefined") {
    visibilityHidden = "webkitHidden"
    visibilityChange = "webkitvisibilitychange"
}

export const on_visibility_change = new Set()
export const is_document_hidden = () => document[visibilityHidden]
addEventListener(visibilityChange, () => {
    const hidden = document[visibilityHidden]
    for (const f of on_visibility_change)
        if (f(hidden) === true) on_visibility_change.delete(f)
})