import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';
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
    private filmService: FilmService
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

  generateInvoice(form: NgForm) {
    let currentInvoice = form.value;
    let different = (currentInvoice.grossCompensation * currentInvoice.taxPercetual) / 100;
    this.netCompensation =  currentInvoice.grossCompensation - different;
    currentInvoice.netCompensation = this.netCompensation;
    this.dubberService.dubber.invoices.push(currentInvoice);
    let refactDubberObject = this.dubberService.dubber;
    this.dubberService.update(refactDubberObject);
    form.reset();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.dubberService.getById(this.id);
    });
    this.filmService.getAll();
  }

}
