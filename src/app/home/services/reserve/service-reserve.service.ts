import { Inject, Injectable, inject } from '@angular/core';
import {
  ReserveRepository,
  ReserveRepositoryInject,
} from '../../../domain/respository/repository';
import { BookingModel } from '../../../domain/models/models';
import { Observable } from 'rxjs';
import { Booking } from '../../../domain/interfaces/bookings.interfaces';
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
}
