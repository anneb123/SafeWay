import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { ClickMeComponent } from './click-me.component';

import { HereComponent } from './here.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, ClickMeComponent, HereComponent ],
  //provider: [Datamodel],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
