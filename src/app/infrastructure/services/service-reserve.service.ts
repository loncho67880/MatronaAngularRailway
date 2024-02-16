import { Injectable } from '@angular/core';
import { ReserveRepository } from '../../domain/respository/reserve.repository';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfraReserveService implements ReserveRepository {
  constructor() {}

  createReserve(data: any): Observable<any> {
    return of(1);
  }
}
