import { Inject, Injectable } from '@angular/core';
import {
  ReserveRepository,
  ReserveRepositoryInject,
} from '../../../domain/respository/repository';

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  constructor(
    @Inject(ReserveRepositoryInject)
    private reserveRepository: ReserveRepository
  ) {}

  createReserve() {
    this.reserveRepository.createReserve({}).subscribe(console.log);
  }
}
