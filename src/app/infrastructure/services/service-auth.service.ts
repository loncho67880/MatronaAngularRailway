import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../domain/respository/repository';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Login,
  TokeRespose,
  User,
} from '../../domain/interfaces/auth.interfaces';
import { TokenModel, UserModel } from '../../domain/models/models';
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

  register(): Observable<User> {
    console.log('Register del usuario');
    return this.http.post<User>(`${this.baseUrl}/api/User/CreateUser`, {});
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
}
