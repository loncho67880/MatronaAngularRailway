import { Inject, Injectable, computed, signal } from '@angular/core';
import {
  AuthRepository,
  AuthRepositoryInject,
} from '../../../domain/respository/repository';
import { Observable, map, tap } from 'rxjs';
import {
  Login,
  TokeRespose,
  User,
} from '../../../domain/interfaces/auth.interfaces';
import { RegisterModel, UserModel } from '../../../domain/models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(AuthRepositoryInject)
    private authRepository: AuthRepository
  ) {}

  #stateUser = signal<Login>({
    logged: false,
  });

  public user = computed(() => this.#stateUser().user);
  public logged = computed(() => this.#stateUser().logged);

  login(data: UserModel): Observable<User> {
    return this.authRepository.login(data).pipe(
      tap((resp) => {
        if (resp.logged) {
          this.#stateUser.set({
            logged: resp.logged,
            user: resp.user,
          });
        }
      }),
      map((login) => login.user!)
    );
  }

  register(data: RegisterModel, token: string): Observable<User> {
    console.log('registro');
    return this.authRepository.register(data, token);
  }

  getToken(): Observable<TokeRespose> {
    return this.authRepository.getToken();
  }
}
