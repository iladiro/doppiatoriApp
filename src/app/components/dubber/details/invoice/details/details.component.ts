import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

// Models
import { Invoice } from '../_models/index';

// Services
import { InvoiceService } from '../_services/index';
import { Service } from '../../../../../services/index';


@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class DetailsInvoiceComponent implements OnInit {

  id: number;
  private dubber: any;
  private company: any;
  private address: any;
  private enpals_categories: any;
  private invoice: any;

  constructor(
    private service: Service,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    @Inject('Window') private window: Window
  ) { }

  generatedPDF() {
    let id = this.id;
    html2canvas(document.getElementById('invoice')).then(function(canvas) {
      let img = canvas.toDataURL("image/png");
      let doc = new jsPDF('l', 'pt', 'a4');
      doc.addImage(img,'PNG',0,0);
      doc.save(id  + ".pdf");
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.invoiceService.getById(this.id).subscribe(
        data => {
          this.dubber = data.dubber;
          this.enpals_categories = data.dubber.enpals_cat[0];
          this.address = data.dubber.address[0];
          this.company = data.company;
          this.enpals_data = data.enpals_data;
          this.film = data.film;
          this.invoice = {
            "reference_month": data.reference_month,
            "reference_year": data.reference_year,
            "work_to": data.work_to,
            "work_from": data.work_from,
            "number_of_days": data.number_of_days,
            "creation_date": data.creation_date,
            "amount": data.amount,
            "total_amount": data.total_amount,
            "vat": data.vat,
            "trattenuta_sindacale": data.trattenuta_sindacale,
            "total_deductions": data.total_deductions,
            "total_enpals": data.total_enpals,
            "total_net": data.total_net
          }
        }
      );
    });
  }

}
