import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InvoiceService } from '../_services/invoices.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  templateUrl: './dubber-invoice.component.html',
  styleUrls: ['./dubber-invoice.component.scss'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class DubberInvoiceComponent implements OnInit {

  id: number;
  private sub: any;

  constructor(
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
      doc.save(id + ".pdf");
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.invoiceService.getById(this.id);
    });
  }

}
