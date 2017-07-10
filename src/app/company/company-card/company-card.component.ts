// Displays one company
// input: a companyId

import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { 
  AngularFireDatabase, 
  FirebaseListObservable,
  FirebaseObjectObservable,
}                           from 'angularfire2/database';
// import { InvoiceService } from "../../invoice/invoice.service";
// import { Invoice } from "../../invoice/invoice";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css'],
})
  
export class CompanyCardComponent implements OnInit {
  shared:Shared = new Shared();
  coId: number;
  @Input() company;
  name:string;
  color:string;
  // invoice: Invoice;

  constructor(
    private db: AngularFireDatabase,
    private companyService: CompanyService,
    // private _invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    console.log('this.company.$key', this.company.$key);
    this.name = this.company.name;
    this.color = this.company.color;
    this.coId = this.company.$key
  
  }
  
  
  setClassColor() {
      return this.shared.setClassColor(null, this.color);
  }
  goToCompanyDetails(){
    console.log('company.name', this.company.$key);
    // let coId = company.id;
    // let coName = company.name;
    // let coHourly  company.hourly;
    // let coColor= company.color
    // let uId = 1
    this.router.navigate(['/company-details/', {id:this.company.$key}]);
    //                                            coId:coId,
    //                                            coColor:coColor,
    //                                            coHourly:coHourly, 
    //                                            coName:coName, 
    //                                            uId:uId,
    //                                            }]);
  }

  goToInvoice(company:Company) {
    let uId = 1;
    let coId = company.id;
    
    // company.id;
    // this.invoice = this._invoiceService.makeInvoice(uId,coId);
    this.router.navigate(['/invoice-edit', {id:coId}]);
  }

  goToEditCompany(company?:Company){
      if (company){
          let coId = company.id;
          let coName = company.name;
          let color = company.color;
          let hourly = company.hourly;
          let paymentTerms = company.paymentTerms;
          let active = company.active;
          this.router.navigate(['/edit-company/' + coId, {id:coId, name:coName, color:color}]);
      } else {
          this.router.navigate(['/edit-company']);
     }

  }
  goToEditItem(){
     

      this.router.navigate(['/item-edit/', { coId:this.coId }]);
  }
} 

