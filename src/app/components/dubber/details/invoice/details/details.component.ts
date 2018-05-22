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
  private sub: any;
  invoice: any;

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
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.invoiceService.getById(this.id).subscribe(
        data => {
          this.invoice = data;
          this.service.getById("addresses", "dubber_id", this.invoice.dubber_id).subscribe(
            data => {
              this.invoice.dubber.address = data;
            }
          );
          this.service.getById("enpals_categories", "dubber_id", this.invoice.dubber_id).subscribe(
            data => {
              this.invoice.dubber.enpals_categories = data;
            }
          );
          this.service.getById("dubber_enpals_data", "invoice_id", this.id).subscribe(
            data => {
              this.invoice.enpals_data = data;
              console.log(this.invoice)
            }
          );
        }
      );
    });
  }

}
