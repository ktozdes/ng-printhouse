import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router,
  Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  routerLoading = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          this.routerLoading = true;
        }
        else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          setTimeout(() => {
            this.routerLoading = false;
          }, 1000 );
        }
      });
  }

}
