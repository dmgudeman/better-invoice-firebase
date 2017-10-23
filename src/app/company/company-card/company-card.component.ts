// Displays one company
// input: a companyId

import { Component, OnInit, Input } from '@angular/core';
import { MdCardModule }             from '@angular/material';
import { 
  ActivatedRoute, 
  Router, 
  Params,
}                                   from '@angular/router';
// 3rd Party
import { AngularFireAuth } from 'angularfire2/auth';
import { 
  AngularFireDatabase, 
  FirebaseListObservable,
  FirebaseObjectObservable,
}                                   from 'angularfire2/database';
// Custom
import { Company }                  from '../company';
import { Shared }                   from '../../shared/shared';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss'],
})
  
export class CompanyCardComponent implements OnInit {
  shared:Shared = new Shared();
  companyKey: string;
  @Input() company;
  @Input() companiesArray;
  name:string;
  color:string;
  userId;
  fUserId;
  user;
  // invoice: Invoice;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    ) {
      this.user = afAuth.authState;
     }

  ngOnInit() {
    this.afAuth.authState.subscribe ( user => {
      if (!user) return;
      this.userId = user.uid;
      this.fUserId = user.providerData[0].uid;
      this.name = this.company.name;
      this.color = this.company.color;
      this.companyKey = this.company.companyKey
    })
  }
  
  
  setClassColor() {
      return this.shared.setClassColor(null, this.color);
  }
  goToCompanyDetails(){
    this.router.navigate(['/company-details/', {id:this.companyKey}]);
  }

  goToInvoice() {
    console.log('invoice-edit list URL', '/invoice-edit/' + this.companyKey);
    this.router.navigate(['/invoice-edit/', {companyKey:this.companyKey}]);
  }

  goToInvoiceList() {
    console.log('invoices list URL', '/invoices/' + this.companyKey);
    this.router.navigate(['/invoices/', {id:this.companyKey} ]);
  }

  goToEditCompany(){
      if (this.company){
          let companyKey = this.company.companyKey;
          let coName = this.company.name;
          let color = this.company.color;
          this.router.navigate(['/edit-company/' + companyKey, {id:companyKey, name:coName, color:color}]);
      } else {
          this.router.navigate(['/edit-company']);
     }
  }
  addItem(){
    this.router.navigate(['/item-edit/', { companyKey:this.companyKey }]);
  }
} 

