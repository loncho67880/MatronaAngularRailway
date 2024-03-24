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

  get imageBooking(): any[] {
    return [
      {
        itemImageSrc: '../../../../../../assets/image/lugar1.jpeg',
        thumbnailImageSrc: '../../../../../../assets/image/lugar1.jpeg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: '../../../../../../assets/image/lugar2.jpeg',
        thumbnailImageSrc: '../../../../../../assets/image/lugar2.jpeg',
        alt: 'Description for Image 2',
        title: 'Title 2',
      },
      {
        itemImageSrc: '../../../../../../assets/image/lugar3.jpeg',
        thumbnailImageSrc: '../../../../../../assets/image/lugar3.jpeg',
        alt: 'Description for Image 3',
        title: 'Title 3',
      },
      {
        itemImageSrc: '../../../../../../assets/image/lugar4.jpeg',
        thumbnailImageSrc: '../../../../../../assets/image/lugar4.jpeg',
        alt: 'Description for Image 4',
        title: 'Title 4',
      },
      {
        itemImageSrc: '../../../../../../assets/image/lugar5.jpeg',
        thumbnailImageSrc: '../../../../../../assets/image/lugar5.jpeg',
        alt: 'Description for Image 5',
        title: 'Title 5',
      },
      {
        itemImageSrc: '../../../../../../assets/image/lugar6.jpeg',
        thumbnailImageSrc: '../../../../../../assets/image/lugar6.jpeg',
        alt: 'Description for Image 6',
        title: 'Title 6',
      },
      {
        itemImageSrc: '../../../../../../assets/image/lugar7.jpeg',
        thumbnailImageSrc: '../../../../../../assets/image/lugar7.jpeg',
        alt: 'Description for Image 7',
        title: 'Title 7',
      },
      {
        itemImageSrc: '../../../../../../assets/image/lugar8.jpeg',
        thumbnailImageSrc: '../../../../../../assets/image/lugar8.jpeg',
        alt: 'Description for Image 8',
        title: 'Title 8',
      },
      {
        itemImageSrc: '../../../../../../assets/image/lugar9.jpeg',
        thumbnailImageSrc: '../../../../../../assets/image/lugar9.jpeg',
        alt: 'Description for Image 9',
        title: 'Title 9',
      },
    ];
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
