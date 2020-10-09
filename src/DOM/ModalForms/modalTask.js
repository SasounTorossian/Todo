const EventEmitter = require("events")
const emitterTask = new EventEmitter

const renderModalTask = (() => {
    // Get modal element
    const modalTask = document.querySelector("#modalTask")
    // Get modal form 
    const modalFormTask = document.querySelector(".modalFormTask")
    // Get open button 
    const openBtnTask = document.querySelector("#modalBtnTask")
    // Get close button
    const closeBtnTask = document.querySelector("#closeBtnTask")
    // Get modal submit button
    const submitBtnTask = document.querySelector("#submitBtnTask")

    // Listen for open click 
    openBtnTask.addEventListener("click", openModalTask)
    // Listen for close click 
    closeBtnTask.addEventListener("click", closeModalTask)
    // Listen for outside click
    window.addEventListener("click", outsideClickTask)
    // Listen for submit click
    submitBtnTask.addEventListener("click", submitModalTask)

    // Function to open modal
    function openModalTask() {
        modalTask.style.display = "block"
    } 

    // Function to close modal
    function closeModalTask(){
        modalTask.style.display = "none"
        modalFormTask.reset()
    }

    // Function to close modal if outside click 
    function outsideClickTask(e) {
        if(e.target == modalTask) closeModalTask()
    }

    // Function to submit modal form and create new book
    function submitModalTask(){
        let title = document.querySelector("#titleInputTask").value
        let desc = document.querySelector("#descInput").value
        let date = document.querySelector("#dateInput").value
        let priority = document.querySelector("input[name='priority']:checked").value
        let notes = document.querySelector("#notesInput").value
        emitterTask.emit("submitTask", title, desc, date, priority, notes)
        closeModalTask()
    }

    return {openModalTask}
})()

export {
    renderModalTask,
    emitterTask
}
