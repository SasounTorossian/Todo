// Responsible for creating project and task objects. Should only be called from logicController.js
const Factory = (() => {
    // Factory for creating projects
    const projectFactory = (title) => {
        let tasks = []
        return {title, tasks}
    }

    // Factory for creating tasks
    const taskFactory = (title, desc, date, priority, notes) => {
        return {title, desc, date, priority, notes}
    }

    return {
        projectFactory,
        taskFactory
    }
})()

export {
    Factory
}