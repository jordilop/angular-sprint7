import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalAmount = 0;
  totalPrices = [0, 0, 0];
  prices = [500, 300, 200];

  onChanged(e: any) {
    let {name, checked} = e.target;
    let index = 0;
    this.totalAmount = 0;
    
    name == 'web' ? index = 0 : false;
    name == 'seo' ? index = 1 : false;
    name == 'ads' ? index = 2 : false;

    checked ? this.totalPrices[index] = this.prices[index] : this.totalPrices[index] = 0;

    this.calculateTotalAmount();
  }

  calculateTotalAmount = () => this.totalPrices.map(price => this.totalAmount += price);
}
