export interface Event {
    id: string
    start: {
        dateTime: string,
        timeZone: string
    }
    summary: string
    creator: {
        email: string
    }
    end: {
        dateTime: string,
        timeZone: string
    }
    status: string
}