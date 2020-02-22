import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  showModal = false;
  popupTitle = 'Сзязаться с нами';
  popupContent = `
  <div class="notification">
    <p>Телефон: 0552-92-54-83.</p>
    <p>Адрес: Литовская, 3 Октябрьский район, Бишкек</p>
    <p>электроная почта: munkov@gmail.com</p>
  </div>
  `;
  constructor() { }

  ngOnInit() {
  }
  showModalInfo() {
    this.showModal = true;
  }

}
