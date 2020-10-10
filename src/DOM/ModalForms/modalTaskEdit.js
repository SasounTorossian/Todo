const EventEmitter = require("events")
const emitterTaskEdit = new EventEmitter

const modalTaskEdit = (() => {
    // Get modal element
    const modalEdit = document.querySelector("#modalTaskEdit")
    // Get modal form 
    const modalFormEdit = document.querySelector("#modalFormTaskEdit")
    // Get open button 
    // const openBtnTaskEdit = document.querySelector("#modalBtnTaskEdit")
    // Get close button
    const closeBtnEdit = document.querySelector("#closeBtnTaskEdit")
    // Get modal submit button
    const submitBtnEdit = document.querySelector("#submitBtnTaskEdit")

    // Listen for open click 
    // openBtnTaskEdit.addEventListener("click", openModalTaskEdit)
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
        // console.log("TEST")
        let title = document.querySelector("#titleInputTaskEdit").value
        let desc = document.querySelector("#descInputTaskEdit").value
        let date = document.querySelector("#dateInputTaskEdit").value
        let priority = document.querySelector("input[name='priorityTaskEdit']:checked").value
        let notes = document.querySelector("#notesInputTaskEdit").value
        emitterTaskEdit.emit("submitTaskEdit", title, desc, date, priority, notes)
        closeModalEdit()
    }

    return {openModalEdit}
})()

export {
    modalTaskEdit,
    emitterTaskEdit
}
