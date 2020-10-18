import {projectFactory} from "./factory"
import {taskFactory} from "./factory"

const LogicController = (() => {
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

    const getNextProjectIndex = (index) => projects.length != 0 ? index % projects.length : null
    
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

    const getNextTaskIndex = (index) => getTasks().length != 0 ? index % getTasks().length : null

    const addDefault = () => {
        addProject("A")
        addProject("B")
        addProject("C")
        addTask(0, "testproj1", "testDesc1", "2020-12-03T09:45", "2", "abc")
        addTask(0, "testproj2", "testDesc2", "2020-11-07T08:45", "1", "abc")
        addTask(0, "testproj3", "testDesc3", "2020-11-07T08:45", "3", "abc")
        addTask(1, "testproj4", "testDesc4", "2020-11-07T08:45", "2", "abc")
        addTask(2, "testproj5", "testDesc5", "2020-11-07T08:45", "1", "abc")
        addTask(2, "testproj6", "testDesc6", "2020-11-07T08:45", "2", "abc")
    }

    return {
        addProject,
        removeProject,
        setProjects,
        getProjects,
        editProject,
        setCurrentProject,
        getCurrentProject,
        getCurrentProjectIndex,
        getNextProjectIndex,
        addTask,
        removeTask,
        getTasks,
        editTask,
        setCurrentTask,
        getCurrentTask,
        getCurrentTaskIndex,
        getNextTaskIndex,
        addDefault
    }
})()

export {
    LogicController
}