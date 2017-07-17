import { 
  Component, 
  OnInit,
  ViewChild
 }                             from '@angular/core';
import { Location }            from '@angular/common';
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
import { AddressComponent }    from '../../address/address/address.component';
import { ItemListComponent }   from '../../item/item-list/item-list.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  @ViewChild(AddressComponent) addressViewChild: AddressComponent;
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
        this.coId = this.companyKey;
      });
    this.db.object('/companies/'+ this.companyKey).subscribe(x=>{
      this.company = x;
      this.coId = x.$key;
      this.coName = x.name
      this.coColor = x.color;
      if(this.company && this.company.address){
      this.addressViewChild.address = this.company.address;
      console.log('XXXXXXXXXXXXXXXcompany', this.company);
    }
    })
  };
  
  // ngAfterViewInit(){
  //   console.log('THHHHHHHHHISSSSSS this.company', this.company);
  //   if(this.company && this.company.address){
  //     this.addressViewChild.address = this.company.address;
  //   }
  // }
  
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
        this.router.navigate(['/company-edit/' + this.coId]);

  }
  goBack() {
      this.location.back();
  }

  getNothing() {

  }
}
