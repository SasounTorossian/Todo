import {renderModalProject} from "./ModalForms/modalProject"
import {emitter} from "./ModalForms/modalProject"
import {renderModalTask} from "./ModalForms/modalTask"
import {logicController} from "../Logic/logicController"


const domController = (() => {
    const addProjBtn = document.querySelector("#modalBtnProj")
    const addTaskBtn = document.querySelector("#modalBtnTask")

    const render = () => {
        addProjBtn.addEventListener("click", () => addProject())
    }

    const addProject = () => {
        renderModalProject.openModalProj()
    }

    emitter.on("tester", function(title) {
        console.log(title)
    })

    return {render}
})()

export {
    domController
}