import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
// Custom
import { AddressEditComponent }       from './address/address-edit/address-edit.component';
import { CompaniesComponent }         from './company/companies/companies.component';
import { CompanyCardComponent }       from './company/company-card/company-card.component';
import { CompanyDetailsComponent }    from './company/company-details/company-details.component';
import { CompanyEditComponent }       from './company/company-edit/company-edit.component';
import { InvoicePrePdfComponent }     from './invoice/invoice-pre-pdf/invoice-pre-pdf.component';
// import { ItemDetailComponent }      from './item/item-detail/item-detail.component';
// import { ItemDetailOneComponent }   from './item/item-detail-one/item-detail-one.component';
import { ItemEditComponent }          from './item/item-edit/item-edit.component';
import { InvoiceEditComponent }       from './invoice/invoice-edit/invoice-edit.component';
import { InvoicesDashboardComponent } from './invoice/invoices-dashboard/invoices-dashboard.component';
import { LoginComponent }             from './user/login/login.component';
// import { NotFoundComponent }        from './not-found/not-found.component'o;
import { TempComponent }              from './temp/temp/temp.component';
import { Temp2Component }             from './temp/temp2/temp2.component';


export const APP_ROUTES: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full'}, 
  { path: 'address',              component: AddressEditComponent },
  { path: 'item-edit/:id',        component: ItemEditComponent },
  { path: 'item-edit',            component: ItemEditComponent },
  { path: 'login',                component: LoginComponent},
  // { path: 'app-item-detail',      component: ItemDetailComponent }, 
  // { path: 'item-detail-one',      component: ItemDetailOneComponent }, 
  { path: 'invoices', children:[{ path:':id', component: InvoicesDashboardComponent},
                                   { path:'', component: InvoicesDashboardComponent}]} ,
  { path: 'invoice-edit',         component: InvoiceEditComponent },
  { path: 'invoice-edit/:id',     component: InvoiceEditComponent },
  // { path: 'invoice-pre-pdf',      component: InvoicePrePdfComponent },
  { path: 'invoice-pre-pdf/:id',  component: InvoicePrePdfComponent },
  { path: 'temp',                 component: TempComponent },
  { path: 'temp2',                component: Temp2Component },
  { path: 'companies',            component: CompaniesComponent}, 
  { path: 'company-card/:id',     component: CompanyCardComponent}, 
  { path: 'company-edit',         component: CompanyEditComponent}, 
  { path: 'company-edit/:id',     component: CompanyEditComponent}, 
  { path: 'company-details',      component: CompanyDetailsComponent}, 
 
];

@NgModule({
   imports: [
    RouterModule.forRoot(APP_ROUTES, {enableTracing:true}),
   ],
   exports: [
    RouterModule
   ],
})

export class AppRoutingModule {}