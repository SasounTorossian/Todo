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
            containerProj.addEventListener("click", () => {
                let highlightedProjects = document.querySelectorAll(".selectedProj")
                highlightedProjects.forEach(elem => {
                    elem.classList.remove("selectedProj");
                });
                containerProj.classList.add("selectedProj")
                setProject(index)
            })

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
            containerTask.addEventListener("click", () => {
                let highlightedTasks = document.querySelectorAll(".selectedTask")
                highlightedTasks.forEach(elem => {
                    elem.classList.remove("selectedTask");
                });
                containerTask.classList.add("selectedTask")
                setTask(index)
            })

            const titleTask = document.createElement("div")
            titleTask.classList.add("titleTask")
            titleTask.innerText = task.title
            // if(task.priority == 1) titleTask.style.color = "green"
            // else if(task.priority == 2) titleTask.style.color = "orange"
            // else if(task.priority == 3) titleTask.style.color = "red"
            // else titleTask.style.color = "green"
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

        // First Row
        const titleDetailsContainer = document.createElement("div")
        titleDetailsContainer.classList.add("detailsContainer")

        const titleTaskDetailsLabel = document.createElement("label")
        titleTaskDetailsLabel.classList.add("titleTaskDetailsLabel")
        titleTaskDetailsLabel.classList.add("label")
        titleTaskDetailsLabel.for = "titleTaskDetails"
        titleTaskDetailsLabel.innerText = "Title"
        titleDetailsContainer.appendChild(titleTaskDetailsLabel)

        const titleTaskDetails = document.createElement("div")
        titleTaskDetails.classList.add("titleTaskDetails")
        titleTaskDetails.classList.add("detail")
        titleTaskDetails.innerText = task.title
        titleDetailsContainer.appendChild(titleTaskDetails)

        const priorityDetailsContainer = document.createElement("div")
        priorityDetailsContainer.classList.add("detailsContainer")

        const priorityTaskDetailsLabel = document.createElement("label")
        priorityTaskDetailsLabel.classList.add("priorityTaskDetailsLabel")
        priorityTaskDetailsLabel.classList.add("label")
        priorityTaskDetailsLabel.for = "priorityTaskDetails"
        priorityTaskDetailsLabel.innerText = "Priority"
        priorityDetailsContainer.appendChild(priorityTaskDetailsLabel)

        const priorityTaskDetails = document.createElement("div")
        priorityTaskDetails.classList.add("priorityTaskDetails")
        priorityTaskDetails.classList.add("detail")
        if(task.priority == 1) {
            priorityTaskDetails.innerText = "Low"
            priorityTaskDetails.style.color = "green"
        }
        else if(task.priority == 2) {
            priorityTaskDetails.innerText = "Medium"
            priorityTaskDetails.style.color = "orange"
        }
        else if(task.priority == 3) {
            priorityTaskDetails.innerText = "High"
            priorityTaskDetails.style.color = "red"
        }
        else priorityTaskDetails.innerText = "Low"
        priorityDetailsContainer.appendChild(priorityTaskDetails)

        const firstRow = document.createElement("div")
        firstRow.classList.add("firstRow")
        firstRow.classList.add("row")
        firstRow.appendChild(titleDetailsContainer)
        firstRow.appendChild(priorityDetailsContainer)
        containerTaskDetails.appendChild(firstRow)

        // Second Row
        const descDetailsContainer = document.createElement("div")
        descDetailsContainer.classList.add("detailsContainer")

        const descTaskDetailsLabel = document.createElement("label")
        descTaskDetailsLabel.classList.add("descTaskDetailsLabel")
        descTaskDetailsLabel.classList.add("label")
        descTaskDetailsLabel.for = "descTaskDetail"
        descTaskDetailsLabel.innerText = "Description"
        descDetailsContainer.appendChild(descTaskDetailsLabel)

        const descTaskDetails = document.createElement("div")
        descTaskDetails.classList.add("descTaskDetail")
        descTaskDetails.classList.add("detail")
        descTaskDetails.innerText = task.desc
        descDetailsContainer.appendChild(descTaskDetails)

        const secondRow = document.createElement("div")
        secondRow.classList.add("secondRow")
        secondRow.classList.add("row")
        secondRow.appendChild(descDetailsContainer)
        containerTaskDetails.appendChild(secondRow)

        // Third Row
        const dateDetailsContainer = document.createElement("div")
        dateDetailsContainer.classList.add("detailsContainer")

        const dateTaskDetailsLabel = document.createElement("label")
        dateTaskDetailsLabel.classList.add("dateTaskDetailsLabel")
        dateTaskDetailsLabel.classList.add("label")
        dateTaskDetailsLabel.for = "dateTaskDetail"
        dateTaskDetailsLabel.innerText = "Due Date"
        dateDetailsContainer.appendChild(dateTaskDetailsLabel)

        const dateTaskDetails = document.createElement("div")
        dateTaskDetails.classList.add("dateTaskDetail")
        dateTaskDetails.classList.add("detail")
        dateTaskDetails.innerText = Time.getDate(task.date)
        dateDetailsContainer.appendChild(dateTaskDetails)

        /////
        const timeDetailsContainer = document.createElement("div")
        timeDetailsContainer.classList.add("detailsContainer")

        const timeTaskDetailsLabel = document.createElement("label")
        timeTaskDetailsLabel.classList.add("timeTaskDetailsLabel")
        timeTaskDetailsLabel.classList.add("label")
        timeTaskDetailsLabel.for = "timeTaskDetail"
        timeTaskDetailsLabel.innerText = "Due Time"
        timeDetailsContainer.appendChild(timeTaskDetailsLabel)

        const timeTaskDetails = document.createElement("div")
        timeTaskDetails.classList.add("timeTaskDetail")
        timeTaskDetails.classList.add("detail")
        timeTaskDetails.innerText = Time.getTime(task.date)
        timeDetailsContainer.appendChild(timeTaskDetails)

        /////
        const timeLeftDetailsContainer = document.createElement("div")
        timeLeftDetailsContainer.classList.add("detailsContainer")

        const timeLeftTaskDetailsLabel = document.createElement("label")
        timeLeftTaskDetailsLabel.classList.add("timeLeftTaskDetailsLabel")
        timeLeftTaskDetailsLabel.classList.add("label")
        timeLeftTaskDetailsLabel.for = "timeLeftTaskDetail"
        timeLeftTaskDetailsLabel.innerText = "Time Left"
        timeLeftDetailsContainer.appendChild(timeLeftTaskDetailsLabel)

        const timeLeftTaskDetails = document.createElement("div")
        timeLeftTaskDetails.classList.add("timeLeftTaskDetail")
        timeLeftTaskDetails.classList.add("detail")
        const timeDiff = Time.getTimeDifference(task.date)
        if(timeDiff == null) timeLeftTaskDetails.innerText = "Expired"
        else timeLeftTaskDetails.innerText = timeDiff
        timeLeftDetailsContainer.appendChild(timeLeftTaskDetails)

        /////
        const thirdRow = document.createElement("div")
        thirdRow.classList.add("thirdRow")
        thirdRow.classList.add("row")
        thirdRow.appendChild(dateDetailsContainer)
        thirdRow.appendChild(timeDetailsContainer)
        thirdRow.appendChild(timeLeftDetailsContainer)
        containerTaskDetails.appendChild(thirdRow)

        // Fourth Row
        const notesDetailsContainer = document.createElement("div")
        notesDetailsContainer.classList.add("detailsContainer")

        const notesTaskDetailsLabel = document.createElement("label")
        notesTaskDetailsLabel.classList.add("notesTaskDetailsLabel")
        notesTaskDetailsLabel.classList.add("label")
        notesTaskDetailsLabel.for = "notesTaskDetail"
        notesTaskDetailsLabel.innerText = "Notes"
        notesDetailsContainer.appendChild(notesTaskDetailsLabel)

        const notesTaskDetails = document.createElement("div")
        notesTaskDetails.classList.add("notesTaskDetail")
        notesTaskDetails.classList.add("detail")
        notesTaskDetails.innerText = task.notes
        notesDetailsContainer.appendChild(notesTaskDetails)

        const fourthRow = document.createElement("div")
        fourthRow.classList.add("fourthRow")
        fourthRow.classList.add("row")
        fourthRow.appendChild(notesDetailsContainer)
        containerTaskDetails.appendChild(fourthRow)

        const contentTaskDetails = document.querySelector("#contentTaskDetails")
        contentTaskDetails.appendChild(containerTaskDetails)
    }

    return {render}
})()

export {
    DomController
}