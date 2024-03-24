import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, ReserveService } from '../../../../services';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observer, catchError, map, switchMap, throwError } from 'rxjs';
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
  private route = inject(Router);
  visible: boolean = false;
  code!: string;

  // * Observer de la respuesta de la suscripcion
  public observer: Observer<any> = {
    next: (value: any) => {
      this.backBooking();
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
        map(({ code }) => {
          this.code = code;
        }),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => Error(error));
        })
      )
      .subscribe();
  }

  canceled() {
    this.authService
      .getToken()
      .pipe(
        switchMap(({ token }) => {
          const data = new BookingCanceled(this.code, true);
          return this.reserveService.canceledBooking(data, token);
        })
      )
      .subscribe(this.observer);
  }

  backBooking() {
    this.route.navigateByUrl('./booking');
  }
}
