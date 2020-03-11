import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {CarouselComponent} from './carousel/carousel.component';
import { ModalInfoComponent } from './modalInfo/modalInfo.component';
import { MustMatchDirective } from './directives/must-match.directive';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NotificationComponent } from './notification/notification.component';
import { RatingComponent } from './rating/rating.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CarouselComponent,
    ModalInfoComponent,
    MustMatchDirective,

    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NotificationComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    RouterModule,
    CarouselComponent,
    ModalInfoComponent,
    MainLayoutComponent,
    RatingComponent
  ]
})
export class SharedModule {
}
