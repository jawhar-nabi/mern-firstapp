export function getdate(separator='-'){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}${' '}${hours}${':'}${minutes<10?`0${minutes}`:`${minutes}`}`
    }
    

    //tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds()