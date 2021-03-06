const EventEmitter = require("events")
const emitterProjEdit = new EventEmitter

// Responsible for manipulating "Edit Project" modal form
const modalProjectEdit = (() => {
    // Get modal element
    const modalEdit = document.querySelector("#modalProjEdit")
    // Get modal form 
    const modalFormEdit = document.querySelector("#modalFormProjEdit")
    // Get close button
    const closeBtnEdit = document.querySelector("#closeBtnProjEdit")
    // Get modal submit button
    const submitBtnEdit = document.querySelector("#submitBtnProjEdit")

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
        if(e.target == modalEdit) closeModalEdit()
    }

    // Function to emit editProj signal for listeniner in domController.js file
    function submitModalEdit(){
        let title = document.querySelector("#titleInputProjEdit").value
        closeModalEdit()
        emitterProjEdit.emit("editProj", title)
    }

    return {openModalEdit}
})()

export {
    modalProjectEdit,
    emitterProjEdit
}