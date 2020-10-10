const EventEmitter = require("events")
const emitterProjEdit = new EventEmitter

const modalProjectEdit = (() => {
    // Get modal element
    const modalEdit = document.querySelector("#modalProjEdit")
    // Get modal form 
    const modalFormEdit = document.querySelector("#modalFormProjEdit")
    // Get open button 
    // const openBtnProjEdit = document.querySelector(".editProject")
    // Get close button
    const closeBtnEdit = document.querySelector("#closeBtnProjEdit")
    // Get modal submit button
    const submitBtnEdit = document.querySelector("#submitBtnProjEdit")

    // Listen for open click 
    // openBtnProjEdit.addEventListener("click", openModalProjEdit)
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

    // Function to submit modal form and create new book
    function submitModalEdit(){
        let title = document.querySelector("#titleInputProjEdit").value
        emitterProjEdit.emit("submitProjEdit", title)
        closeModalEdit()
    }

    return {openModalEdit}
})()

export {
    modalProjectEdit,
    emitterProjEdit
}