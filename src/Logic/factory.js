const projectFactory = (title) => {
    let tasks = []
    return {title}
}

const taskFactory = (title, desc, date, priority, notes) => {
    return {title, desc, date, priority, notes}
}