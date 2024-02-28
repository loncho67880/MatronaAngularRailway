import { Injectable, inject } from '@angular/core';
import { ReserveRepository } from '../../domain/respository/reserve.repository';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Booking, Hour } from '../../domain/interfaces/bookings.interfaces';
import { BookingCanceled } from '../../domain/models/models';

@Injectable({
  providedIn: 'root',
})
export class InfraReserveService implements ReserveRepository {
  public http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  httpHeaders(token: string) {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  constructor() {}

  canceledBooking(data: BookingCanceled, token: string): Observable<any> {
    const headers = this.httpHeaders(token);
    return this.http.put<any>(
      `${this.baseUrl}/api/Booking/CancelBooking`,
      data,
      {
        headers,
      }
    );
  }

  getHour(token: string): Observable<Hour[]> {
    const headers = this.httpHeaders(token);
    return this.http.get<Hour[]>(
      `${this.baseUrl}/api/Booking/GetAvailabilitysRead`,
      {
        headers,
      }
    );
  }

  getBookings(): Observable<Booking[]> {
    const token = localStorage.getItem('token') || '';
    const headers = this.httpHeaders(token);
    return this.http.get<Booking[]>(
      `${this.baseUrl}/api/Booking/GetBookingsRead`,
      {
        headers,
      }
    );
  }

  createReserve(data: any, token: string): Observable<any> {
    const headers = this.httpHeaders(token);
    return this.http.post<any>(`${this.baseUrl}/api/Booking/Post`, data, {
      headers,
    });
  }
}
