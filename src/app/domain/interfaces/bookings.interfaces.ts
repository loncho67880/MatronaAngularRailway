export interface Booking {
  identification: null | string;
  dateBooking: Date | null;
  amount: number;
  code: null | string;
  canceled: boolean | null;
  clientEntityRead: ClientEntityRead | null;
  id: ID;
  createdAt: Date;
}

export interface ClientEntityRead {
  name: string;
  lastname: string;
  identification: string;
  email: string;
  id: ID;
  createdAt: Date;
}

export interface ID {
  timestamp: number;
  machine: number;
  pid: number;
  increment: number;
  creationTime: Date;
}

export interface Hour {
  id: ID;
  createdAt: Date;
  hour: number;
  minute: number;
}

export interface ID {
  timestamp: number;
  creationTime: Date;
}
