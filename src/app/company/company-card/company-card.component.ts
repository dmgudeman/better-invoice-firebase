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
  name:string;
  color:string;
  // invoice: Invoice;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    console.log('this.company.$key', this.company.$key);
    this.name = this.company.name;
    this.color = this.company.color;
    this.companyKey = this.company.$key
  
  }
  
  
  setClassColor() {
      return this.shared.setClassColor(null, this.color);
  }
  goToCompanyDetails(){
    this.router.navigate(['/company-details/', {id:this.company.$key}]);
  }

  goToInvoice() {
    this.router.navigate(['/invoice-edit/', {companyKey:this.companyKey}]);
  }

  goToEditCompany(){
      if (this.company){
          let companyKey = this.company.id;
          let coName = this.company.name;
          let color = this.company.color;
          // let hourly = company.hourly;
          // let paymentTerms = company.paymentTerms;
          // let active = company.active;
          this.router.navigate(['/edit-company/' + companyKey, {id:companyKey, name:coName, color:color}]);
      } else {
          this.router.navigate(['/edit-company']);
     }

  }
  addItem(){
    this.router.navigate(['/item-edit/', { companyKey:this.companyKey }]);
  }
} 

