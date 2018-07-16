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

  checkValidation(year) {
    //cd this.chartData.includes()
    // this.chartData.filter(function (obj) {
    //   if(obj.label != year) {
    //     console.log(obj)
    //   }
    // });
  }

  getDate(year){
    this.chartData.forEach((item, i) => {
      if(item.label != year) {
        return item;
      }
    });

    let date_from = year + '-01' + '-01';
    let date_to = year + '-12' + '-31';
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
    this.months = [0,0,0,0,0,0,0,0,0,0,0,0];
    data.map(function(elem) {
      let date = new Date(elem.data_payments);
      year = date.getFullYear();
      let month = date.getMonth();
      let amount = parseInt(elem.amount);
      it_self.months[month] += amount;
    });
    let obj = {
      "data": this.months,
      "label": JSON.stringify(year)
    };
    this.chartData.push(obj);
    this.newDataPoint(this.months, JSON.stringify(year))
  }

  onChartClick(event) {
    console.log("pip");
  }

  newDataPoint(dataArr = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], label) {
    this.chartData.forEach((dataset, index) => {
      console.log(dataset);
      this.chartData[index] = Object.assign({}, this.chartData[index], {
        data: [...this.chartData[index].data]
      });
    });
    this.chartLabels = [...this.chartLabels];
  }

  ngOnInit() {
    let current_year = this.date.getFullYear();
    this.printYears("1960");
    this.getDate(current_year);
  }

}
