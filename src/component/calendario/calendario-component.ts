
let dateNow: Date = new Date();
let local: string = 'es'
let intlMonth: Intl.DateTimeFormat = new Intl.DateTimeFormat(local, { month: 'long' });
let intlDay: Intl.DateTimeFormat = new Intl.DateTimeFormat(local, { weekday: 'short' });
let year: number = dateNow.getFullYear();
// let html: HTMLElement = document.getElementById('calendario');
let html: string;
let list: number[] = [1, 2, 3, 4]
// let months: number[] | string[] = Array.from(Array(12).keys());
let months: number[] | string[] = Array.from({ length: 12 }, (value: any, i: number) => i);
let daysWeek: number[] = Array.from({ length: 7 }, (v, i) => i);
console.log(year)
let today: any = {
    day: dateNow.getDate(),
    month: dateNow.getMonth()
}
console.log(today.day)

let calendar: any[] = months.map((value: number, i) => {
    let nameMonth: string = intlMonth.format(new Date(year, value));
    let daysOfMonth: number = (new Date(year, i + 1, 0)).getDate();
    let firtsDay: number = (new Date(year, i, 1)).getDay()
    // console.log(firtsDay, intlDay.format(new Date(year, i, 1)))
    return {
        nameMonth,
        daysOfMonth,
        firtsDay
    }

})
// console.log(calendar)
// console.log((new Intl.DateTimeFormat(local, { weekday: 'long' })).format(new Date(2020, 2, 2)));

html = calendar.map(({ nameMonth, daysOfMonth, firtsDay }: any, i) => {
    let monthToday: boolean = today.month == i;
    const title: string = `<h1 class='nameMonth'>${nameMonth} ${year}</h1>`;
    let days: number[] = Array.from({ length: daysOfMonth }, (v, i) => i + 1);

    let renderDays: string = days.map((d) => {
        let flagToday: string = '';
        if (monthToday && d == today.day) {
            flagToday = ` class='calendario-hoy'`
        }
        return `<li${flagToday}>${d}</li>`
    }).join('');
    let renderFirtsDay: string = Array.from({ length: firtsDay }, () => '<li></li>').join(' ')

    let dayNameWeek: string[] = daysWeek.map((dayName, index) => {
        let nameday: string = intlDay.format(new Date(2020, 2, index + 1));
        return nameday;
    });

    let renderNameDay: String = dayNameWeek.map((nameDay) => {
        return `<li class='day-name'>${nameDay}</li>`

    }).join('');
    return `<div class='contentMonth'>${title}
    <ol> ${renderNameDay}
    ${renderFirtsDay}
    ${renderDays}</ol></div>`
}).join('')
document.getElementById('contenedor-calendario').innerHTML = html;
