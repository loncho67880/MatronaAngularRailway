import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReserveService } from '../../../../services';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
})
export default class ReserveComponent implements OnInit {
  ngOnInit(): void {
    this.createReserve();
  }
  public fb = inject(FormBuilder);
  public reserveService = inject(ReserveService);

  public formReserve: FormGroup = this.fb.group({
    date: [],
    hour: [],
    peoples: [],
    name: [],
    document: [],
    phone: [],
    email: [],
  });

  createReserve() {
    this.reserveService.createReserve();
  }
}
