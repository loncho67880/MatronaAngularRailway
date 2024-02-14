import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services';
import { HeaderAuthComponent } from '../../../shared/components/header-auth/header-auth.component';
import { UserModel } from '../../../../domain/models/models';
import { Observer } from 'rxjs';
import { User } from '../../../../domain/interfaces/auth.interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderAuthComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export default class AuthComponent {
  public formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  public authService = inject(AuthService);
  public router = inject(Router);

  // * Observer de la respuesta de la suscripcion
  public observer: Observer<User> = {
    next: (value: User) => {
      console.log(value);
      this.router.navigateByUrl('/dashboard/bookings');
    },
    error: (err: HttpErrorResponse) => {
      // TODO: Ajustar para mostrar el modal
      console.log('Error de peticion', err);
    },
    complete: function (): void {},
  };
  // * Observer de la respuesta de la suscripcion

  constructor(private fb: FormBuilder) {}

  login() {
    const data: UserModel = this.formLogin.value;
    this.authService.login(data).subscribe(this.observer);
  }

  validParamForm(param: string): boolean {
    if (
      !this.formLogin.get(param)?.valid &&
      this.formLogin.get(param)?.touched
    ) {
      return true;
    }
    return false;
  }
}
