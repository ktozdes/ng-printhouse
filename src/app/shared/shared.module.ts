import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselComponent} from './carousel/carousel.component';
import { HeaderComponent } from './header/header.component';
import { ModalInfoComponent } from './modalInfo/modalInfo.component';
import { MustMatchDirective } from './directives/must-match.directive';



@NgModule({
  declarations: [
    CarouselComponent,
    HeaderComponent,
    ModalInfoComponent,
    
    MustMatchDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarouselComponent,
    HeaderComponent,
    ModalInfoComponent
  ]
})
export class SharedModule { }
