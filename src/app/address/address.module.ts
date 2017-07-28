import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule, 
}                                from '@angular/forms';
import { MaterialModule }        from '@angular/material';
// 3rd Party
import { AgmCoreModule }             from 'angular2-google-maps/core';

// Custom
import { AddressComponent }         from './address/address.component';
import { AddressAutoComponent }     from './address-auto/address-auto.component';
import { AddressProducerComponent } from './address-producer/address-producer.component';
import { AddressService }           from './address.service';

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
  // FormControl, FormGroup, 
  FormsModule, 
  ReactiveFormsModule, 
  ],
  declarations: [
    AddressComponent, 
    AddressAutoComponent, AddressProducerComponent,
  ],
  providers: [
    AddressService,
  ],
  exports:[
     AddressComponent,
     AddressAutoComponent,
  ]
})
export class AddressModule { }