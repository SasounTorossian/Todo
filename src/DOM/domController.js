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
import {RenderTabs} from "../DOM/RenderTabs/renderTabs"
import {emitterRender} from "../DOM/RenderTabs/renderTabs"

const DomController = (() => {
    const render = () => {
        if(Storage.load() != null) LogicController.setProjects(Storage.load())
        else LogicController.addDefault()
        RenderTabs.renderProjects()
        RenderTabs.renderTasks()
        Storage.save(LogicController.getProjects())
        modalTask.hideOpenTaskBtn()
    }

    emitterProj.on("addProj", (title) => {
        LogicController.addProject(title)
        projectHighlight(currentProjIndex)
        RenderTabs.renderProjects()
    })

    emitterTask.on("addTask", (title, desc, date, priority, notes) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex()
        LogicController.addTask(currentProjIndex, title, desc, date, priority, notes)
        RenderTabs.renderTasks()
    })

    emitterProjEdit.on("editProj", (title) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex() 
        LogicController.editProject(currentProjIndex, title)
        RenderTabs.renderProjects()
        projectHighlight(currentProjIndex)
    })

    emitterTaskEdit.on("editTask", (title, desc, date, priority, notes) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex() 
        const currentTaskIndex = LogicController.getCurrentTaskIndex()
        LogicController.editTask(currentProjIndex, currentTaskIndex, title, desc, date, priority, notes)
        RenderTabs.renderTasks()
        RenderTabs.renderTasksDetails()
        taskHighlight(currentTaskIndex)
    })

    emitterRender.on("setProj", (index) => {
        let nextIndex = LogicController.getCurrentProjectIndex()
        LogicController.setCurrentProject(index)
        projectHighlight(index)
        modalTask.showOpenTaskBtn()
        if (nextIndex != index) {
            RenderTabs.renderTasks()
            RenderTabs.removeAllTasksDetails()
        }
    })

    emitterRender.on("setTask", (index) => {
        LogicController.setCurrentTask(index)
        taskHighlight(index)
        RenderTabs.renderTasksDetails()
    })

    emitterRender.on("openProjEdit", () => {
        modalProjectEdit.openModalEdit()
    })

    emitterRender.on("openTaskEdit", () => {
        modalTaskEdit.openModalEdit()
    })

    emitterRender.on("delProj", (index) => {
        LogicController.removeProject(index)
        RenderTabs.renderProjects()
        setNextProject(LogicController.getNextProjectIndex(index))
    })

    emitterRender.on("delTask", (index) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex()
        LogicController.removeTask(currentProjIndex, index)
        RenderTabs.renderTasks()
        setNextTask(LogicController.getNextTaskIndex(index))
    })

    const setNextProject = (index) => {
        let nextIndex = LogicController.getCurrentProjectIndex()
        LogicController.setCurrentProject(index)
        projectHighlight(index)
        modalTask.showOpenTaskBtn()
        if (nextIndex != index) {
            RenderTabs.renderTasks()
            RenderTabs.removeAllTasksDetails()
        }
    }

    const setNextTask = (index) => {
        LogicController.setCurrentTask(index)
        taskHighlight(index)
        RenderTabs.renderTasksDetails()
    }

    const projectHighlight = (index) => {
        let highlightedProjects = document.querySelector(".selectedProj")
        if(highlightedProjects) {highlightedProjects.classList.remove("selectedProj")}
        if(index != null) getProjectDom(index).classList.add("selectedProj")
    }

    const taskHighlight = (index) => {
        let highlightedTasks = document.querySelector(".selectedTask")
        if(highlightedTasks) {highlightedTasks.classList.remove("selectedTask")}
        if(index != null) getTaskDom(index).classList.add("selectedTask")
    }

    const getProjectDom = (index) => document.querySelector(`[projIndex="${index}"]`)

    const getTaskDom = (index) => document.querySelector(`[taskIndex="${index}"]`)

    return {render}
})()

export {
    DomController
}