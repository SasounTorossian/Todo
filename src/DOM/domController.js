import {modalProject} from "./ModalForms/modalProject"
import {emitterProj} from "./ModalForms/modalProject"
import {modalProjectEdit} from "./ModalForms/modalProjectEdit"
import {emitterProjEdit} from "./ModalForms/modalProjectEdit"
import {modalTask} from "./ModalForms/modalTask"
import {emitterTask} from "./ModalForms/modalTask"
import {modalTaskEdit} from "./ModalForms/modalTaskEdit"
import {emitterTaskEdit} from "./ModalForms/modalTaskEdit"
import {logicController} from "../Logic/logicController"

//TODO: set curent project at start. 

const domController = (() => {
    const contentProj = document.querySelector("#contentProj")
    const contentTask = document.querySelector("#contentTask")

    const testRenderProjects = () => {
        logicController.addProject("A")
        logicController.addProject("B")
        logicController.addProject("C")
        renderProjects()
        // addProjBtn.style.display = "block"
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
        modalTask.hideOpenTaskBtn()
        // addProjBtn.addEventListener("click", addProject)
        // addTaskBtn.addEventListener("click", addTask)
    }

    emitterProj.on("submitProj", (title) => {
        logicController.addProject(title)
        renderProjects()
    })

    emitterTask.on("submitTask", (title, desc, date, priority, notes) => {
        const currentProjIndex = logicController.getCurrentProjectIndex()
        logicController.addTask(currentProjIndex, title, desc, date, priority, notes)
        renderTasks()
    })

    emitterProjEdit.on("submitProjEdit", (title) => {
        const currentProjIndex = logicController.getCurrentProjectIndex() 
        logicController.editProject(title, currentProjIndex)
        renderProjects()
    })

    emitterTaskEdit.on("submitTaskEdit", (title, desc, date, priority, notes) => {
        const currentProjIndex = logicController.getCurrentProjectIndex() 
        const currentTaskIndex = logicController.getCurrentTaskIndex()
        logicController.editTask(currentProjIndex, currentTaskIndex, title, desc, date, priority, notes)
        renderTasks()
    })


    const removeAllProjects = () => document.querySelectorAll(".project").forEach(p => p.remove())

    const removeAllTasks = () => document.querySelectorAll(".task").forEach(t => t.remove())

    const setProject = (index) => {
        logicController.setCurrentProject(index)
        modalTask.showOpenTaskBtn()
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
            editProj.addEventListener("click", () => modalProjectEdit.openModalEdit())
            containerProj.appendChild(editProj)

            const delProj = document.createElement("div")
            delProj.classList.add("deleteProject")
            delProj.innerText = "delete"
            delProj.addEventListener("click", () => deleteProject(index))
            containerProj.appendChild(delProj)

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

            // TODO: Task colour based on priority
            const titleTask = document.createElement("div")
            titleTask.classList.add("titleTask")
            titleTask.innerText = task.title
            containerTask.appendChild(titleTask)

            // TODO: Task description.

            const editTask = document.createElement("div")
            editTask.classList.add("editTask")
            editTask.innerText = "edit"
            editTask.addEventListener("click", () => modalTaskEdit.openModalEdit())
            containerTask.appendChild(editTask)

            const delTask = document.createElement("div")
            delTask.classList.add("deleteTask")
            delTask.innerText = "delete"
            delTask.addEventListener("click", () => deleteTask(index))
            containerTask.appendChild(delTask)

            contentTask.appendChild(containerTask)
        })
    }
    return {render}
})()

export {
    domController
}