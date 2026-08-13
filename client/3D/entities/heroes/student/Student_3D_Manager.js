











import { Student } from '../../../../../common/entities/Student.js'
import { Loop_Manager } from '../../../../../common/systems/Loop_Manager.js'
import { Mesh, Scene } from '../../../modules/three.module.js'
import { init_students_3D } from './init_student_3D.js'
import { Student_3D } from './Student_3D.js'


/** @type {Mesh} */
let model = undefined

export class Student_3D_Manager {
    static init = (loader) => init_students_3D(loader).then((a) => { model = a })

    static destroy = () => { model = undefined }

    /**
     * 
     * @param {Scene} scene 
     * @param {Loop_Manager} loop_manager 
     */
    constructor(
        scene,
        loop_manager
    ) {

        Student.on_create = (model_data) => {
            const obj3D = new Mesh(model.geometry, model.material.clone())
            new Student_3D(scene, model_data, obj3D, loop_manager,)
        }

    }
}













