import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, useAnimation } from '@angular/animations';
import {
  fadeIn,
  fadeOut,
} from './carousel.animation';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [useAnimation(fadeIn, {params: { time: '1300ms' }} )]),
      transition('* => void', [useAnimation(fadeOut, {params: { time: '1300ms' }})]),
    ])
  ]
})
export class CarouselComponent implements OnInit {
  slides = [{
    src: '../assets/images/homepage-slider3.jpg'
  },
  {
    src: '../assets/images/homepage-slider2.jpg'
  },
  {
    src: '../assets/images/homepage-slider1.jpg'
  }];
  currentSlide = 0;
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.showNextSlide();
    }, 8000);
  }
  showNextSlide() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

}
