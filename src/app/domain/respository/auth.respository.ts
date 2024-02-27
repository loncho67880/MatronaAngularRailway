import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Confirmed,
  Login,
  TokeRespose,
  User,
} from '../interfaces/auth.interfaces';
import { RegisterModel, UserModel } from '../models/auth.model';

export const AuthRepositoryInject = new InjectionToken<AuthRepository>(
  'Auth_Repository'
);

export interface AuthRepository {
  register(data: RegisterModel, token: string): Observable<User>;
  login(data: UserModel): Observable<Login>;
  getToken(): Observable<TokeRespose>;
  confirmUser(code: string, token: string): Observable<Confirmed>;
  // validatedUser(email: string, token: string): Observable<User>;
}
