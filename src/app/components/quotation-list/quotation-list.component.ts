import { Component } from '@angular/core';
import { TotalAmountServiceService } from 'src/app/total-amount-service.service';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css']
})
export class QuotationListComponent {

  list = this.totalAmountService.quotationList;
  orderList = this.totalAmountService.quotationList;

  constructor(private totalAmountService: TotalAmountServiceService) { }

  orderByName = () => this.orderList = [...this.orderList].sort((a, b) => (a.quotation.toLowerCase() < b.quotation.toLowerCase() ? -1 : (a.quotation.toLowerCase() > b.quotation.toLowerCase() ? 1 : 0)));

  orderByDate = () => this.orderList = [...this.orderList].sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));

  resetOrder = () => this.orderList = this.list;

}
