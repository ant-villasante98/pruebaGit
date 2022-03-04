import { Event } from '../../models/Events';
import * as  apiGoogleService from '../../services/apiGoogle-services'

let events: Event[];



let dateNow: Date = new Date();
let local: string = 'es';
let html: string;

let intlMonth: Intl.DateTimeFormat = new Intl.DateTimeFormat(local, { month: 'long' });
let intlDay: Intl.DateTimeFormat = new Intl.DateTimeFormat(local, { weekday: 'narrow' });
let intlFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat(local, { month: 'long', weekday: 'long', day: 'numeric' })


let months: number[] | string[] = Array.from({ length: 12 }, (value: any, i: number) => i);
let daysWeek: number[] = Array.from({ length: 7 }, (v, i) => i);

//valores de la fecha actual
let today = {
    year: dateNow.getFullYear(),
    day: dateNow.getDate(),
    month: dateNow.getMonth()
}
console.log(today.day);
// today.day += 1;
console.log(dateNow)

let calendar: any[] = months.map((value: number, i) => {
    let nameMonth: string = intlMonth.format(new Date(today.year, value)).toUpperCase();
    let daysOfMonth: number = (new Date(today.year, i + 1, 0)).getDate();
    let firtsDay: number = (new Date(today.year, i, 1)).getDay()
    // console.log(firtsDay, intlDay.format(new Date(today.year, i, 1)))
    return {
        nameMonth,
        daysOfMonth,
        firtsDay
    }

})

//imformacion de un solo mes
function detailsMonth(y: number = today.year, m: number = today.month): any {
    let nameMonth: string = intlMonth.format(new Date(today.year, m)).toUpperCase();
    let daysOfMonth: number = (new Date(today.year, m + 1, 0)).getDate();
    let firtsDay: number = (new Date(today.year, m, 1)).getDay()
    // console.log(firtsDay, intlDay.format(new Date(today.year, i, 1)))
    return {
        nameMonth,
        daysOfMonth,
        firtsDay
    }
}
// console.log(calendar)
// console.log((new Intl.DateTimeFormat(local, { weekday: 'long' })).format(new Date(2020, 2, 2)));

//renderizando y armando la estructura del calendario
function renderMonth(y: number = today.year, m: number = today.month, d: number = today.day): string {
    const { nameMonth, daysOfMonth, firtsDay } = detailsMonth();
    let monthToday: boolean = today.month == m;

    let days: number[] = Array.from({ length: daysOfMonth }, (v, i) => i + 1);
    const title: string = `<h1 class='nameMonth'>${nameMonth} ${today.year}</h1>`;


    let renderDays: string = days.map((d) => {
        let DateISO: string = (new Date(today.year, m, d)).toJSON().substring(0, 10)
        let flagToday: string = '';
        // let dayEvent: number | string = d;
        let idDate: string = ` id="date-${DateISO}"`;

        if (monthToday && d == today.day) {
            flagToday = ` class="calendar-today"`

        }

        return `<li${flagToday}><a ${idDate}>${d}</a></li>`
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


}
html = renderMonth();




document.getElementById('contenedor-calendario').innerHTML = html;
function prueba() {
    //     let intlFormat = new 
    //         console.log('aqui')
}

apiGoogleService.getDate()
    .then((res) => res.json())
    .then(resJson => {
        events = resJson.items;
        // console.log('Eventos:--', events)

        let htmlEvent = document.querySelector('#container-calendar-events')
        let itemEvents: string = '';
        let dateRepeat = 0;

        events.forEach((e, i) => {
            // console.log(e.start.dateTime.substring(0, 10), e.summary)
            let dateISO: string = e.start.dateTime.substring(0, 10);
            let dateObjec = {
                year: Number.parseInt(dateISO.substring(0, 4)),
                month: Number.parseInt(dateISO.substring(5, 7)),
                day: Number.parseInt(dateISO.substring(9))
            }
            let FlagMultiEvent: boolean = dateObjec.day != dateRepeat;
            if (FlagMultiEvent) {
                itemEvents += '</div>'
            }
            if (FlagMultiEvent) {
                let htmlDay = document.getElementById(`date-${dateISO}`)
                if (htmlDay) {
                    htmlDay.style.color = '#08abec';
                    htmlDay.style.textDecoration = 'none';
                    htmlDay.setAttribute('href', `#span-calendar-event-${dateISO}`);

                    htmlDay.addEventListener('click', (e) => {

                        document.getElementById(`calendar-event-${dateISO}`).click()
                    }
                    )
                }
            }


            let dateFormatLong = intlFormat.format(new Date(dateObjec.year, dateObjec.month - 1, dateObjec.day));
            console.log(dateFormatLong);
            if (FlagMultiEvent) {
                itemEvents += `<span class="span-calendar-event" id="span-calendar-event-${dateISO}"></span><div class="article-calendar-event" id="calendar-event-${dateISO}"><h4>${dateFormatLong}</h4><p>* ${e.summary}</p>`;
            }
            else {
                itemEvents += `<p>* ${e.summary}</p>`;
            }
            if (i + 1 == events.length) {
                itemEvents += '</div>'
            }
            dateRepeat = dateObjec.day;

        });
        htmlEvent.innerHTML = itemEvents

    })
