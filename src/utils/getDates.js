const daysOfWeek = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
]

const getDates = (date) => {
    
    let today = new Date
    if (date === undefined) date = today

    let day = daysOfWeek[date.getDay()-1]

    // today = dateToString(day, month, year)
    // maxDate = dateToString(maxDay, maxMonth, maxYear)
    console.log(day, today)
    return day
}

export default getDates