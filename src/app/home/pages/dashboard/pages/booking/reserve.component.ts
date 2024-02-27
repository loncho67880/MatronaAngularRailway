import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReserveService } from '../../../../services';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingModel, ClientModel } from '../../../../../domain/models/models';
import { AuthService } from '../../../../services/auth/service-auth.service';
import { Observer, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { Hour } from '../../../../../domain/interfaces/bookings.interfaces';
import moment from 'moment-timezone';
// import { format } from 'date-fns-tz';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [
    CalendarModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
})
export default class ReserveComponent implements OnInit {
  public fb = inject(FormBuilder);
  public reserveService = inject(ReserveService);
  public authService = inject(AuthService);

  public formReserve: FormGroup = this.fb.group({
    date: [, [Validators.required]],
    time: [, [Validators.required]],
    peoples: [, [Validators.required, Validators.min(1), Validators.max(20)]],
    name: [, [Validators.required]],
    lastName: [, [Validators.required]],
    document: [, [Validators.required]],
    phone: [, [Validators.required]],
    email: [, [Validators.email, Validators.required]],
  });

  visible: boolean = false;
  public hours!: Hour[];
  minDate: Date = new Date();

  ngOnInit(): void {
    this.authService
      .getToken()
      .pipe(
        switchMap(({ token }) => {
          return this.reserveService.getHour(token);
        }),
        tap((resp) => {
          this.hours = resp;
        })
      )
      .subscribe();
  }

  // * Observer de la respuesta de la suscripcion
  public observer: Observer<any> = {
    next: (value: any) => {
      this.formReserve.reset();
      this.showDialog();
    },
    error: (err: HttpErrorResponse) => {
      // TODO: Ajustar para mostrar el modal
      console.log('Error de peticion', err);
    },
    complete: function (): void {},
  };
  // * Observer de la respuesta de la suscripcion

  createReserve() {
    console.log(this.formReserve.value);
    const client = new ClientModel(
      this.formReserve.get('name')?.value,
      this.formReserve.get('lastName')?.value,
      this.formReserve.get('document')?.value.toString(),
      this.formReserve.get('email')?.value,
      this.formReserve.get('phone')?.value
    );
    const data = new BookingModel(
      this.dateFormate(),
      this.formReserve.get('peoples')?.value,
      client
    );
    console.log(data);
    this.authService.getToken().subscribe(({ token }) => {
      this.reserveService.createReserve(data, token).subscribe(this.observer);
    });
  }

  dateFormate(): string {
    const date = this.formReserve.get('date')?.value;
    const time = this.formReserve.get('time')?.value;
    var isoDate = date.toISOString().split('T')[0];
    console.log(isoDate);
    console.log(time);

    // * Combinando fecha y hora para entregar el formato correcto
    const dateFormat = `${isoDate}T${time}:00.936Z`;

    const fechaMoment = moment(dateFormat);
    const fecha = fechaMoment.tz('America/Bogota');
    console.log(dateFormat);

    return fecha.toISOString();
  }

  validParamForm(param: string): boolean {
    if (
      !this.formReserve.get(param)?.valid &&
      this.formReserve.get(param)?.touched
    ) {
      return true;
    }
    return false;
  }

  showDialog() {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }
}
