import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { userState } from 'src/app/store/app-state';

@Directive({
  selector: '[appTestDirective]'
})
export class TestDirectiveDirective {
  permissions: Array<string>;
  constructor(
    private element: ElementRef,
    private store: Store <any>,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }
  onInit() {
    const getState = this.store.select(userState);
    getState.subscribe((state) => {
      this.permissions = state.permissions;
    });
  }

  @Input()
  set appTestDirective(val) {
    console.log('test directive:', val, this.permissions);
    // if (val) {
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    // } else {
    //   this.viewContainer.clear();
    // }
  }

}
