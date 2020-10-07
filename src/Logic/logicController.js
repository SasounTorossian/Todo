import {projectFactory} from "./factory"
import {taskFactory} from "./factory"

const logicController = (() => {
    let projects = []
    let currentProj
    let currentTask

    const addProject = (title) => {
        projects.push(projectFactory(title))
    }

    const removeProject = (index) => {
        projects.splice(index, 1)
    }

    const editProjects = (title, index) => {
        projects[index].title = title //Need to use setter?

    }
    
    const addTask = (pindex, title, desc, date, priority, notes) => {
        projects[pindex].tasks.push(taskFactory(title, desc, date, priority, notes))
    }

    const removeTask = (pindex, tindex) => {
        projects[pindex].tasks.splice(tindex, 1)
    }

    const editTask = (pindex, tindex, title, desc, date, priority, notes) => {
        projects[pindex].tasks[tindex].title = title
        projects[pindex].tasks[tindex].desc = desc
        projects[pindex].tasks[tindex].notes = notes
        projects[pindex].tasks[tindex].date = date
        projects[pindex].tasks[tindex].priority = priority
    }

    return {
        addProject,
        removeProject,
        editProjects,
        addTask,
        removeTask,
        editTask
    }
})()

export {
    logicController
}