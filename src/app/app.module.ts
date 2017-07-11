import { BrowserModule }             from '@angular/platform-browser';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';
import { 
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
}                                    from '@angular/core';
import { 
  FormsModule,
  ReactiveFormsModule,
}                                    from '@angular/forms';
import { HttpModule }                from '@angular/http';
import { RouterModule, 
         Routes, 
         RouterOutlet }              from '@angular/router';
import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule }     from 'angularfire2/auth';
import { environment }        from '../environments/environment';

import { AppRoutingModule }        from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyModule }        from './company/company.module';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';
import { MdTabsModule }               from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemEditComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    CompanyModule,
    FormsModule,
    HttpModule,
    MdTabsModule,
    ReactiveFormsModule,
  ],
  providers: [
    RouterOutlet,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
