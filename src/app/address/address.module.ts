import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { MaterialModule }        from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [AddressComponent],
  exports:[
     AddressComponent,
  ]
})
export class AddressModule { }
