exports.getDate = ()=>{
    const date = new Date()
    const month = Number(date.getMonth()) + 1 
    const finshedDate = `${date.getDate()}/${month}/${date.getFullYear()}`
    return finshedDate
} 