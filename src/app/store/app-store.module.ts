import { NgModule } from '@angular/core';

import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import { AppState, reducers } from './app-state';
import { AuthEffects } from './effects/auth.effects';


@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forRoot([
      AuthEffects
    ]),
    StoreModule.forRoot(reducers),
  ]
})
export class AppStoreModule { }
