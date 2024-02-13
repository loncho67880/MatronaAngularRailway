import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observer } from 'rxjs';

import { AuthService } from '../../../services';
import { RegisterModel } from '../../../../domain/models/models';
import { User } from '../../../../domain/interfaces/auth.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderAuthComponent } from '../../../shared/components/header-auth/header-auth.component';
import { ModalRegisterComponent } from '../../../shared/components/modal-register/modal-register.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderAuthComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  public formRegister: FormGroup = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: this.passwordIguales('password', 'confirm') }
  );

  public authService = inject(AuthService);

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ModalRegisterComponent);
  }

  // * Observer de la respuesta de la suscripcion
  public observer: Observer<User> = {
    next: (value: User) => {
      this.formRegister.reset();
    },
    error: (err: HttpErrorResponse) => {
      // TODO: Ajustar para mostrar el modal
      console.log('Error de peticion', err);
    },
    complete: function (): void {},
  };
  // * Observer de la respuesta de la suscripcion

  validParamForm(param: string): boolean {
    if (
      !this.formRegister.get(param)?.valid &&
      this.formRegister.get(param)?.touched
    ) {
      return true;
    }
    return false;
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGruop: FormGroup) => {
      const pass1Control = formGruop.get(pass1Name);
      const pass2Control = formGruop.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
        pass1Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({
          noEsIgual: true,
        });
        pass1Control?.setErrors({
          noEsIgual: true,
        });
      }
    };
  }

  contrasenasNoValidas(): boolean {
    const password1 = this.formRegister.get('password')?.value;
    const password2 = this.formRegister.get('confirm')?.value;
    return password1 !== password2 ? true : false;
  }

  register() {
    console.log(this.formRegister.value);
    const data: RegisterModel = this.formRegister.value;
    this.authService.getToken().subscribe(({ token }) => {
      this.authService.register(data, token).subscribe(this.observer);
    });
  }
}
