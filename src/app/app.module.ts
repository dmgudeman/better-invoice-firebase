import { BrowserModule }             from '@angular/platform-browser';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';
import { 
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
}                                    from '@angular/core';
import { FlexLayoutModule }          from '@angular/flex-layout';
import { 
  FormsModule,
  ReactiveFormsModule,
}                                    from '@angular/forms';
import { HttpModule }                from '@angular/http';
import {
  RouterModule, 
  Routes, 
  RouterOutlet 
}                                    from '@angular/router';
import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule }     from 'angularfire2/auth';
import { environment }               from '../environments/environment';

import { AppRoutingModule }          from './app-routing.module';
import { AppComponent }              from './app.component';
import { CompanyModule }             from './company/company.module';
import { ItemEditComponent }         from './item/item-edit/item-edit.component';
import { 
  MaterialModule,
  MdCardModule,
  MdDatepickerModule,
  MdInputModule,
  MdNativeDateModule,
  MdTabsModule,
 }                                   from '@angular/material';
import { InvoiceEditComponent }      from './invoice/invoice-edit/invoice-edit.component';
import { InvoicePrePdfComponent }    from './invoice/invoice-pre-pdf/invoice-pre-pdf.component';
import { InvoiceService }            from './invoice/invoice.service';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
// import { AddressEditComponent }      from './address/address-edit/address-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemEditComponent,
    InvoiceEditComponent,
    InvoicePrePdfComponent,
    RegisterComponent,
    LoginComponent,
    // AddressEditComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    CompanyModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule,
    MdDatepickerModule,
    MdInputModule,
    MdNativeDateModule,
    MdTabsModule,
  ],
  providers: [
    InvoiceService,
    RouterOutlet,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
