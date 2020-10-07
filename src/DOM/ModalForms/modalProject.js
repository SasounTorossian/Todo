
const EventEmitter = require("events")
const emitter = new EventEmitter

const renderModalProject = (() => {
    // Get modal element
    const modalProj = document.querySelector("#modalProj")
    // Get modal form 
    const modalFormProj = document.querySelector(".modalFormProj")
    // Get open button 
    const openBtnProj = document.querySelector("#modalBtnProj")
    // Get close button
    const closeBtnProj = document.querySelector("#closeBtnProj")
    // Get modal submit button
    const submitBtnProj = document.querySelector("#submitBtnProj")

    // Listen for open click 
    openBtnProj.addEventListener("click", openModalProj)
    // Listen for close click 
    closeBtnProj.addEventListener("click", closeModalProj)
    // Listen for outside click
    window.addEventListener("click", outsideClickProj)
    // Listen for submit click
    submitBtnProj.addEventListener("click", submitModalProj)

    // Function to open modal
    function openModalProj() {
        modalProj.style.display = "block"
    } 

    // Function to close modal
    function closeModalProj(){
        modalProj.style.display = "none"
        modalFormProj.reset()
    }

    // Function to close modal if outside click 
    function outsideClickProj(e) {
        if(e.target == modalProj) closeModalProj()
    }

    // Function to submit modal form and create new book
    function submitModalProj(){
        let title = document.querySelector("#title-input-proj").value
        console.log(title)
        if (!title) return
        // let book = new Book(title, author, pages, read)
        // addBookToLibrary(book)
        // render()
        emitter.emit("tester", title)
        closeModalProj()
    }

    return {openModalProj}
})()

export {
    renderModalProject,
    emitter
}