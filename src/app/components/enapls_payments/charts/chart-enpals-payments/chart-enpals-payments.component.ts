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

  //selected_date:string=''

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
    let date = value + '-01' + '-01';
    console.log(date);
    this.sendRequest(date);
  }

  sendRequest(date) {
    this.own_service.getFromDate(date).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }

  // chartOptions = {
  //   responsive: true
  // };
  //
  // chartData = [
  //   { data: [330, 600, 260, 700], label: '2016' },
  //
  //
  //
  //   { data: [120, 455, 100, 340], label: '2017' },
  //   { data: [45, 67, 800, 500], label: '2018' }
  // ];
  //
  // chartLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  //
  // onChartClick(event) {
  //   console.log(event);
  // }

  // loadAllItems(table, variable, condition) {
  //   this.service.getAll(table, condition).subscribe(
  //     data => {
  //       this[variable] = data;
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   );
  // }

  // createObjPassingToChart(item) {
  //   let resultes = [];
  //   item.map(function(element) {
  //     let amount = element.amount;
  //     let date = element.data_payments;
  //     let splitted_date = date.split('-');
  //     let year = splitted_date[0];
  //     let month = splitted_date[1];
  //     let obj = {
  //       "year": year,
  //       "month": month,
  //       "amount": amount
  //     }
  //     resultes.push(obj);
  //   })
  //   console.log(resultes);
  // }

  ngOnInit() {
    this.printYears("1960");
    //this.loadAllItems("enpals_payments", "enpals_payments", "all");
  }

}
