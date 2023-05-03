import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountServiceService {

  constructor() { }

  calculateTotalAmount(totalPrices: Array<number>, webServices: Array<number>) {
    let totalAmount = webServices.reduce((accumulator, currentValue) => accumulator * currentValue) * 30;
    totalPrices.map(price => totalAmount += price);
    return totalAmount;
  }
}
