import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'printhouse';
  constructor(private authorizationService: AuthorizationService) {
    this.authorizationService.checkLoginExpiration();
  }
  ngOnInit() {
  }
}


