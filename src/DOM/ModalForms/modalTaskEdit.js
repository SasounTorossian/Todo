const EventEmitter = require("events")
const emitterTaskEdit = new EventEmitter

const renderModalTaskEdit = (() => {
    // Get modal element
    const modalTaskEdit = document.querySelector("#modalTaskEdit")
    // Get modal form 
    const modalFormTaskEdit = document.querySelector("#modalFormTaskEdit")
    // Get open button 
    // const openBtnTaskEdit = document.querySelector("#modalBtnTaskEdit")
    // Get close button
    const closeBtnTaskEdit = document.querySelector("#closeBtnTaskEdit")
    // Get modal submit button
    const submitBtnTaskEdit = document.querySelector("#submitBtnTaskEdit")

    // Listen for open click 
    // openBtnTaskEdit.addEventListener("click", openModalTaskEdit)
    // Listen for close click 
    closeBtnTaskEdit.addEventListener("click", closeModalTaskEdit)
    // Listen for outside click
    window.addEventListener("click", outsideClickTaskEdit)
    // Listen for submit click
    submitBtnTaskEdit.addEventListener("click", submitModalTaskEdit)

    // Function to open modal
    function openModalTaskEdit() {
        modalTaskEdit.style.display = "block"
    } 

    // Function to close modal
    function closeModalTaskEdit(){
        modalTaskEdit.style.display = "none"
        modalFormTaskEdit.reset()
    }

    // Function to close modal if outside click 
    function outsideClickTaskEdit(e) {
        if(e.target == modalTask) closeModalTaskEdit()
    }

    // Function to submit modal form and create new book
    function submitModalTaskEdit(){
        // console.log("TEST")
        let title = document.querySelector("#titleInputTaskEdit").value
        let desc = document.querySelector("#descInputEdit").value
        let date = document.querySelector("#dateInputEdit").value
        let priority = document.querySelector("input[name='priorityEdit']:checked").value
        let notes = document.querySelector("#notesInputEdit").value
        // console.log(title)
        // console.log(desc)
        // console.log(date)
        // console.log(priority)
        // console.log(notes)
        emitterTaskEdit.emit("submitTaskEdit", title, desc, date, priority, notes)
        closeModalTaskEdit()
    }

    return {openModalTaskEdit}
})()

export {
    renderModalTaskEdit,
    emitterTaskEdit
}
