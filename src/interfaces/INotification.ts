export interface INotification {
    _id?: number,
    patientId: number,

    title: string,
    description: string,

    read: boolean,

    dateTime: Date
}