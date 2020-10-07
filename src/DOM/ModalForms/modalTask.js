const renderModalTask = () => {
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
        let title = document.querySelector("#title-input-task").value
        let desc = document.querySelector("#desc-input").value
        let date = document.querySelector("#date-input").value
        let priority = document.querySelector("input[name='priority']:checked").value
        let notes = document.querySelector("#notes-input").value
        console.log(title)
        console.log(desc)
        console.log(date)
        console.log(priority)
        console.log(notes)
        if (!title || !desc || !date || !priority) return
        // let book = new Book(title, author, pages, read)
        // addBookToLibrary(book)
        // render()
        closeModalTask()
    }
}

export {
    renderModalTask
}
