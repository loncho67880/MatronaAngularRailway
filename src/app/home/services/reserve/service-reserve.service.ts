import { Inject, Injectable, inject } from '@angular/core';
import {
  ReserveRepository,
  ReserveRepositoryInject,
} from '../../../domain/respository/repository';
import { BookingCanceled, BookingModel } from '../../../domain/models/models';
import { Observable, retry } from 'rxjs';
import { Booking, Hour } from '../../../domain/interfaces/bookings.interfaces';
import { AuthService } from '../auth/service-auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  private authService = inject(AuthService);

  get getTokenLocal(): string {
    return localStorage.getItem('token') || '';
  }

  constructor(
    @Inject(ReserveRepositoryInject)
    private reserveRepository: ReserveRepository
  ) {}

  createReserve(data: BookingModel, token: string): Observable<any> {
    return this.reserveRepository.createReserve(data, token);
  }

  getBookins(): Observable<Booking[]> {
    return this.reserveRepository.getBookings();
  }

  getHour(token: string): Observable<Hour[]> {
    return this.reserveRepository.getHour(token);
  }

  canceledBooking(data: BookingCanceled, token: string): Observable<any> {
    return this.reserveRepository.canceledBooking(data, token);
  }
}
