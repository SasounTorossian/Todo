import {projectFactory} from "./factory"
import {taskFactory} from "./factory"

const logicController = (() => {
    let projects = []
    let currentProj = null
    let currentTask = null

    const addProject = (title) => {
        projects.push(projectFactory(title))
    }

    const removeProject = (index) => {
        projects.splice(index, 1)
    }

    const setProjects = (projs) => {
        projects = projs 
    }

    const getProjects = () => projects

    const editProject = (index, title) => {
        if(title) projects[index].title = title //Need to use setter?
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
        if(!currentProj) return []
        return  currentProj.tasks
    }

    const editTask = (pindex, tindex, title, desc, date, priority, notes) => {
        if(title) projects[pindex].tasks[tindex].title = title
        if(desc) projects[pindex].tasks[tindex].desc = desc
        if(date) projects[pindex].tasks[tindex].date = date
        if(priority) projects[pindex].tasks[tindex].priority = priority
        if(notes) projects[pindex].tasks[tindex].notes = notes
    }

    const setCurrentTask = (index) => currentTask = currentProj.tasks[index]

    const getCurrentTask = () => currentTask

    const getCurrentTaskIndex = () => currentProj.tasks.findIndex(p => p == currentTask)

    return {
        addProject,
        removeProject,
        setProjects,
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