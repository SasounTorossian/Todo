import {projectFactory} from "./factory"
import {taskFactory} from "./factory"

const LogicController = (() => {
    let projects = []
    let currentProj = null
    let currentTask = null

    const addProject = (title) => projects.push(projectFactory(title))

    const addTask = (indexP, title, desc, date, priority, notes) => projects[indexP].tasks.push(taskFactory(title, desc, date, priority, notes))

    const editProject = (index, title) => {
        if(title) projects[index].title = title
    }

    const editTask = (indexP, indexT, title, desc, date, priority, notes) => {
        if(title) projects[indexP].tasks[indexT].title = title
        if(desc) projects[indexP].tasks[indexT].desc = desc
        if(date) projects[indexP].tasks[indexT].date = date
        if(priority) projects[indexP].tasks[indexT].priority = priority
        if(notes) projects[indexP].tasks[indexT].notes = notes
    }

    const removeProject = (index) => projects.splice(index, 1)

    const removeTask = (indexP, indexT) => projects[indexP].tasks.splice(indexT, 1)

    const setProjects = (projs) => projects = projs 

    const setCurrentProject = (index) => currentProj = projects[index]

    const setCurrentTask = (index) => currentTask = currentProj.tasks[index]

    const getCurrentProjectIndex = () => projects.findIndex(p => p == currentProj)

    const getCurrentTaskIndex = () => currentProj.tasks.findIndex(p => p == currentTask)

    const getCurrentProject = () => currentProj

    const getCurrentTask = () => currentTask

    const getNextProjectIndex = (index) => projects.length != 0 ? index % projects.length : null

    const getNextTaskIndex = (index) => getTasks().length != 0 ? index % getTasks().length : null

    const getProjects = () => projects

    const getTasks = () => {
        if(!currentProj) return []
        return  currentProj.tasks
    }

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