import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../models/models';

export const ReserveRepositoryInject = new InjectionToken<ReserveRepository>(
  'Reserve_Repository'
);

export interface ReserveRepository {
  createReserve(data: BookingModel, token: string): Observable<any>;
}
