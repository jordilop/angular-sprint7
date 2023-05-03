import { Component } from '@angular/core';
import { TotalAmountServiceService } from 'src/app/total-amount-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalAmount = 0;
  totalPrices = [0, 0, 0];
  prices = [500, 300, 200];
  show = false;

  webServices = [0, 0];

  constructor(private totalAmountService: TotalAmountServiceService) {

  }

  onChanged(e: any) {
    let { name, checked } = e.target;
    let index = 0;
    this.totalAmount = 0;

    name == 'web' ? index = 0 : false;
    name == 'seo' ? index = 1 : false;
    name == 'ads' ? index = 2 : false;

    name == 'web' && checked ? this.show = true : false;
    name == 'web' && !checked ? this.show = false : false;

    checked ? this.totalPrices[index] = this.prices[index] : this.totalPrices[index] = 0;

    this.totalAmount = this.totalAmountService.calculateTotalAmount(this.totalPrices, this.webServices);
  }

  receivePages(e: any) {
    this.webServices[0] = Number(e);
    this.totalAmount = this.totalAmountService.calculateTotalAmount(this.totalPrices, this.webServices);
  }

  receiveLangs(e: any) {
    this.webServices[1] = Number(e);
    this.totalAmount = this.totalAmountService.calculateTotalAmount(this.totalPrices, this.webServices);
  }
}
