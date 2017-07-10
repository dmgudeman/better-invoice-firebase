import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, 
         Routes, 
         RouterOutlet }             from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment }        from '../environments/environment';

import { AppRoutingModule }        from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyModule }        from './company/company.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule,
    CompanyModule,
  ],
  providers: [
    RouterOutlet,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
