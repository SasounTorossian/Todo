// Contains time format manipulation methods for display purposes.
// Datetime object is presented as yyyy-mm-ddThh:mm
const Time = (() => {
    const msInDay = 1000 * 60 * 60 * 24 //milliseconds in a day
    const msInHour = 1000 * 60 * 60     //milliseconds in an hour
    const msinMinute = 1000 * 60        //milliseconds in a minute

    /** Gets time difference between two date points.
     * Lets user know how much time is left in
     * days:hours:hours:minutes format
     * 
     * @param {time when task is due} due 
     */
    const getTimeDifference = (due) => {
        const today = new Date()
        const dueDate = new Date(due)
        const diffTime = dueDate - today
        if(diffTime <= 0) return null
        const days = Math.floor(diffTime/msInDay)
        const hours = Math.floor(diffTime/msInHour) % 24
        const minutes = Math.floor(diffTime/msinMinute) % 60
        return(`${days}d:${hours}h:${minutes}m`)
    }

    /** Convert date object from yyyy-mm-ddThh:mm -> dd/mm/yyyy
     * 
     * @param {date object to convert} dateObj 
     */
    const getDate = (dateObj) => dateObj.split("T")[0].split("-").reverse().join("/")

    /** Convert date object from yyyy-mm-ddThh:mm -> hh:mm 
     * 
     * @param {date object to convert} dateObj 
     */
    const getTime = (dateObj) => dateObj.split("T")[1]

    return{
        getTimeDifference,
        getDate,
        getTime
    }
})()

export{
    Time
}