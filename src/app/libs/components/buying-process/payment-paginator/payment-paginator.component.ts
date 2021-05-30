import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-paginator',
  templateUrl: './payment-paginator.component.html',
  styleUrls: ['./payment-paginator.component.scss']
})
export class PaymentPaginatorComponent implements OnInit {

  @Input() activePage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
