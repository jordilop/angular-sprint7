import { DatePipe } from '@angular/common';
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
  quotation = '';
  customer = '';

  webServices = [0, 0];

  pipe = new DatePipe('es-ES');

  constructor(private totalAmountService: TotalAmountServiceService) { }

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

  setQuotation() {
    const date = this.pipe.transform(Date.now(), 'dd/MM/yyyy HH:mm');
    const services: Array<string> = [];
    this.totalPrices.map((price, index) => {
      index == 0 && price > 0 ? services.push('Web') : false;
      index == 1 && price > 0 ? services.push('Seo') : false;
      index == 2 && price > 0 ? services.push('Ads') : false;
    })

    this.totalAmountService.setQuotationList(
      date,
      services.toString(),
      this.quotation,
      this.customer,
      this.totalAmount
    );
  }
}
