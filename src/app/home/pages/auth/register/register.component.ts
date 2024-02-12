import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderAuthComponent } from '../../../shared/components/header-auth/header-auth.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services';

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
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      document: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: this.passwordIguales('password', 'confirm') }
  );

  public authService = inject(AuthService);

  constructor(private fb: FormBuilder) {}

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
    this.authService.register();
  }
}
