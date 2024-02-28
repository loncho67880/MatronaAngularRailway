import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveService } from '../../../../services';
import { Table, TableModule } from 'primeng/table';
import { Booking } from '../../../../../domain/interfaces/bookings.interfaces';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export default class BookingsComponent implements OnInit {
  bookingService = inject(ReserveService);
  private router = inject(Router);

  bookings: Booking[] = [];

  // * Observer de la respuesta de la suscripcion
  public observer: Observer<Booking[]> = {
    next: (value: Booking[]) => {
      console.log(value);
      this.bookings = value;
    },
    error: (err: HttpErrorResponse) => {
      console.log('Error de peticion', err);
      this.router.navigateByUrl('/auth');
    },
    complete: function (): void {},
  };
  // * Observer de la respuesta de la suscripcion

  ngOnInit(): void {
    this.bookingService.getBookins().subscribe(this.observer);
  }

  getStatus(status: boolean, title: boolean = false): string {
    if (!title) {
      return status ? 'Cancelada' : 'Procesando';
    } else {
      return status ? 'cancelada' : 'procesada';
    }
  }

  clear(table: Table) {
    table.clear();
  }
}
