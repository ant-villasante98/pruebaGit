import { Event } from '../../models/Events';
import * as apiGoogleService from '../../services/apiGoogle-services';
import { faAngleRight, faAngleLeft } from '../.././assets/svg/iconsSVG.js'

let events: Event[];



let dateNow: Date = new Date();
let local: string = 'es';

let intlMonth: Intl.DateTimeFormat = new Intl.DateTimeFormat(local, { month: 'long' });
let intlDay: Intl.DateTimeFormat = new Intl.DateTimeFormat(local, { weekday: 'narrow' });
let intlFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat(local, { month: 'long', weekday: 'long', day: 'numeric' })


let months: number[] | string[] = Array.from({ length: 12 }, (value: any, i: number) => i);
let daysWeek: number[] = Array.from({ length: 7 }, (v, i) => i);

//valores de la fecha actual
let controlDate = {
    year: dateNow.getFullYear(),
    day: dateNow.getDate(),
    month: dateNow.getMonth()
}
let today = {
    year: dateNow.getFullYear(),
    day: dateNow.getDate(),
    month: dateNow.getMonth()
}
console.log(today.day);
// ++today.day
// console.log(today.day);
console.log(FormatDate(new Date(today.year, today.month, today.day)))
console.log(FormatDate(new Date(today.year, today.month + 1, today.day)))

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

//ejecucion de funciones
renderMonth()
getDate()
console.log(document.querySelector('.nameMonth').getAttribute('class'))


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


//renderizando y armando la estructura del calendario
function renderMonth(y: number = today.year, m: number = today.month, d: number = today.day): void {
    console.log(controlDate)
    let html: string = '';
    const { nameMonth, daysOfMonth, firtsDay } = detailsMonth(y, m);
    let monthToday: boolean = today.month == m;

    let days: number[] = Array.from({ length: daysOfMonth }, (v, i) => i + 1);
    const title: string = `<h1 class='nameMonth'>
    <a id="calendar-month-past">${faAngleLeft}</a>
    <font> ${nameMonth} ${y}</font>
    <a id="calendar-month-next">${faAngleRight}</i></a>
    </h1>`;


    let renderDays: string = days.map((rd) => {
        let DateISO: string = (new Date(y, m, rd)).toJSON().substring(0, 10)
        let flagToday: string = '';
        let idDate: string = ` id="date-${DateISO}"`;

        if (monthToday && rd == today.day) {
            flagToday = ` class="calendar-today"`

        }

        return `<li${flagToday}><a ${idDate}>${rd}</a></li>`
    }).join('');

    let renderFirtsDay: string = Array.from({ length: firtsDay }, () => '<li></li>').join(' ')

    let dayNameWeek: string[] = daysWeek.map((dayName, index) => {
        let nameday: string = intlDay.format(new Date(2020, 2, index + 1));
        return nameday;
    });

    let renderNameDay: String = dayNameWeek.map((nameDay) => {
        return `<li class='day-name'>${nameDay}</li>`

    }).join('');

    html = `<div class='contentMonth'>${title}
    <ol> ${renderNameDay}
    ${renderFirtsDay}
    ${renderDays}</ol></div>`


    document.getElementById('contenedor-calendario').innerHTML = html;
    document.querySelector('#calendar-month-next').addEventListener('click', (e) => {
        nextMonth();
        console.log('click');

    })
    document.querySelector('#calendar-month-past').addEventListener('click', (e) => {
        pastMonth();
        console.log('click');

    })

}


function getDate(): any {

    apiGoogleService.getDate()
        .then((res) => res.json())
        .then(resJson => {
            events = resJson.items;
            // console.log('Eventos:--', events)
            insertEvents()
            return

        })

}
function insertEvents(): void {

    let htmlEvent = document.querySelector('#container-calendar-events')
    let itemEvents: string = '';
    let dateRepeat = 0;

    events.forEach((e, i) => {
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
    console.log('-----aqui-----')
    htmlEvent.innerHTML = itemEvents
}
function FormatDate(fDate: Date): string {
    return fDate.toJSON().split('T')[0]
}

function nextMonth(): void {
    ++controlDate.month
    if (controlDate.month > 11) {
        ++controlDate.year;
        controlDate.month = 0
    }
    renderMonth(controlDate.year, controlDate.month, controlDate.day)
    const timeMin: string = FormatDate(new Date(controlDate.year, controlDate.month, 1));
    const timeMax: string = FormatDate(new Date(controlDate.year, controlDate.month + 1, 1));
    apiGoogleService.getDate(timeMin, timeMax)
        .then((res) => res.json())
        .then(resJson => {
            events = resJson.items;
            // console.log('Eventos:--', events)
            insertEvents()
            return

        })
    // console.log('next----')

}
function pastMonth(): void {
    --controlDate.month;
    if (controlDate.month < 0) {
        --controlDate.year;
        controlDate.month = 11;
    }
    renderMonth(controlDate.year, controlDate.month, controlDate.day)
    const timeMin: string = FormatDate(new Date(controlDate.year, controlDate.month, 1));
    const timeMax: string = FormatDate(new Date(controlDate.year, controlDate.month + 1, 1));
    apiGoogleService.getDate(timeMin, timeMax)
        .then((res) => res.json())
        .then(resJson => {
            events = resJson.items;
            // console.log('Eventos:--', events)
            insertEvents()
            return

        })
    // console.log('next----')

}