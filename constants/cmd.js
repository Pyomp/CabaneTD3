
export const DT_MAX_FRAME_TO_SERVER = 0.05
export const DT_MAX_FRAME_TO_SERVER_MS = DT_MAX_FRAME_TO_SERVER * 1000






// binaire cmd 16 bits
export const CMD_SETTINGS_SKIN = 0
export const CMD_REQ = 'req'
export const CMD_REQ_BIN = 2
export const CMD_CHAT = 3
export const CMD_POSITION = 1
export const CMD_GET_ITEM_FROM_GROUND = 4
export const CMD_REFRESH_APP_DATA = 5

export const CMD_MOB = 10
export const CMD_OTHER_PLAYER = 11
export const CMD_CALCUL_ZONE = 'zon'
export const CMD_OTHER_CREATE = 'otc'
export const CMD_ANIM = 12
export const CMD_OTHER_DELETE = 13
export const CMD_HIT_MOBS = 'hmo'
export const CMD_LINK_PROVIDER = 'lpo'
export const CMD_PSEUDO_CHANGE = 'psc'

export const CMD_SAVE_APP_DATA = 'sda'
export const CMD_SAVE_APP_DATA_FORCE = 'sdf'
export const CMD_LOAD_APP_DATA = 'lda'
export const CMD_LOAD_APP_DATA_FORCE = 'ldf'
export const CMD_PAY = 'pay'


export const CMD_PING = 14
export const CMD_SHOP = 15
// export const CMD_AFK = 4, CMD_HEY = 5
// export const CMD_OTHER_PLAYER_DISCONNECTED = 6

export const RES0 = new Uint8Array([0, CMD_REQ_BIN, 0])
export const RES1 = new Uint8Array([0, CMD_REQ_BIN, 1])
export const RES2 = new Uint8Array([0, CMD_REQ_BIN, 2])
export const RES3 = new Uint8Array([0, CMD_REQ_BIN, 3])
export const RES4 = new Uint8Array([0, CMD_REQ_BIN, 4])

