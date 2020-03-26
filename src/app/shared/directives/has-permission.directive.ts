import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { userState } from 'src/app/store/app-state';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  permissions: Array<string>;
  checkingPermissions: string;

  constructor(private store: Store <any>,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef
    ) {
    const getState = this.store.select(userState);
    getState.subscribe((state) => {
      this.permissions = state.permissions;
    });
  }
  @Input()
  set appHasPermission(val) {
    if (Array.isArray(this.permissions)) {
      if (this.permissions.includes(val)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
    else{
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
