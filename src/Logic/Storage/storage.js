// Respoisnible for saving and loading projects and tasks to local storage.
const Storage = (() => {

    // Save all projects to local storage under "projects" key
    const save = (projects) => localStorage.setItem("projects", JSON.stringify(projects))
    
    // Check if loaded projects exists. if so, return projects, if not return null.
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

