import {projectFactory} from "./factory"
import {taskFactory} from "./factory"

const logicController = (() => {
    let projects = []
    let currentProj = null
    let currentTask = null

    const addProject = (title) => {
        // const project = projectFactory(title)
        // console.log(project.tasks)
        projects.push(projectFactory(title))
    }

    const removeProject = (index) => {
        projects.splice(index, 1)
    }

    const getProjects = () => projects

    const editProject = (title, index) => {
        projects[index].title = title //Need to use setter?
    }

    const setCurrentProject = (index) => currentProj = projects[index]

    const getCurrentProject = () => currentProj

    const getCurrentProjectIndex = () => projects.findIndex(p => p == currentProj)
    
    const addTask = (pindex, title, desc, date, priority, notes) => {
        projects[pindex].tasks.push(taskFactory(title, desc, date, priority, notes))
    }

    const removeTask = (pindex, tindex) => {
        projects[pindex].tasks.splice(tindex, 1)
    }

    const getTasks = () => {
        if(!currentProj) return
        return  currentProj.tasks
    }

    const editTask = (pindex, tindex, title, desc, date, priority, notes) => {
        projects[pindex].tasks[tindex].title = title
        projects[pindex].tasks[tindex].desc = desc
        projects[pindex].tasks[tindex].notes = notes
        projects[pindex].tasks[tindex].date = date
        projects[pindex].tasks[tindex].priority = priority
    }

    const setCurrentTask = (index) => currentTask = currentProj.tasks[index]

    const getCurrentTask = () => currentTask

    const getCurrentTaskIndex = () => currentProj.tasks.findIndex(p => p == currentTask)

    return {
        addProject,
        removeProject,
        getProjects,
        editProject,
        setCurrentProject,
        getCurrentProject,
        getCurrentProjectIndex,
        addTask,
        removeTask,
        getTasks,
        editTask,
        setCurrentTask,
        getCurrentTask,
        getCurrentTaskIndex
    }
})()

export {
    logicController
}