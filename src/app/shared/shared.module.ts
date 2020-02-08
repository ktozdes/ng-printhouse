import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselComponent} from './carousel/carousel.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    CarouselComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarouselComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
