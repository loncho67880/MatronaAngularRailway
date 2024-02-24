export class BookingModel {
  constructor(
    public dateBooking: string,
    public amount: number,
    public client: ClientModel
  ) {}
}

export class ClientModel {
  constructor(
    public name: string,
    public lastName: string,
    public identification: string,
    public email: string
  ) {}
}