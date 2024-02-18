import { Inject, Injectable } from '@angular/core';
import {
  ReserveRepository,
  ReserveRepositoryInject,
} from '../../../domain/respository/repository';
import { BookingModel } from '../../../domain/models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  constructor(
    @Inject(ReserveRepositoryInject)
    private reserveRepository: ReserveRepository
  ) {}

  createReserve(data: BookingModel, token: string): Observable<any> {
    return this.reserveRepository.createReserve(data, token);
  }
}
