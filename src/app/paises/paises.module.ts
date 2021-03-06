import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectorComponent } from './pages/selector/selector.component';
import { PaisesRoutingModule } from './paises-routing.module';



@NgModule({
  declarations: [
    SelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaisesRoutingModule
  ],
  exports: []
})
export class PaisesModule { }
