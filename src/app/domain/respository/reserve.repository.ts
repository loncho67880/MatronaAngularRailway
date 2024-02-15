import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const ReserveRepositoryInject = new InjectionToken<ReserveRepository>(
  'Reserve_Repository'
);

export interface ReserveRepository {
  createReserve(data: any): Observable<any>;
}
