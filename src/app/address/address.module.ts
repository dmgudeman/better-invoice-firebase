import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ReactiveFormsModule }        from '@angular/forms';
import { MaterialModule }        from '@angular/material';
// 3rd Party
import { AgmCoreModule }             from 'angular2-google-maps/core';

// Custom
import { AddressComponent } from './address/address.component';
import { AddressAutoComponent } from './address-auto/address-auto.component';

@NgModule({
  imports: [
    AgmCoreModule
    .forRoot({
      apiKey: 'AIzaSyBcnyegbgQ6MLbeopaGx2SNV1vfIrK57yc',
      // apiKey: 'IzaSyDYh_Wiron-ohG-_ltgfPiPKZyqxnvxlsM',
      libraries:["places",]

    }),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddressComponent, 
    AddressAutoComponent,
  ],
  exports:[
     AddressComponent,
     AddressAutoComponent,
  ]
})
export class AddressModule { }