import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, ReserveService } from '../../../../services';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observer, catchError, switchMap, throwError } from 'rxjs';
import { BookingCanceled } from '../../../../../domain/models/booking.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-canceled-booking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './canceled-booking.component.html',
  styleUrl: './canceled-booking.component.css',
})
export default class CanceledBookingComponent implements OnInit {
  private authService = inject(AuthService);
  private reserveService = inject(ReserveService);
  private router = inject(ActivatedRoute);
  visible: boolean = false;

  // * Observer de la respuesta de la suscripcion
  public observer: Observer<any> = {
    next: (value: any) => {
      this.showDialog();
    },
    error: (err: HttpErrorResponse) => {
      // TODO: Ajustar para mostrar el modal
      console.log('Error de peticion', err);
    },
    complete: function (): void {},
  };
  // * Observer de la respuesta de la suscripcion

  ngOnInit(): void {
    this.router.params
      .pipe(
        switchMap(({ code }) => {
          return this.authService.getToken().pipe(
            switchMap(({ token }) => {
              const data = new BookingCanceled(code, true);
              return this.reserveService.canceledBooking(data, token);
            })
          );
        }),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => Error(error));
        })
      )
      .subscribe(this.observer);
  }

  showDialog() {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }
}
