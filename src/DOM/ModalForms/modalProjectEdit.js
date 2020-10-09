
const EventEmitter = require("events")
const emitterProjEdit = new EventEmitter

const renderModalProjectEdit = (() => {
    // Get modal element
    const modalProjEdit = document.querySelector("#modalProjEdit")
    // Get modal form 
    const modalFormProjEdit = document.querySelector(".modalFormProjEdit")
    // Get open button 
    // const openBtnProjEdit = document.querySelector(".editProject")
    // Get close button
    const closeBtnProjEdit = document.querySelector("#closeBtnProjEdit")
    // Get modal submit button
    const submitBtnProjEdit = document.querySelector("#submitBtnProjEdit")

    // Listen for open click 
    // openBtnProjEdit.addEventListener("click", openModalProjEdit)
    // Listen for close click 
    closeBtnProjEdit.addEventListener("click", closeModalProjEdit)
    // Listen for outside click
    window.addEventListener("click", outsideClickProjEdit)
    // Listen for submit click
    submitBtnProjEdit.addEventListener("click", submitModalProjEdit)

    // Function to open modal
    function openModalProjEdit() {
        modalProjEdit.style.display = "block"
    } 

    // Function to close modal
    function closeModalProjEdit(){
        modalProjEdit.style.display = "none"
        modalFormProjEdit.reset()
    }

    // Function to close modal if outside click 
    function outsideClickProjEdit(e) {
        if(e.target == modalProjEdit) closeModalProjEdit()
    }

    // Function to submit modal form and create new book
    function submitModalProjEdit(){
        let title = document.querySelector("#titleInputProjEdit").value
        emitterProjEdit.emit("submitProjEdit", title)
        closeModalProjEdit()
    }

    return {openModalProjEdit}
})()

export {
    renderModalProjectEdit,
    emitterProjEdit
}