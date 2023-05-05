import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TotalAmountServiceService } from 'src/app/total-amount-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalAmount = 0;
  totalPrices = [0, 0, 0];
  prices = [500, 300, 200];
  show = false;
  quotation = '';
  customer = '';

  webServices = [0, 0];

  pipe = new DatePipe('es-ES');

  queryParams = {
    web: false,
    seo: false,
    ads: false,
    pages: this.webServices[0],
    langs: this.webServices[1]
  };

  constructor(private totalAmountService: TotalAmountServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.router.navigate([], {
    //   // relativeTo: this.route,
    //   queryParams: {
    //     web: this.totalPrices[0] != 0 ? true : false,
    //     seo: this.totalPrices[1] != 0 ? true : false,
    //     ads: this.totalPrices[2] != 0 ? true : false,
    //     pages: this.webServices[0],
    //     langs: this.webServices[1]
    //   },
    //   queryParamsHandling: 'merge',
    // })
    // this.setQueryParams();
    this.getQueryParams();
    // this.setQueryParams();
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      console.log("GET! " + Boolean(params['web']));
      console.log(this.totalPrices);
      Boolean(params['web']) ? this.totalPrices[0] = this.prices[0] : false;
      console.log(this.totalPrices);
    })
  }

  setQueryParams() {
    this.router.navigate([], {
      queryParams: {
        web: this.totalPrices[0] != 0 ? true : false,
        seo: this.totalPrices[1] != 0 ? true : false,
        ads: this.totalPrices[2] != 0 ? true : false,
        pages: this.webServices[0],
        langs: this.webServices[1]
      }
    })
    console.log("SET!!")
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

    this.setQueryParams();
  }

  receivePages(e: any) {
    this.webServices[0] = Number(e);
    this.totalAmount = this.totalAmountService.calculateTotalAmount(this.totalPrices, this.webServices);
    this.setQueryParams();
  }

  receiveLangs(e: any) {
    this.webServices[1] = Number(e);
    this.totalAmount = this.totalAmountService.calculateTotalAmount(this.totalPrices, this.webServices);
    this.setQueryParams();
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
