



export const SHOP_1_DIAMOND = 0
export const SHOP_10_DIAMOND = 1
export const SHOP_20_DIAMOND = 2
export const SHOP_50_DIAMOND = 3
export const SHOP_100_DIAMOND = 4

export const SHOP_LENGTH = 5

/** @type {[Product]} */
export const shop_design = new Array(SHOP_LENGTH)

class Product {
    constructor(id, desc, cb) {
        this.desc = desc
        /** @type {(obj, prop)=>{}} */
        this.cb = cb
        shop_design[id] = this
    }
}

new Product(SHOP_1_DIAMOND, 'ondiamond',
    (wallet, prop_diamond) => {
        wallet[prop_diamond] += 1
    }
)
new Product(SHOP_10_DIAMOND, 'tendiamond',
    (wallet, prop_diamond) => {
        wallet[prop_diamond] += 10
    }
)
new Product(SHOP_20_DIAMOND, 'twentydiamond',
    (wallet, prop_diamond) => {
        wallet[prop_diamond] += 20
    }
)
new Product(SHOP_50_DIAMOND, 'fiftydiamond',
    (wallet, prop_diamond) => {
        wallet[prop_diamond] += 50
    }
)
new Product(SHOP_100_DIAMOND, 'hundreddiamond',
    (wallet, prop_diamond) => {
        wallet[prop_diamond] += 100
    }
)





