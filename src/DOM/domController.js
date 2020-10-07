import {renderModalProject} from "./ModalForms/modalProject"
import {emitterProj} from "./ModalForms/modalProject"
import {renderModalTask} from "./ModalForms/modalTask"
import {logicController} from "../Logic/logicController"


const domController = (() => {
    const contentProj = document.querySelector("#contentProj")

    const addProjBtn = document.querySelector("#modalBtnProj")
    const addTaskBtn = document.querySelector("#modalBtnTask")

    const render = () => {
        renderProjects()
        addProjBtn.addEventListener("click", addProject)
    }

    const addProject = () => {
        renderModalProject.openModalProj()
    }

    const removeAllProjects = () => {
        const divProj = document.querySelectorAll(".project")
        divProj.forEach(p =>  p.remove())
    }

    const deleteProject = (index) => {
        logicController.removeProject(index)
        renderProjects()
    }

    const editProject = (title, index) => {
        // open modal proj edit
        renderProjects()
    }

    emitterProj.on("submitproj", (title) => {
        console.log(title)
        logicController.addProject("A")
        logicController.addProject("B")
        logicController.addProject("C")
        renderProjects()
    })

    const renderProjects = () => {
        if (logicController.getProjects().length == 0) return 
        removeAllProjects()

        logicController.getProjects().forEach((proj, index) => {
            const containerProj = document.createElement("div") 
            containerProj.classList.add("project")

            const titleProj = document.createElement("div")
            titleProj.classList.add("titleProject")
            titleProj.innerText = proj.title
            containerProj.appendChild(titleProj)

            const editProj = document.createElement("div")
            editProj.classList.add("editProject")
            editProj.innerText = "edit"
            editProj.addEventListener("click", editProject)
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