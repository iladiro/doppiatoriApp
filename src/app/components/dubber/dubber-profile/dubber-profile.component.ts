import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {NgForm} from '@angular/forms';

// Models
import { Film } from '../../film/_models/index';
import { Invoice } from '../../invoice/_models/index';

// Services
import { DubberService } from '../_services/index';
import { InvoiceService } from '../../invoice/_services/index';
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
  invoices: Invoice[];
  private message = {
    "text": "",
    "class": ""
  };

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

  private upDateDubber(){
    this.dubberService.update(this.model).subscribe(
      data => {
        this.message.text = "It has been updated successfully!";
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
    this.invoiceService.delete(currentInvoice.id).subscribe();
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
    this.invoiceService.getAll().subscribe(
      data => { this.invoices = data; }
    );
  }

}
