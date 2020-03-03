import { NgModule } from '@angular/core';

import {EffectsModule} from '@ngrx/effects';
import { StoreModule} from '@ngrx/store';
import { reducers } from './app-state';
import { AuthEffects } from './effects/auth.effects';
import { UserEffects } from './effects/user.effects';
import { MessageEffects } from './effects/message.effects';


@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects,
      MessageEffects
    ]),
    StoreModule.forRoot(reducers),
  ]
})
export class AppStoreModule { }
