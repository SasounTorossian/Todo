const EventEmitter = require("events")
const emitterTaskEdit = new EventEmitter

const modalTaskEdit = (() => {
    // Get modal element
    const modalEdit = document.querySelector("#modalTaskEdit")
    // Get modal form 
    const modalFormEdit = document.querySelector("#modalFormTaskEdit")
    // Get close button
    const closeBtnEdit = document.querySelector("#closeBtnTaskEdit")
    // Get modal submit button
    const submitBtnEdit = document.querySelector("#submitBtnTaskEdit")

    // Listen for close click 
    closeBtnEdit.addEventListener("click", closeModalEdit)
    // Listen for outside click
    window.addEventListener("click", outsideClickEdit)
    // Listen for submit click
    submitBtnEdit.addEventListener("click", submitModalEdit)

    // Function to open modal
    function openModalEdit() {
        modalEdit.style.display = "block"
    } 

    // Function to close modal
    function closeModalEdit(){
        modalEdit.style.display = "none"
        modalFormEdit.reset()
    }

    // Function to close modal if outside click 
    function outsideClickEdit(e) {
        if(e.target == modalTask) closeModalEdit()
    }

    // Function to submit modal form and create new book
    function submitModalEdit(){
        let title = document.querySelector("#titleInputTaskEdit").value
        let desc = document.querySelector("#descInputTaskEdit").value
        let date = document.querySelector("#dateInputTaskEdit").value
        let priority = document.querySelector("input[name='priorityTaskEdit']:checked").value
        let notes = document.querySelector("#notesInputTaskEdit").value 
        closeModalEdit()
        emitterTaskEdit.emit("submitTaskEdit", title, desc, date, priority, notes)
    }

    return {openModalEdit}
})()

export {
    modalTaskEdit,
    emitterTaskEdit
}
