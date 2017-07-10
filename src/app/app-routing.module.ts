import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
// import { CompanyEditComponent }        from './company/company-edit/company-edit.component';


export const APP_ROUTES: Routes = [
  
 { path: '',  redirectTo: '/company-edit', pathMatch: 'full'}, 
  // { path: 'company-edit',         component: CompanyEditComponent}, //, canActivate : [AuthGuard] },
 
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