export interface User {
  id?: number | ID;
  name: string;
  lastname: string;
  userName: string;
  identification: string;
  password: string;
  email: string;
  confirmationCode?: any;
  expireCode?: any;
  validated?: any;
}

export interface ID {
  timestamp: number;
  creationTime: Date;
}

export interface TokeRespose {
  token: string;
  isAuthenticated: boolean;
}

export interface Login {
  logged: boolean;
  user?: User;
}

export interface Confirmed {
  confirmed: boolean;
  user: UserConfimed;
}

export interface UserConfimed {
  name: string;
  lastname: string;
  userName: string;
  identification: string;
  password: string;
  email: string;
}
