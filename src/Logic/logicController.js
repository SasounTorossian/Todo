import {Factory} from "./factory"

// Responsible for controlling and manipulating project and task objects. Primarily used in domController.js
const LogicController = (() => {
    let projects = []
    let currentProj = null
    let currentTask = null

    // Pushes new project object into array
    const addProject = (title) => projects.push(Factory.projectFactory(title))

    // Pushes new task object into chosen project's internal array
    const addTask = (indexP, title, desc, date, priority, notes) => projects[indexP].tasks.push(Factory.taskFactory(title, desc, date, priority, notes))

    // Edit project if input was provided
    const editProject = (index, title) => {
        if(title) projects[index].title = title
    }

    // Edit task using provided inputs. Allows variable number of attributes to be edited
    const editTask = (indexP, indexT, title, desc, date, priority, notes) => {
        if(title) projects[indexP].tasks[indexT].title = title
        if(desc) projects[indexP].tasks[indexT].desc = desc
        if(date) projects[indexP].tasks[indexT].date = date
        if(priority) projects[indexP].tasks[indexT].priority = priority
        if(notes) projects[indexP].tasks[indexT].notes = notes
    }

    // Remove project from array
    const removeProject = (index) => projects.splice(index, 1)

    // Remove task from chosen project's internal array
    const removeTask = (indexP, indexT) => projects[indexP].tasks.splice(indexT, 1)

    // Used by Storage.load() to load in saved projects, and set as the new LogicController module projects array
    const setProjects = (projs) => projects = projs 

    // Sets the current selected project based on index
    const setCurrentProject = (index) => currentProj = projects[index]

    // Sets the current selected task based on index
    const setCurrentTask = (index) => currentTask = currentProj.tasks[index]

    // Gets the index of the current selected project
    const getCurrentProjectIndex = () => projects.findIndex(p => p == currentProj)

    // Gets the index of the current selected task
    const getCurrentTaskIndex = () => currentProj.tasks.findIndex(p => p == currentTask)

    // Gets current project
    const getCurrentProject = () => currentProj

    // Gets current task
    const getCurrentTask = () => currentTask

    // Gets index of project immediately after deleted project. modulo in order to wrap around if deleted element was last in the array.
    const getNextProjectIndex = (index) => projects.length != 0 ? index % projects.length : null

    // Gets index of task immediately after deleted task. modulo in order to wrap around if deleted element was last in the array.
    const getNextTaskIndex = (index) => getTasks().length != 0 ? index % getTasks().length : null

    // Get all projects
    const getProjects = () => projects

    // Get all tasks
    const getTasks = () => {
        if(!currentProj) return []
        return  currentProj.tasks
    }

    // If no saved projects exist, load the default projects and tasks for display purposes.
    const addDefault = () => {
        addProject("Groceries")
        addProject("UFC 254")
        addProject("Study")
        addTask(0, "Buy milk", "Get full fat", "2020-10-03T10:00", "1", "Might have to get 2-3 for next week too.")
        addTask(0, "Buy eggs", "Get 12", "2020-10-07T10:00", "1", "Try to use free-range.")
        addTask(0, "Buy apples", "Preferably green", "2020-10-07T10:00", "1", "Could also get more for apple pie.")
        addTask(1, "Watch", "Go to friends house", "2020-10-23T15:15", "3", "Take a couple beers to friend's house too.")
        addTask(2, "Javascript", "Arrow functions", "2020-11-07T08:45", "2", "Read MDN docs on arrow functions. Make notes on it too.")
        addTask(2, "CSS", "Display properties", "2020-11-07T09:45", "1", "Read and understand different css display property settings, and their interaction with other elements.")
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