const today = new Date();
const day = today.getDate()
const month = today.getMonth()
const year = today.getFullYear()

const date = FormatDate(today);
const maxDate = FormatDate(new Date(year, month + 1, 1));
const minDate = FormatDate(new Date(year, month, 1));

const url = `https://clients6.google.com/calendar/v3/calendars/hilares33v@gmail.com/events`;
let token = 'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs'
    
function FormatDate(fDate) {
    return fDate.toJSON().split('T')[0]
}
exports.getDate = (timeMin = minDate, timeMax = maxDate)=> {
    // new Date('2022-12-01').getDate()
    // console.log(Number.parseInt('02'))
    return fetch(`${url}?calendarId=hilares33v%40gmail.com&singleEvents=true&timeZone=America%2FLima&maxAttendees=1&maxResults=250&sanitizeHtml=true&orderBy=startTime&timeMin=${timeMin}T00%3A00%3A00-05%3A00&timeMax=${timeMax}T00%3A00%3A00-05%3A00&key=${token}`)
        
}