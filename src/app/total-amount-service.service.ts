import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountServiceService {

  quotationList: Array<IQuotation> = [];

  constructor() { }

  calculateTotalAmount(totalPrices: Array<number>, webServices: Array<number>) {
    let totalAmount = webServices.reduce((accumulator, currentValue) => accumulator * currentValue) * 30;
    totalPrices.map(price => totalAmount += price);
    return totalAmount;
  }

  setQuotationList(date: string | null, services: string, quotation: string, customer: string, total: number) {
    this.quotationList.push({
      date: date,
      services: services,
      quotation: quotation,
      customer: customer,
      total: total
    });
    console.log(this.quotationList);
  }

}

interface IQuotation {
  date: string | null,
  services: string,
  quotation: string,
  customer: string,
  total: number
}
