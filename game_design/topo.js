









const STUDENT_LEFT_Y = 8.6
const STUDENT_RIGHT_Y = 7.43

const STUDENT_COLUMN_DELTA = 1.3

const STUDENT_LEFT_COLUMN_1 = 10
const STUDENT_LEFT_COLUMN_2 = STUDENT_LEFT_COLUMN_1 - STUDENT_COLUMN_DELTA
const STUDENT_LEFT_COLUMN_3 = STUDENT_LEFT_COLUMN_2 - STUDENT_COLUMN_DELTA
const STUDENT_LEFT_COLUMN_4 = STUDENT_LEFT_COLUMN_3 - STUDENT_COLUMN_DELTA

const STUDENT_RIGHT_COLUMN_1 = -6.5
const STUDENT_RIGHT_COLUMN_2 = STUDENT_RIGHT_COLUMN_1 - STUDENT_COLUMN_DELTA
const STUDENT_RIGHT_COLUMN_3 = STUDENT_RIGHT_COLUMN_2 - STUDENT_COLUMN_DELTA
const STUDENT_RIGHT_COLUMN_4 = STUDENT_RIGHT_COLUMN_3 - STUDENT_COLUMN_DELTA


const STUDENT_LINE_1 = 19.8
const STUDENT_LINE_DELTA = 1.4
const STUDENT_LINE_2 = STUDENT_LINE_1 + STUDENT_LINE_DELTA
const STUDENT_LINE_3 = STUDENT_LINE_2 + STUDENT_LINE_DELTA

export const topo_basic = {
    field: {
        enemyAttackPos: { x: 0, y: 0.04, z: -11.3 },
        schoolEntry: { x: 0, y: 0.04, z: 13 },
        routeWidth: 4.4,
    },
    cabane: {
        boundingRect: { x1: -5, x2: 5, z1: 23, z2: 19.5, z3: 16, y1: 6.7, y2: 8.32 },
        studentSize: { x: 10.6, z: 3.5 },
        studentSelect: [
            { x: (STUDENT_LEFT_COLUMN_2 + STUDENT_LEFT_COLUMN_3) / 2, y: STUDENT_LEFT_Y, z: STUDENT_LINE_2 },
            { x: (STUDENT_RIGHT_COLUMN_2 + STUDENT_RIGHT_COLUMN_3) / 2, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_2 },
        ],
        profSize: { x: 2, z: 2 },
        students: [
            { x: STUDENT_LEFT_COLUMN_1, y: STUDENT_LEFT_Y, z: STUDENT_LINE_1 },
            { x: STUDENT_LEFT_COLUMN_2, y: STUDENT_LEFT_Y, z: STUDENT_LINE_1 },
            { x: STUDENT_LEFT_COLUMN_3, y: STUDENT_LEFT_Y, z: STUDENT_LINE_1 },
            { x: STUDENT_LEFT_COLUMN_4, y: STUDENT_LEFT_Y, z: STUDENT_LINE_1 },

            { x: STUDENT_RIGHT_COLUMN_1, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_1 },
            { x: STUDENT_RIGHT_COLUMN_2, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_1 },
            { x: STUDENT_RIGHT_COLUMN_3, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_1 },
            { x: STUDENT_RIGHT_COLUMN_4, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_1 },

            { x: STUDENT_LEFT_COLUMN_1, y: STUDENT_LEFT_Y, z: STUDENT_LINE_2 },
            { x: STUDENT_LEFT_COLUMN_2, y: STUDENT_LEFT_Y, z: STUDENT_LINE_2 },
            { x: STUDENT_LEFT_COLUMN_3, y: STUDENT_LEFT_Y, z: STUDENT_LINE_2 },
            { x: STUDENT_LEFT_COLUMN_4, y: STUDENT_LEFT_Y, z: STUDENT_LINE_2 },

            { x: STUDENT_RIGHT_COLUMN_1, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_2 },
            { x: STUDENT_RIGHT_COLUMN_2, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_2 },
            { x: STUDENT_RIGHT_COLUMN_3, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_2 },
            { x: STUDENT_RIGHT_COLUMN_4, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_2 },

            { x: STUDENT_LEFT_COLUMN_1, y: STUDENT_LEFT_Y, z: STUDENT_LINE_3 },
            { x: STUDENT_LEFT_COLUMN_2, y: STUDENT_LEFT_Y, z: STUDENT_LINE_3 },
            { x: STUDENT_LEFT_COLUMN_3, y: STUDENT_LEFT_Y, z: STUDENT_LINE_3 },
            { x: STUDENT_LEFT_COLUMN_4, y: STUDENT_LEFT_Y, z: STUDENT_LINE_3 },

            { x: STUDENT_RIGHT_COLUMN_1, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_3 },
            { x: STUDENT_RIGHT_COLUMN_2, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_3 },
            { x: STUDENT_RIGHT_COLUMN_3, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_3 },
            { x: STUDENT_RIGHT_COLUMN_4, y: STUDENT_RIGHT_Y, z: STUDENT_LINE_3 },

            { x: -13.054, y: 11.38, z: 14.732 },
            { x: 11.574, y: 12.583, z: 17.806 },
            { x: 6.1036, y: 12.741, z: 26.83 },
            { x: -10.097, y: 8.2985, z: 22.834 },
            { x: -5.7454, y: 9.69, z: 23.699 },
            { x: 12.647, y: 10.2, z: 15.952 },
        ],
        heroes: [
            { x: 4, y: 4.7, z: 21.5 },
            { x: 2, y: 4.7, z: 21.5 },
            { x: 0, y: 4.7, z: 21.5 },
            { x: -2, y: 4.7, z: 21.5 },
            { x: -4, y: 4.7, z: 21.5 },

            { x: 6, y: 3.6, z: 19 },
            { x: 4, y: 3.6, z: 19 },
            { x: 2, y: 3.6, z: 19 },
            { x: 0, y: 3.6, z: 19 },
            { x: -2, y: 3.6, z: 19 },
            { x: -4, y: 3.6, z: 19 },
            { x: -6, y: 3.6, z: 19 },
        ],
    }
}







