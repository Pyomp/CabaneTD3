








///////////////////////////////////
// const xp_tt_wave_before_wave_20 = (wave) => {
//     let res = 500
//     for (let i = 0; i < wave; i++) {
//         res += res + 100
//     }
//     const boss_nb = wave / 5
//     for (let i = 0; i < boss_nb; i++) {
//         res += 200
//     }
//     return res
// }

// const xp_wave = (wave) => {
//     const res = 500 + wave * 100
//     if (wave % 5 === 0 && wave !== 0) return res + 200
//     else return res
// }

// const xp_tt_lv_5 = xp_wave(20)
// const lv_no_noob_length = (30 - 5)
// const a_wave = (86_400_000 - xp_tt_lv_5) / lv_no_noob_length
// const xp_tt_wave_after_lv_5 = (lv) => {
//     let xp_tt = xp_tt_lv_5
//     for (let i = 5; i < lv; i++) {
//         xp_tt += (a_wave * i + xp_tt_lv_5)
//     }
//     return wave
// }
///////////////////////////////

// for xp % bar
export const xp_tab = []

for (let i = 0; i < 30; i++) {
    xp_tab.push(3 + 6 * i ** 2)
}
xp_tab.push(1)

export const lv_from_xp = (xp) => {
    let xp_youpi = xp
    let lv_youpi = 0
    while (xp_youpi >= xp_tab[lv_youpi]) {
        xp_youpi -= xp_tab[lv_youpi]
        lv_youpi++
        if (lv_youpi === 30) return 30
    }
    return lv_youpi
}

export const xp_from_lv = (lv) => {
    let xp = 0
    for (let i = 0; i <= lv; i++) {
        xp += xp_tab[i]
    }
    return xp
}




