import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {NgForm} from '@angular/forms';

// Models
import { Film } from '../../film/_models/index';

// Services
import { DubberService } from '../_services/dubbers.service';
import { InvoiceService } from '../_services/invoices.service';
import { FilmService } from '../../film/_services/index';

@Component({
  templateUrl: './dubber-profile.component.html',
  styleUrls: ['./dubber-profile.component.scss']
})

export class DubberProfileComponent implements OnInit {

  id: number;
  private sub: any;
  model: any;
  films: Film[];
  private message = {
    "text": "",
    "class": ""
  };

  netCompensation: number;

  constructor(
    private route: ActivatedRoute,
    private dubberService: DubberService,
    private filmService: FilmService,
    private invoiceService: InvoiceService
  ) {}

  getFirstChar(whichModel) {
    let createAvatar = whichModel.name.charAt(0);
    whichModel.avatar = createAvatar;
  }

  compensationCalculation(gross, percentual) {
    let difference = (gross * percentual) / 100;
    let resultNet = gross - difference;
    return [difference, resultNet]
  }

  private upDateDubber(){
    this.dubberService.update(this.model).subscribe(
      data => {
        this.message.text = "Film has been updated successfully!";
        this.message.class = "success";
      },
      err => {
        this.message.text = "Error occured!";
        this.message.class = "danger";
      }
    );
  }

  private deleteFilm(idFilm) {
    // Cancella film dalla lista dei film del dubber corrente
    let currentDubber = this.model;
    currentDubber.film.map(function(film, index){
      if(film.id == idFilm) {
        currentDubber.film.splice(index, 1);
      }
    });
    this.dubberService.update(this.model).subscribe();
    // end

    // Cancella il dubber dal film che vuoi cancellare e aggiorna l'oggetto film
    let filmObject;
    this.films.forEach(function(film) {
      if(film.id == idFilm) {
        film.dubbers.map(function(dubber, index) {
          film.dubbers.splice(index, 1);
        });
        filmObject = film;
      }
    });
    this.filmService.update(filmObject).subscribe();
    // end
  }

  private generateInvoice(form: NgForm) {
    // Genera fattura, pusha l'oggetto fattura dentro alla proprietà invoices e poi aggiorna il modello
    let date = new Date();
    let currentInvoice = form.value;
    let result = this.compensationCalculation(currentInvoice.grossCompensation, currentInvoice.taxPercetual);
    currentInvoice = {
      "id": Math.floor((Math.random() * 1000000) + 1),
      "creationDate": date.toLocaleDateString(),
      "movie": currentInvoice.movie,
      "compensation": {
        "gross": +currentInvoice.grossCompensation,
        "taxPercetual": +currentInvoice.taxPercetual,
        "taxEuro": result[0],
        "net": result[1]
      }
    };
    this.model.invoices.push(currentInvoice);
    this.upDateDubber();
    //  end

    // Aggiungi all'oggetto fattura i dati del dubber e poi crea una nuova fattura nella tabbella invoices
    currentInvoice.dubber = {
      "id": this.model.id,
      "surname": this.model.surname,
      "email": this.model.email
    }
    this.invoiceService.create(currentInvoice).subscribe();
    // end

    form.reset();
  }

  private deleteInvoice(currentInvoice) {
    let currentDubber = this.model;
    currentDubber.invoices.map(function(invoice, index){
      if(invoice.id == currentInvoice.id) {
        currentDubber.invoices.splice(index, 1);
      }
    });
    this.dubberService.update(currentDubber).subscribe(
      data => {
        this.message.text = "Invoice has been deleted successfully!";
        this.message.class = "success";
      },
      err => {
        this.message.text = "Error occured!";
        this.message.class = "danger";
      }
    );
    this.invoiceService.delete(currentInvoice).subscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.dubberService.getById(this.id).subscribe(
        data => { this.model = data; }
      );
    });
    this.filmService.getAll().subscribe(
      data => { this.films = data; }
    );
    this.invoiceService.getAll();
  }

}
