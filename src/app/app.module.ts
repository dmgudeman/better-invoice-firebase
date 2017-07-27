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
  MaterialModule,
  MdCardModule,
  MdDatepickerModule,
  MdInputModule,
  MdListItem,
  MdListModule,
  MdNativeDateModule,
  MdTabsModule,
 }                                   from '@angular/material'
import {
  RouterModule, 
  Routes, 
  RouterOutlet 
}                                    from '@angular/router';
// 3rd party
import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule }     from 'angularfire2/auth';
import { environment }               from '../environments/environment';
// custom
import { AddressModule }             from './address/address.module';
import { AppRoutingModule }          from './app-routing.module';
import { AppComponent }              from './app.component';
import { CompanyModule }             from './company/company.module';
import { InvoiceEditComponent }      from './invoice/invoice-edit/invoice-edit.component';
import { InvoiceListComponent }      from './invoice/invoice-list/invoice-list.component';
import { InvoicePrePdfComponent }    from './invoice/invoice-pre-pdf/invoice-pre-pdf.component';
import { InvoiceService }            from './invoice/invoice.service';
import { ItemEditComponent }         from './item/item-edit/item-edit.component';
import { LoginComponent }            from './user/login/login.component';
import { MyIcons }                   from './shared/my-icons';
import { RegisterComponent }         from './user/register/register.component';
import { TempComponent }             from './temp/temp/temp.component';
import { Temp2Component }            from './temp/temp2/temp2.component';
import { InvoicesDashboardComponent } from './invoice/invoices-dashboard/invoices-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceEditComponent,
    InvoiceListComponent,
    InvoicePrePdfComponent,
    ItemEditComponent,
    LoginComponent,
    RegisterComponent,
    TempComponent,
    Temp2Component,
    InvoicesDashboardComponent,
  ],
  imports: [
    AddressModule,
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
    MdListModule,
    MdDatepickerModule,
    MdInputModule,
    MdNativeDateModule,
    MdTabsModule,
  ],
  exports:[
    MaterialModule,
    MdListModule,
    // MyIcons,
  ],
  providers: [
    InvoiceService,
    MyIcons,
    RouterOutlet,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
