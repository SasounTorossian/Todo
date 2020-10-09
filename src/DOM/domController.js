import {renderModalProject} from "./ModalForms/modalProject"
import {emitterProj} from "./ModalForms/modalProject"
import {renderModalProjectEdit} from "./ModalForms/modalProjectEdit"
import {emitterProjEdit} from "./ModalForms/modalProjectEdit"
import {renderModalTask} from "./ModalForms/modalTask"
import {emitterTask} from "./ModalForms/modalTask"
import {logicController} from "../Logic/logicController"

//TODO: set curent project at start. 

const domController = (() => {
    const contentProj = document.querySelector("#contentProj")
    const contentTask = document.querySelector("#contentTask")

    // const addProjBtn = document.querySelector("#modalBtnProj")
    // const addTaskBtn = document.querySelector("#modalBtnTask")
    // addProjBtn.style.display = "none"
    // addTaskBtn.style.display = "none"

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
        // addProjBtn.addEventListener("click", addProject)
        // addTaskBtn.addEventListener("click", addTask)
    }

    // const addProject = () => {
    //     renderModalProject.openModalProj()
    //     emitterProj.once("submitProj", (title) => {
    //         logicController.addProject(title)
    //         renderProjects()
    //     })
    // }

    emitterProj.on("submitProj", (title) => {
        logicController.addProject(title)
        renderProjects()
    })

    // const addTask = () => {
    //     const currentProjIndex = logicController.getCurrentProjectIndex()
    //     renderModalTask.openModalTask()
    //     emitterTask.once("submitTask", (title, desc, date, priority, notes) => {
    //         logicController.addTask(currentProjIndex, title, desc, date, priority, notes)
    //         renderTasks()
    //     })
        
    // }

    
    emitterTask.on("submitTask", (title, desc, date, priority, notes) => {
        const currentProjIndex = logicController.getCurrentProjectIndex()
        logicController.addTask(currentProjIndex, title, desc, date, priority, notes)
        renderTasks()
    })

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

    // const editProject = (index) => {
    //     renderModalProjectEdit.openModalProjEdit()
    //     emitterProjEdit.once("submitProjEdit", (title) => { 
    //         logicController.editProject(title, index)
    //         renderProjects()
    //     })
    // }

    emitterProjEdit.on("submitProjEdit", (title) => {
        const currentProjIndex = logicController.getCurrentProjectIndex() 
        logicController.editProject(title, currentProjIndex)
        renderProjects()
    })

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
            editProj.addEventListener("click", () => renderModalProjectEdit.openModalProjEdit())
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
            editTask.addEventListener("click", () => editTask(index))
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