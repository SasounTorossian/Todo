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
import { taskFactory } from "../Logic/factory"

// Responsible for manipulating DOM elements, and linking various rendering modules and logic controller together.
const DomController = (() => {
    /**
     * Initial render.
     * First searches for existing projects in storage. If found, load. If not, load defaults
     * Hides the "Add Task" modal button at first, until project is selected.
     */
    const render = () => {
        if(Storage.load() != null) LogicController.setProjects(Storage.load())
        else LogicController.addDefault()
        RenderTabs.renderProjects()
        RenderTabs.renderTasks()
        Storage.save(LogicController.getProjects())
        modalTask.hideOpenTaskBtn()
    }

    /**
     * Edit project emitter function.
     * Emitted from modalProject.js. 
     * Adds project, highlights newly added project, then renders all projects.
     */
    emitterProj.on("addProj", (title) => {
        LogicController.addProject(title)
        projectHighlight(currentProjIndex)
        RenderTabs.renderProjects()
    })

    /**
     * Add task emitter function.
     * Emitted from modalTask.js.
     * Adds task then renders all tasks.
     */   
    emitterTask.on("addTask", (title, desc, date, priority, notes) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex()
        LogicController.addTask(currentProjIndex, title, desc, date, priority, notes)
        RenderTabs.renderTasks()
    })

    /**
     * Edit project emitter function.
     * Emitted from modalProjectEdit.js.
     * Gets current project index, uses it to edit project, then renders.
     * Highlights project when done.
     */
    emitterProjEdit.on("editProj", (title) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex() 
        LogicController.editProject(currentProjIndex, title)
        RenderTabs.renderProjects()
        projectHighlight(currentProjIndex)
    })

    /**
     * Edit task emitter function.
     * Emitted from modalTaskEdit.js.
     * Gets current project and task index, edits task, then renders task and task details.
     * Highlights task when done.
     */
    emitterTaskEdit.on("editTask", (title, desc, date, priority, notes) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex() 
        const currentTaskIndex = LogicController.getCurrentTaskIndex()
        LogicController.editTask(currentProjIndex, currentTaskIndex, title, desc, date, priority, notes)
        RenderTabs.renderTasks()
        RenderTabs.renderTasksDetails()
        taskHighlight(currentTaskIndex)
    })

    /**
     * Set project emitter function.
     * Emitted from renderTabs.js.
     * Gets index of clicked project and sets it as current project. 
     * Highlights selected project.
     * Displays "Add Task" button once project is selected.
     * If project other than the current project is selected, re-render the tasks, and remove task details.
     */
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

    /**
     * Set task emitter function.
     * Gets index of clicked task and sets it as current task. 
     * Highlights task when done.
     * Render task details
     */
    emitterRender.on("setTask", (index) => {
        LogicController.setCurrentTask(index)
        taskHighlight(index)
        RenderTabs.renderTasksDetails()
    })

    /**
     * Open edit-project emitter function.
     * Emitted from renderTabs.js.
     * Open the "Edit Project" modal form
     */
    emitterRender.on("openProjEdit", () => {
        modalProjectEdit.openModalEdit()
    })

    /**
     * Open edit-task emitter function.
     * Emitted from renderTabs.js.
     * Open the "Edit Task" modal form
     */
    emitterRender.on("openTaskEdit", () => {
        modalTaskEdit.openModalEdit()
    })

    /**
     * Delete project emitter function.
     * Emitted from renderTabs.js.
     * Delete project at index, re-render projects.
     * Get next-in-line project, and set it as new project,
     * this allows for cyclic project selection upon deletion.
     */
    emitterRender.on("delProj", (index) => {
        LogicController.removeProject(index)
        RenderTabs.renderProjects()
        setNextProject(LogicController.getNextProjectIndex(index))
    })

    /**
     * Delete task emitter function.
     * Emitted from renderTabs.js.
     * Delete task at index, re-render tasks.
     * Get next-in-line task, and set it as new task,
     * this allows for cyclic task selection upon deletion.
     */
    emitterRender.on("delTask", (index) => {
        const currentProjIndex = LogicController.getCurrentProjectIndex()
        LogicController.removeTask(currentProjIndex, index)
        RenderTabs.renderTasks()
        setNextTask(LogicController.getNextTaskIndex(index))
    })

    /** Uses index of next project to set it as the current project
     * upon deletion of the previous project. If different project,
     * re-render tasks and remove task details.
     * 
     * @param {index of next project} index 
     */
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

    /** Uses index of next task to set it as the current task
     * upon deletion of previous task.
     * Render task details.
     * 
     * @param {index of next task} index 
     */
    const setNextTask = (index) => {
        LogicController.setCurrentTask(index)
        taskHighlight(index)
        RenderTabs.renderTasksDetails()
    }

    /** Find element with "selectedProj" class and remove class if they exist.
     * Get the dom element with corresponding index and apply "selectedProj" class to it.
     * Check if index is null, incase it is the final project and there is no next-project. 
     * 
     * @param {index of project to highlight} index 
     */
    const projectHighlight = (index) => {
        let highlightedProjects = document.querySelector(".selectedProj")
        if(highlightedProjects) {highlightedProjects.classList.remove("selectedProj")}
        if(index != null) getProjectDom(index).classList.add("selectedProj")
    }

    /** Find element with "selectedTask" class and remove class if they exist.
     * Get the dom element with corresponding index and apply "selectedTask" class to it.
     * Check if index is null, incase it is the final task and there is no next-task. } index 
     * 
     * @param {index of task to highlight} index 
     */
    const taskHighlight = (index) => {
        let highlightedTasks = document.querySelector(".selectedTask")
        if(highlightedTasks) {highlightedTasks.classList.remove("selectedTask")}
        if(index != null) getTaskDom(index).classList.add("selectedTask")
    }

    // Get the dom element that has projIndex = index
    const getProjectDom = (index) => document.querySelector(`[projIndex="${index}"]`)

    // Get the dom element that has taskIndex = index
    const getTaskDom = (index) => document.querySelector(`[taskIndex="${index}"]`)

    return {render}
})()

export {
    DomController
}