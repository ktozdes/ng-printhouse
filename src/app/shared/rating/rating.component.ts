import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input()
  rating: number;
  @Input()
  ranks: any;


  @Output() notify: EventEmitter<number> = new EventEmitter<number>();

  currentClass: string;
  constructor() { }

  ngOnInit() {
    this.currentClass = this.ranks[this.rating].class;
  }

  clicked() {
    if (this.rating < this.ranks.length - 1) {
      this.rating++;
    } else {
      this.rating = 0;
    }
    this.currentClass = this.ranks[this.rating].class;
    this.notify.emit(this.ranks[this.rating].id);
  }

}
