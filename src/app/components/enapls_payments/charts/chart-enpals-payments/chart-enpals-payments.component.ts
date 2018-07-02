import { Component, OnInit, Input } from '@angular/core';
import {FormsModule} from '@angular/forms'

// Services
import { Service } from '../../../../services/index';
import { EnpalsPaymentsService } from '../../_services/index';

@Component({
  selector: 'chart-enpals-payments',
  templateUrl: './chart-enpals-payments.component.html',
  styleUrls: ['./chart-enpals-payments.component.scss']
})
export class ChartEnpalsPaymentsComponent implements OnInit {

  private enpals_payments:any = [];
  date = new Date();
  years: any = [];
  months: Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0];

  chartData:any = [];
  chartOptions = {
    responsive: true
  };
  chartLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  constructor(
    private service: Service,
    private own_service: EnpalsPaymentsService
  ) { }

  printYears(from) {
    let current_year = this.date.getFullYear();
    for(let i = from; i <= current_year; i++) {
      this.years.push(i)
    }
  }

  getDate(value){
    let date_from = value + '-01' + '-01';
    let date_to = value + '-12' + '-31';
    this.sendRequest(date_from, date_to);
  }

  sendRequest(date_from, date_to) {
    this.own_service.getFromDate(date_from, date_to).subscribe(
      data => {
        this.calcolate(data);
      },
      err => {
        console.log(err);
      }
    )
  }

  calcolate(data) {
    let result:any = [];
    let it_self = this;
    let year;
    data.map(function(elem) {
      let date = new Date(elem.data_payments);
      year = date.getFullYear();
      let month = date.getMonth();
      let amount = parseInt(elem.amount);
      it_self.months[month] += amount;
    });
    let obj = {
      "data": this.months,
      "label": year
    }
    this.chartData.push(obj);
    console.log(this.chartData);
  }

  // chartData = [
  //   { data: [330, 600, 260, 700], label: '2018' },
  // ];

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {
    this.printYears("1960");
  }

}
