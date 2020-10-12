import {modalProject} from "./ModalForms/modalProject"
import {emitterProj} from "./ModalForms/modalProject"
import {modalProjectEdit} from "./ModalForms/modalProjectEdit"
import {emitterProjEdit} from "./ModalForms/modalProjectEdit"
import {modalTask} from "./ModalForms/modalTask"
import {emitterTask} from "./ModalForms/modalTask"
import {modalTaskEdit} from "./ModalForms/modalTaskEdit"
import {emitterTaskEdit} from "./ModalForms/modalTaskEdit"
import {logicController} from "../Logic/logicController"

// TODO: set current project at start. 
// TODO: Storage!!!

const domController = (() => {

    const testRenderProjects = () => {
        logicController.addProject("A")
        logicController.addProject("B")
        logicController.addProject("C")
        renderProjects()
    }

    const testRenderTasks = () => {
        logicController.addTask(0, "testproj1", "testDesc1", "2020-10-07", "0", "abc")
        logicController.addTask(0, "testproj2", "testDesc2", "2020-10-07", "0", "abc")
        logicController.addTask(0, "testproj3", "testDesc3", "2020-10-07", "0", "abc")
        logicController.addTask(1, "testproj4", "testDesc4", "2020-10-07", "0", "abc")
        logicController.addTask(2, "testproj5", "testDesc5", "2020-10-07", "0", "abc")
        logicController.addTask(2, "testproj6", "testDesc6", "2020-10-07", "0", "abc")
        renderTasks()
    }

    const render = () => {
        testRenderProjects()
        testRenderTasks()
        
        // renderProjects()
        // renderTasks()
        modalTask.hideOpenTaskBtn()
    }

    emitterProj.on("submitProj", (title) => {
        logicController.addProject(title)
        renderProjects()
    })

    emitterTask.on("submitTask", (title, desc, date, priority, notes) => {
        const currentProjIndex = logicController.getCurrentProjectIndex()
        // TODO: format date to dd/mm/yyyy
        logicController.addTask(currentProjIndex, title, desc, date, priority, notes)
        renderTasks()
    })

    emitterProjEdit.on("submitProjEdit", (title) => {
        const currentProjIndex = logicController.getCurrentProjectIndex() 
        logicController.editProject(title, currentProjIndex)
        renderProjects()
    })

    // TODO: Ability to edit only one thing
    emitterTaskEdit.on("submitTaskEdit", (title, desc, date, priority, notes) => {
        const currentProjIndex = logicController.getCurrentProjectIndex() 
        const currentTaskIndex = logicController.getCurrentTaskIndex()
        logicController.editTask(currentProjIndex, currentTaskIndex, title, desc, date, priority, notes)
        renderTasks()
    })

    const removeAllProjects = () => document.querySelectorAll(".project").forEach(p => p.remove())

    const removeAllTasks = () => document.querySelectorAll(".task").forEach(t => t.remove())

    const removeAllTasksDetails = () => document.querySelectorAll(".taskDetails").forEach(td => td.remove())

    const setProject = (index) => {
        logicController.setCurrentProject(index)
        modalTask.showOpenTaskBtn()
        renderTasks()
    }

    const setTask = (index) => {
        logicController.setCurrentTask(index)
        renderTasksDetails()
    }

    // TODO: Ask user if they're sure
    const deleteProject = (index) => {
        logicController.removeProject(index)
        renderProjects()
    }

    const deleteTask = (index) => {
        const currentProjIndex = logicController.getCurrentProjectIndex()
        logicController.removeTask(currentProjIndex, index)
        renderTasks()
    }

    // TODO: Highlight selected project and task 

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
            editProj.addEventListener("click", () => modalProjectEdit.openModalEdit())
            const editProjImg = document.createElement("img")
            editProjImg.classList.add("editProjImg")
            editProjImg.src = "./images/edit_transparent.png"
            editProjImg.height = "20"
            editProj.appendChild(editProjImg)
            const editProjText = document.createElement("div")
            editProjText.classList.add("editProjText")
            editProjText.innerText = "edit"
            editProj.appendChild(editProjText)
            containerProj.appendChild(editProj)

            const delProj = document.createElement("div")
            delProj.classList.add("deleteProject")
            delProj.addEventListener("click", () => deleteProject(index))
            const delProjImg = document.createElement("img")
            delProjImg.classList.add("delProjImg")
            delProjImg.src = "./images/trash_transparent.png"
            delProjImg.height = "20"
            delProj.appendChild(delProjImg)
            const delProjText = document.createElement("div")
            delProjText.classList.add("delProjText")
            delProjText.innerText = "delete"
            delProj.appendChild(delProjText)

            containerProj.appendChild(delProj)

            const openBtn = document.querySelector("#modalBtnProj")
            openBtn.before(containerProj)
        })

        // renderCreateProjectBtn()
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

            // TODO: Task description
            
            const editTask = document.createElement("div")
            editTask.classList.add("editTask")
            editTask.addEventListener("click", () => modalTaskEdit.openModalEdit())
            const editTaskImg = document.createElement("img")
            editTaskImg.classList.add("editTaskImg")
            editTaskImg.src = "./images/edit_transparent.png"
            editTaskImg.height = "20"
            editTask.appendChild(editTaskImg)
            const editTaskText = document.createElement("div")
            editTaskText.classList.add("editTaskText")
            editTaskText.innerText = "edit"
            editTask.appendChild(editTaskText)
            containerTask.appendChild(editTask)

            const delTask = document.createElement("div")
            delTask.classList.add("deleteTask")
            delTask.addEventListener("click", () => deleteTask(index))
            const delTaskImg = document.createElement("img")
            delTaskImg.classList.add("delTaskImg")
            delTaskImg.src = "./images/trash_transparent.png"
            delTaskImg.height = "20"
            delTask.appendChild(delTaskImg)
            const delTaskText = document.createElement("div")
            delTaskText.classList.add("delTaskText")
            delTaskText.innerText = "delete"
            delTask.appendChild(delTaskText)
            containerTask.appendChild(delTask)

            const openBtn = document.querySelector("#modalBtnTask")
            openBtn.before(containerTask)
        })
    }

    const renderTasksDetails = () => {
        removeAllTasksDetails()
        const task = logicController.getCurrentTask()
        if(task == undefined || task.length == 0)  return

        const containerTaskDetails = document.createElement("div") 
        containerTaskDetails.classList.add("taskDetails")

        const titleTaskDetails = document.createElement("div")
        titleTaskDetails.classList.add("titleTaskDetail")
        titleTaskDetails.innerText = task.title
        containerTaskDetails.appendChild(titleTaskDetails)

        const descTaskDetails = document.createElement("div")
        descTaskDetails.classList.add("descTaskDetail")
        descTaskDetails.innerText = task.desc
        containerTaskDetails.appendChild(descTaskDetails)

        const dateTaskDetails = document.createElement("div")
        dateTaskDetails.classList.add("dateTaskDetail")
        dateTaskDetails.innerText = task.date
        containerTaskDetails.appendChild(dateTaskDetails)

        const priorityTaskDetails = document.createElement("div")
        priorityTaskDetails.classList.add("priorityTaskDetail")
        priorityTaskDetails.innerText = task.priority
        containerTaskDetails.appendChild(priorityTaskDetails)

        const notesTaskDetails = document.createElement("div")
        notesTaskDetails.classList.add("notesTaskDetail")
        notesTaskDetails.innerText = task.notes
        containerTaskDetails.appendChild(notesTaskDetails)

        const contentTaskDetails = document.querySelector("#contentTaskDetails")
        contentTaskDetails.appendChild(containerTaskDetails)
    }

    // const renderCreateProjectBtn = () => {
    //     const containerProjBtn = document.createElement("button") 
    //     containerProjBtn.classList.add("openBtn")
    //     containerProjBtn.id = "modalBtnProj"
    //     containerProjBtn.innerText = "Click Here (Project)"
    //     const contentProj = document.querySelector("#contentProj")
    //     contentProj.appendChild(containerProjBtn)
    // }

    return {render}
})()

export {
    domController
}