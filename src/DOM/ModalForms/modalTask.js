const EventEmitter = require("events")
const emitterTask = new EventEmitter

const modalTask = (() => {
    // Get modal element
    const modal = document.querySelector("#modalTask")
    // Get modal form 
    const modalForm = document.querySelector("#modalFormTask")
    // Get open button 
    const openBtn = document.querySelector("#modalBtnTask")
    // Get close button
    const closeBtn = document.querySelector("#closeBtnTask")
    // Get modal submit button
    const submitBtn = document.querySelector("#submitBtnTask")

    // Listen for open click 
    openBtn.addEventListener("click", openModal)
    // Listen for close click 
    closeBtn.addEventListener("click", closeModal)
    // Listen for outside click
    window.addEventListener("click", outsideClick)
    // Listen for submit click
    submitBtn.addEventListener("click", submitModal)

    function hideOpenTaskBtn() {
        openBtn.style.display = "none"
    }

    function showOpenTaskBtn() {
        openBtn.style.display = "block"
    }

    // Function to open modal
    function openModal() {
        modal.style.display = "block"
    } 

    // Function to close modal
    function closeModal(){
        modal.style.display = "none"
        modalForm.reset()
    }

    // Function to close modal if outside click 
    function outsideClick(e) {
        if(e.target == modal) closeModal()
    }



    // Function to submit modal form and create new book
    function submitModal(){
        let title = document.querySelector("#titleInputTask").value
        let desc = document.querySelector("#descInputTask").value
        let date = document.querySelector("#dateInputTask").value
        let priority = ""
        for (const pt of document.querySelectorAll("input[name='priorityTask']")) {
            if(pt.checked) priority = pt.value
        }
        let notes = document.querySelector("#notesInputTask").value
        closeModal()
        if (!title || !desc || !date || !priority) return
        emitterTask.emit("submitTask", title, desc, date, priority, notes)
    }

    return {hideOpenTaskBtn,
            showOpenTaskBtn,
            openModal}
})()

export {
    modalTask,
    emitterTask
}
