import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../domain/respository/repository';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Confirmed,
  Login,
  TokeRespose,
  User,
} from '../../domain/interfaces/auth.interfaces';
import {
  RegisterModel,
  TokenModel,
  UserModel,
} from '../../domain/models/models';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InfraAuthService implements AuthRepository {
  public http = inject(HttpClient);

  private baseUrl: string = environment.baseUrl;
  private payloadToken: TokenModel = new TokenModel(
    environment.userTokenRailway,
    environment.passwordTokenPailway
  );

  get getTokenLocal(): string {
    return localStorage.getItem('token') || '';
  }

  httpHeaders(token: string) {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  register(data: RegisterModel, token: string): Observable<User> {
    console.log('Register del usuario');
    const headers = this.httpHeaders(token);
    console.log(data);
    const dataRegister: RegisterModel = new RegisterModel(
      0,
      data.name,
      data.lastname,
      data.userName,
      data.identification.toString(),
      data.password,
      data.email
    );
    return this.http.post<User>(
      `${this.baseUrl}/api/User/CreateUser`,
      dataRegister,
      {
        headers,
      }
    );
  }
  login(data: UserModel): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/api/User/LoginUser`, data);
  }
  getToken(): Observable<TokeRespose> {
    return this.http.post<TokeRespose>(
      `${this.baseUrl}/validate`,
      this.payloadToken
    );
  }

  confirmUser(code: string, token: string): Observable<Confirmed> {
    const headers = this.httpHeaders(token);
    const data = {
      code,
    };
    return this.http.post<Confirmed>(
      `${this.baseUrl}/api/User/ConfirmUser`,
      data,
      {
        headers,
      }
    );
  }

  // validatedUser(email: string, token: string): Observable<User> {
  //   const data = {
  //     email
  //   }

  //  return this.http.<User>('', data)
  // }
}
