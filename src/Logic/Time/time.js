const Time = (() => {
    const msInDay = 1000 * 60 * 60 * 24
    const msInHour = 1000 * 60 * 60
    const msinMinute = 1000 * 60
    const msinSecond = 1000

    /**Gets time difference between two date points.
     * Lets user know how much time is left in
     * days:hours:hours:minutes:seconds format
     * @param {Time when task is due} due 
     */
    const getTimeDifference = (due) => {
        const today = new Date()
        const dueDate = new Date(due)
        const diffTime = dueDate - today
        if(diffTime <= 0) return null
        const days = Math.floor(diffTime/msInDay)
        const hours = Math.floor(diffTime/msInHour) % 24
        const minutes = Math.floor(diffTime/msinMinute) % 60
        const seconds = Math.floor(diffTime/msinSecond) % 60  
        return(`${days}d:${hours}h:${minutes}m:${seconds}s`)
    }

    /**Convert date from yyyy-mm-ddThh:mm -> dd/mm/yyyy
     * 
     * @param {date to convert} date 
     */
    const dateConversion = (date) => date.split("T")[0].split("-").reverse().join("/")

    return{
        getTimeDifference,
        dateConversion
    }
})()

export{
    Time
}