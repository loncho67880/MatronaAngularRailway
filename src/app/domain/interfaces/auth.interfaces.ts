export interface User {
  id?: number;
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

export interface TokeRespose {
  token: string;
  isAuthenticated: boolean;
}

export interface Login {
  logged: boolean;
  user?: User;
}
