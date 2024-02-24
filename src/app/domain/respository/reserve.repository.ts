import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../models/models';
import { Booking } from '../interfaces/bookings.interfaces';

export const ReserveRepositoryInject = new InjectionToken<ReserveRepository>(
  'Reserve_Repository'
);

export interface ReserveRepository {
  createReserve(data: BookingModel, token: string): Observable<any>;
  getBookings(): Observable<Booking[]>;
}
