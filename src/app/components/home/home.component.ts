import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TotalAmountServiceService } from 'src/app/total-amount-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalAmount = 0;
  quotation = '';
  customer = '';

  queryParams = {
    web: false,
    seo: false,
    ads: false,
    pages: 0,
    langs: 0
  };

  pipe = new DatePipe('es-ES');

  constructor(private totalAmountService: TotalAmountServiceService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe(queryParams => {
      if (Object.keys(queryParams).length == 0) {
        this.router.navigate([], { queryParams: this.queryParams })
      } else {
        this.activeRoute.queryParams.subscribe(params => {
          this.queryParams.web = (/true/).test(params['web']);
          this.queryParams.ads = (/true/).test(params['ads']);
          this.queryParams.seo = (/true/).test(params['seo']);
          this.queryParams.pages = Number(params['pages']);
          this.queryParams.langs = Number(params['langs']);
          if (!this.queryParams.web) {
            this.router.navigate([], {
              queryParams: {
                pages: 0,
                langs: 0
              },
              queryParamsHandling: 'merge'
            })
          }
        })
      }
    });

    this.totalAmount = this.totalAmountService.calculateTotalAmountObject(this.queryParams);
  }

  onChanged(e: any) {
    this.totalAmount = 0;
    if (!this.queryParams.web) {
      this.queryParams.pages = 0;
      this.queryParams.langs = 0;
    }

    this.router.navigate([], { queryParams: this.queryParams });

    this.totalAmount = this.totalAmountService.calculateTotalAmountObject(this.queryParams);
  }

  receivePages(e: any) {
    this.queryParams.pages = Number(e);
    this.router.navigate([], {
      queryParams: {
        pages: this.queryParams.pages
      },
      queryParamsHandling: 'merge'
    });

    this.totalAmount = this.totalAmountService.calculateTotalAmountObject(this.queryParams);
  }

  receiveLangs(e: any) {
    this.queryParams.langs = Number(e);
    this.router.navigate([], {
      queryParams: {
        langs: this.queryParams.langs
      },
      queryParamsHandling: 'merge'
    });

    this.totalAmount = this.totalAmountService.calculateTotalAmountObject(this.queryParams);
  }

  setQuotation() {
    const date = this.pipe.transform(Date.now(), 'dd/MM/yyyy HH:mm');
    const services: Array<string> = [];
    this.queryParams.web ? services.push(`Web(${this.queryParams.pages},${this.queryParams.langs})`) : false;
    this.queryParams.seo ? services.push('Seo') : false;
    this.queryParams.ads ? services.push('Ads') : false;

    this.totalAmountService.setQuotationList(
      date,
      services.toString(),
      this.quotation,
      this.customer,
      this.totalAmount
    );
  }
}
