import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';
import { InvoiceService } from '../invoices.service';
import { FilmService } from '../../film/film.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './dubber-profile.component.html',
  styleUrls: ['./dubber-profile.component.scss']
})

export class DubberProfileComponent implements OnInit {

  id: number;
  private sub: any;
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

  upDateParsonalDate(form: NgForm){
    let currentDubber = form.value;
    currentDubber.id = this.id;
    currentDubber.film = this.dubberService.dubber.film;
    this.getFirstChar(currentDubber);
    this.dubberService.update(currentDubber);
  }

  deleteFilm(idFilm) {
    //Updating dubber object after event delete film
    let currentDubber = this.dubberService.dubber;
    currentDubber.film.map(function(film, index){
      if(film.id == idFilm) {
        currentDubber.film.splice(index, 1);
      }
    });
    this.dubberService.update(currentDubber);
    //end

    //Updating film object after event delete film
    let filmObject;
    this.filmService.filmsList.map(function(film) {
      if(film.id == idFilm) {
        film.dubbers.map(function(dubber, index) {
          film.dubbers.splice(index, 1);
        });
        filmObject = film;
      };
    });
    this.filmService.update(filmObject);
    // end
  }

  compensationCalculation(gross, percentual) {
    let difference = (gross * percentual) / 100;
    let resultNet = gross - difference;
    return [difference, resultNet]
  }

  generateInvoice(form: NgForm) {
    let date = new Date();
    let currentInvoice = form.value;
    currentInvoice.id = Math.floor((Math.random() * 1000000) + 1);
    currentInvoice.creationDate = date.toDateString();

    let result = this.compensationCalculation(currentInvoice.grossCompensation, currentInvoice.taxPercetual);
    currentInvoice.taxEuro = result[0];
    currentInvoice.netCompensation = result[1];

    this.dubberService.dubber.invoices.push(currentInvoice);
    let refactDubberObject = this.dubberService.dubber;
    this.dubberService.update(refactDubberObject);

    /*After update dubber object, I can add dubberLinked property on current
    invoice because I want that this object is write only into invoices table*/
    currentInvoice.dubberLinked = {
      "id": this.dubberService.dubber.id,
      "name": this.dubberService.dubber.name,
      "surname": this.dubberService.dubber.surname,
      "fiscalCode": this.dubberService.dubber.fiscalCode,
      "birthdate": this.dubberService.dubber.birthdate,
      "birthplace": this.dubberService.dubber.birthplace,
      "residenceplace": this.dubberService.dubber.residenceplace,
      "residenceaddress": this.dubberService.dubber.residenceaddress,
      "residencecountry": this.dubberService.dubber.residencecountry
    };
    this.invoiceService.create(currentInvoice);

    form.reset();
  }

  deleteInvoice(currentInvoice) {
    let currentDubber = this.dubberService.dubber;
    currentDubber.invoices.map(function(invoice, index){
      if(invoice.id == currentInvoice.id) {
        currentDubber.invoices.splice(index, 1);
      }
    });
    this.dubberService.update(currentDubber);
    this.invoiceService.delete(currentInvoice);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.dubberService.getById(this.id);
    });
    this.filmService.getAll();
    this.invoiceService.getAll();
  }

}
