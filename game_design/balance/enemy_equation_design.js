






export const hp_enemy = (base, wave) => {
    return Math.floor((base + base * wave ))
}

export const power_enemy = (base, wave) => {
    return base + base * wave / 100
}








