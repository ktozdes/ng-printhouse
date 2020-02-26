import { NgModule } from '@angular/core';

import {EffectsModule} from '@ngrx/effects';
import { StoreModule} from '@ngrx/store';
import { reducers } from './app-state';
import { AuthEffects } from './effects/auth.effects';
import { UserEffects } from './effects/user.effects';


@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects
    ]),
    StoreModule.forRoot(reducers),
  ]
})
export class AppStoreModule { }
