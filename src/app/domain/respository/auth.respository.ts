import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, TokeRespose, User } from '../interfaces/auth.interfaces';
import { UserModel } from '../models/user.model';

export const AuthRepositoryInject = new InjectionToken<AuthRepository>(
  'Auth_Repository'
);

export interface AuthRepository {
  register(): Observable<User>;
  login(data: UserModel): Observable<Login>;
  getToken(): Observable<TokeRespose>;
}
