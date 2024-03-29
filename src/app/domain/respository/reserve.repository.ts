import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingCanceled, BookingModel } from '../models/models';
import { Booking, Hour } from '../interfaces/bookings.interfaces';

export const ReserveRepositoryInject = new InjectionToken<ReserveRepository>(
  'Reserve_Repository'
);

export interface ReserveRepository {
  createReserve(data: BookingModel, token: string): Observable<any>;
  getBookings(): Observable<Booking[]>;
  getHour(token: string): Observable<Hour[]>;
  canceledBooking(data: BookingCanceled, token: string): Observable<any>;
}
