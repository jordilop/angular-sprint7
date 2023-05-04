import { Component } from '@angular/core';
import { TotalAmountServiceService } from 'src/app/total-amount-service.service';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css']
})
export class QuotationListComponent {

  list = this.totalAmountService.quotationList;

  constructor(private totalAmountService: TotalAmountServiceService) { }

}
