const EventEmitter = require("events")
const emitterProj = new EventEmitter

const modalProject = (() => {
    // Get modal element
    const modal = document.querySelector("#modalProj")
    // Get modal form 
    const modalForm = document.querySelector("#modalFormProj")
    // Get open button 
    const openBtn = document.querySelector("#modalBtnProj")
    // Get close button
    const closeBtn = document.querySelector("#closeBtnProj")
    // Get modal submit button
    const submitBtn = document.querySelector("#submitBtnProj")

    // Listen for open click 
    openBtn.addEventListener("click", openModal)
    // Listen for close click 
    closeBtn.addEventListener("click", closeModal)
    // Listen for outside click
    window.addEventListener("click", outsideClick)
    // Listen for submit click
    submitBtn.addEventListener("click", submitModal)


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
        let title = document.querySelector("#titleInputProj").value
        if(!title) return
        closeModal()
        emitterProj.emit("submitProj", title)
    }

    return {openModal}
})()

export {
    modalProject,
    emitterProj
}