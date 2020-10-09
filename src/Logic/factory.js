const projectFactory = (title) => {
    let tasks = []
    return {title, tasks}
}

const taskFactory = (title, desc, date, priority, notes) => {
    return {title, desc, date, priority, notes}
}

export {
    projectFactory,
    taskFactory
}