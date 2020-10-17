import {modalProject} from "./ModalForms/modalProject"
import {emitterProj} from "./ModalForms/modalProject"
import {modalProjectEdit} from "./ModalForms/modalProjectEdit"
import {emitterProjEdit} from "./ModalForms/modalProjectEdit"
import {modalTask} from "./ModalForms/modalTask"
import {emitterTask} from "./ModalForms/modalTask"
import {modalTaskEdit} from "./ModalForms/modalTaskEdit"
import {emitterTaskEdit} from "./ModalForms/modalTaskEdit"
import {LogicController} from "../Logic/logicController"
import {Storage} from "../Logic/Storage/storage"
import {Time} from "../Logic/Time/time"

// TODO: Style Details.

const DomController = (() => {
    // Should be in storage?, or put in LogicController.addDefault()
    const loadDefault = () => {
        LogicController.addProject("A")
        LogicController.addProject("B")
        LogicController.addProject("C")
        LogicController.addTask(0, "testproj2", "testDesc2", "2020-11-07T08:45", "1", "abc")
        LogicController.addTask(0, "testproj3", "testDesc3", "2020-11-07T08:45", "3", "abc")
        LogicController.addTask(1, "testproj4", "testDesc4", "2020-11-07T08:45", "2", "abc")
        LogicController.addTask(2, "testproj5", "testDesc5", "2020-11-07T08:45", "1", "abc")
        LogicController.addTask(2, "testproj6", "testDesc6", "2020-11-07T08:45", "2", "abc")
    }

    const render = () => {
        if(Storage.load() != null) LogicController.setProjects(Storage.load())
        else loadDefault()
        renderProjects()
        renderTasks()
        Storage.save(LogicController.getProjects())
        modalTask.hideOpenTaskBtn()
    }

    emitterProj.on("submitProj", (title) => {
        LogicController.addProject(title)
        renderProjects()
    })

    // Use chained methods for adding task to project or edit
    emitterTask.on("submitTask", (title, desc, date, priority, notes) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex()
        LogicController.addTask(currentProjIndex, title, desc, date, priority, notes)
        renderTasks()
    })

    emitterProjEdit.on("submitProjEdit", (title) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex() 
        LogicController.editProject(currentProjIndex, title)
        renderProjects()
    })

    emitterTaskEdit.on("submitTaskEdit", (title, desc, date, priority, notes) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex() 
        const currentTaskIndex = LogicController.getCurrentTaskIndex()
        LogicController.editTask(currentProjIndex, currentTaskIndex, title, desc, date, priority, notes)
        renderTasks()
        renderTasksDetails()
    })

    const removeAllProjects = () => document.querySelectorAll(".project").forEach(p => p.remove())

    const removeAllTasks = () => document.querySelectorAll(".task").forEach(t => t.remove())

    const removeAllTasksDetails = () => document.querySelectorAll(".taskDetails").forEach(td => td.remove())

    const setProject = (index) => {
        LogicController.setCurrentProject(index)
        modalTask.showOpenTaskBtn()
        renderTasks()
    }

    const setTask = (index) => {
        LogicController.setCurrentTask(index)
        renderTasksDetails()
    }

    const deleteProject = (index) => {
        LogicController.removeProject(index)
        renderProjects()
    }

    const deleteTask = (index) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex()
        LogicController.removeTask(currentProjIndex, index)
        renderTasks()
    }

    // TODO: Highlight selected project and task 
    // TODO: Move render code to separate files. Too intertwined. Can't for now.

    const renderProjects = () => {
        removeAllProjects()

        LogicController.getProjects().forEach((proj, index) => {
            const containerProj = document.createElement("div") 
            containerProj.classList.add("project")
            containerProj.classList.add("tab")
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
            editProjText.innerText = "Edit"
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
            delProjText.innerText = "Del"
            delProj.appendChild(delProjText)

            containerProj.appendChild(delProj)

            const openBtn = document.querySelector("#modalBtnProj")
            openBtn.before(containerProj)
        })

        Storage.save(LogicController.getProjects())
    } 

    const renderTasks = () => {
        removeAllTasks()

        LogicController.getTasks().forEach((task, index) => {
            const containerTask = document.createElement("div") 
            containerTask.classList.add("task")
            containerTask.classList.add("tab")
            containerTask.addEventListener("click", () => setTask(index))

            const titleTask = document.createElement("div")
            titleTask.classList.add("titleTask")
            titleTask.innerText = task.title
            if(task.priority == 1) titleTask.style.color = "green"
            else if(task.priority == 2) titleTask.style.color = "orange"
            else if(task.priority == 3) titleTask.style.color = "red"
            containerTask.appendChild(titleTask)
            
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
            editTaskText.innerText = "Edit"
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
            delTaskText.innerText = "Del"
            delTask.appendChild(delTaskText)
            containerTask.appendChild(delTask)

            const openBtn = document.querySelector("#modalBtnTask")
            openBtn.before(containerTask)
        })

        Storage.save(LogicController.getProjects())
    }

    const renderTasksDetails = () => {
        removeAllTasksDetails()
        const task = LogicController.getCurrentTask()
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
        dateTaskDetails.innerText = Time.dateConversion(task.date)
        containerTaskDetails.appendChild(dateTaskDetails)

        const timeLeftTaskDetails = document.createElement("div")
        timeLeftTaskDetails.classList.add("timeLeftTaskDetail")
        const timeDiff = Time.getTimeDifference(task.date)
        if(timeDiff == null) timeLeftTaskDetails.innerText = "Expired"
        else timeLeftTaskDetails.innerText = timeDiff
        containerTaskDetails.appendChild(timeLeftTaskDetails)

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

    return {render}
})()

export {
    DomController
}