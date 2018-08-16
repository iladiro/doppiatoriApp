import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'banksList',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BanksListComponent implements OnInit {

  @Input() dubber: any;
  @Output() msg = new EventEmitter();
  @Output() current_bank = new EventEmitter();
  // @Input() current_bank;

  constructor(
    private service: Service
  ) { }

  private getData(data){
    console.log(data.item);
    this.current_bank.emit(data.item);
  }

  private getMessage(text) {
    this.msg.emit({text: text, type: 'modal'});
  }

  // delete(bank) {
  //   console.log(bank);
  //   let index = this.dubber.banks.indexOf(bank.item);
  //   this.service.delete("banks", "id", bank.item.id).subscribe(
  //     data => {
  //       if(index > -1) {
  //         this.dubber.banks.splice(index, 1);
  //       }
  //       this.msg.emit("delete");
  //     },
  //     err => {
  //       this.msg.emit("rejected");
  //     }
  //   )
  // }


  ngOnInit() {}

}
