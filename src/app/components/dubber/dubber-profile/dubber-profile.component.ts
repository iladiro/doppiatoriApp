import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';
import { FilmService } from '../../film/film.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './dubber-profile.component.html',
  styleUrls: ['./dubber-profile.component.scss'],
  providers: [DubberService, FilmService]
})

export class DubberProfileComponent implements OnInit {

  id: number;
  private sub: any;
  currentDubber;

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
    this.currentDubber = form.value;
    this.currentDubber.id = this.id;
    this.getFirstChar(this.currentDubber);
    this.dubberService.updateDubber(this.currentDubber);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.dubberService.getDubber(this.id);
    });
  }

}
