import { Component, OnInit }   from '@angular/core';
import { Location }             from '@angular/common';
import { 
  AngularFireDatabase, 
  FirebaseListObservable,
  FirebaseObjectObservable,
}                              from 'angularfire2/database';
import {
  Router,
  ActivatedRoute,
  Params 
}                              from '@angular/router';
import { ItemListComponent }   from '../../item/item-list/item-list.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  companyKey;
  company;
  coId: string;
  coName: string;
  coColor: string;
  constructor(
    // private _companyService: CompanyService,
    // private _invoiceService: InvoiceService,
    private location: Location,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      };


  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.companyKey = params['id']; 
        console.log('companyKey', this.companyKey);
         });
    this.db.object('/companies/'+ this.companyKey).subscribe(x=>{
      this.company = x;
      this.coId = x.$key;
      this.coName = x.name
      console.log('company.name', this.company.name);
    })
  }
  
  // goToEditItem(item?: Item, company?: Company) {
  goToEditItem() {
        // let id = item.id;
        // let coId = item.companyId;
        // this.router.navigate(['/item-edit/' + id, { id: id, coId: coId }]);
  }
  setColor(color) {
      return color
  }
  goToItemDetail(item) {
  }
  goToEditCompany() {
  }
  goBack() {
      this.location.back();
  }

  getNothing() {

  }
}
