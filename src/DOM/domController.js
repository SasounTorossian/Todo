import {renderModalProject} from "./ModalForms/modalProject"
import {emitterProj} from "./ModalForms/modalProject"
import {renderModalProjectEdit} from "./ModalForms/modalProjectEdit"
import {emitterProjEdit} from "./ModalForms/modalProjectEdit"
import {renderModalTask} from "./ModalForms/modalTask"
import {logicController} from "../Logic/logicController"


const domController = (() => {
    const contentProj = document.querySelector("#contentProj")

    const addProjBtn = document.querySelector("#modalBtnProj")
    const addTaskBtn = document.querySelector("#modalBtnTask")

    const testRender = () => {
        logicController.addProject("A")
        logicController.addProject("B")
        logicController.addProject("C")
        renderProjects()
    }

    const render = () => {
        testRender()
        addProjBtn.addEventListener("click", addProject)
    }

    const addProject = () => {
        renderModalProject.openModalProj()
        emitterProj.once("submitProj", (title) => {
            logicController.addProject(title)
            renderProjects()
        })
    }

    const removeAllProjects = () => {
        const divProj = document.querySelectorAll(".project")
        divProj.forEach(p =>  p.remove())
    }

    const setProject = (index) => {
        logicController.setCurrentProject(index)
        // render tasks
    }

    const deleteProject = (index) => {
        console.log("TEST")
        logicController.removeProject(index)
        renderProjects()
    }

    const editProject = (index) => {
        renderModalProjectEdit.openModalProjEdit()
        emitterProjEdit.once("submitProjEdit", (title) => { 
            logicController.editProject(title, index)
            renderProjects()
        })
    }

    const renderProjects = () => {
        if (logicController.getProjects().length == 0) return 
        removeAllProjects()

        logicController.getProjects().forEach((proj, index) => {
            const containerProj = document.createElement("div") 
            containerProj.classList.add("project")
            containerProj.addEventListener("click", () => setProject(index))

            const titleProj = document.createElement("div")
            titleProj.classList.add("titleProject")
            titleProj.innerText = proj.title
            containerProj.appendChild(titleProj)

            const editProj = document.createElement("div")
            editProj.classList.add("editProject")
            editProj.innerText = "edit"
            editProj.addEventListener("click", () => editProject(index))
            containerProj.appendChild(editProj)

            const deleteProj = document.createElement("div")
            deleteProj.classList.add("deleteProject")
            deleteProj.innerText = "delete"
            deleteProj.addEventListener("click", () => deleteProject(index))
            containerProj.appendChild(deleteProj)

            contentProj.appendChild(containerProj)
        })
    } 

    return {render}
})()

export {
    domController
}