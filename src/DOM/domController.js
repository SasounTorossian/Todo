import {renderModalProject} from "./ModalForms/modalProject"
import {emitterProj} from "./ModalForms/modalProject"
import {renderModalProjectEdit} from "./ModalForms/modalProjectEdit"
import {emitterProjEdit} from "./ModalForms/modalProjectEdit"
import {renderModalTask} from "./ModalForms/modalTask"
import {logicController} from "../Logic/logicController"


const domController = (() => {
    const contentProj = document.querySelector("#contentProj")
    const contentTask = document.querySelector("#contentTask")

    const addProjBtn = document.querySelector("#modalBtnProj")
    const addTaskBtn = document.querySelector("#modalBtnTask")
    addProjBtn.style.display = "none"
    addTaskBtn.style.display = "none"

    const testRenderProjects = () => {
        logicController.addProject("A")
        logicController.addProject("B")
        logicController.addProject("C")
        renderProjects()
        addProjBtn.style.display = "block"
    }

    const testAddTask = () => {
        const currentProjIndex = logicController.getCurrentProjectIndex()
        logicController.addTask(currentProjIndex, "testproj", "testDesc", "123", "0", "abc")
        renderTasks()
    }

    const render = () => {
        testRenderProjects()
        // testRenderTasks()
        // renderProjects()
        renderTasks()
        addProjBtn.addEventListener("click", addProject)
        addTaskBtn.addEventListener("click", testAddTask)
    }

    const addProject = () => {
        renderModalProject.openModalProj()
        emitterProj.once("submitProj", (title) => {
            logicController.addProject(title)
            renderProjects()
        })
    }

    const addTask = () => {
        // const currentProject = logicController.getCurrentProject()
        // renderModalProject.openModalProj()
        // emitterProj.once("submitProj", (title) => {
        //     logicController.addProject(title)
        //     renderProjects()
        // })
    }

    const removeAllProjects = () => {
        const divProj = document.querySelectorAll(".project")
        divProj.forEach(p =>  p.remove())
    }

    const removeAllTasks = () => {
        const divTask = document.querySelectorAll(".task")
        divTask.forEach(t => t.remove())
    }

    const setProject = (index) => {
        logicController.setCurrentProject(index)
        addTaskBtn.style.display = "block"
        renderTasks()
    }

    const setTask = (index) => {
        logicController.setCurrentTask(index)
        // Display task details
        // renderTasksDetails()
    }

    const deleteProject = (index) => {
        logicController.removeProject(index)
        renderProjects()
    }

    const deleteTask = (index) => {
        const currentProjIndex = logicController.getCurrentProjectIndex()
        logicController.removeTask(currentProjIndex, index)
        renderTasks()
    }

    const editProject = (index) => {
        renderModalProjectEdit.openModalProjEdit()
        emitterProjEdit.once("submitProjEdit", (title) => { 
            logicController.editProject(title, index)
            renderProjects()
        })
    }

    const editTask = (index) => {
        // renderModalProjectEdit.openModalProjEdit()
        // emitterProjEdit.once("submitProjEdit", (title) => { 
        //     logicController.editProject(title, index)
        //     renderProjects()
        // })
    }

    const renderProjects = () => {
        removeAllProjects()
        const projects = logicController.getProjects()
        if (projects == undefined || projects.length == 0) return 
        
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

    const renderTasks = () => {
        removeAllTasks()
        const tasks = logicController.getTasks()
        if(tasks == undefined || tasks.length == 0)  return

        tasks.forEach((task, index) => {
            const containerTask = document.createElement("div") 
            containerTask.classList.add("task")
            containerTask.addEventListener("click", () => setTask(index))

            const titleTask = document.createElement("div")
            titleTask.classList.add("titleTask")
            titleTask.innerText = task.title
            containerTask.appendChild(titleTask)

            // Task description.

            const editTask = document.createElement("div")
            editTask.classList.add("editTask")
            editTask.innerText = "edit"
            editTask.addEventListener("click", () => editTask(index))
            containerTask.appendChild(editTask)

            const deleteTask = document.createElement("div")
            deleteTask.classList.add("deleteTask")
            deleteTask.innerText = "delete"
            deleteTask.addEventListener("click", () => deleteTask(index))
            containerTask.appendChild(deleteTask)

            contentTask.appendChild(containerTask)
        })
    }
    return {render}
})()

export {
    domController
}