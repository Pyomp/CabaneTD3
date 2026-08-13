






export class Model_Data {
    constructor(height = 2, radius = 1) {
        this.height = height
        this.half_height = height / 2
        this.radius = radius
        this.radius_sq = radius ** 2
    }
}

export const default_model_data = new Model_Data(2, .8)

