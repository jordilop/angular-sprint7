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

  calculateTotalAmountObject(params: any) {
    let web = params.web ? 500 : 0;
    let seo = params.seo ? 300 : 0;
    let ads = params.ads ? 200 : 0;
    let totalAmount = params.web ? (web + params.pages * params.langs * 30) + seo + ads : web + seo + ads;
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
  }

}

interface IQuotation {
  date: string | null,
  services: string,
  quotation: string,
  customer: string,
  total: number
}
