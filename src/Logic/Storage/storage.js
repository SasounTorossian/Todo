const Storage = (() => {

    const save = (projects) => localStorage.setItem("projects", JSON.stringify(projects))
    
    const load = () => {
        let loadedProjects = JSON.parse(localStorage.getItem('projects'))
        if(loadedProjects === null || loadedProjects === undefined || loadedProjects.length == 0) return null 
        else return loadedProjects
    }

    return {
        save,
        load
    }
})()

export {
    Storage
}

