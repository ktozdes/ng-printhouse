import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modalInfo.component.html',
  styleUrls: ['./modalInfo.component.scss']
})
export class ModalInfoComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  content: string;

  @Output()
  closePopup = new EventEmitter<any>();

  isModalActive = false;
  constructor() { }

  ngOnInit() {
  }
  closeModal() {
    this.closePopup.emit(true);
  }

}
