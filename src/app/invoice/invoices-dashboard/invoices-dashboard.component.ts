import { 
  AfterViewInit,
  Component, 
  OnInit,
  ViewChild
 }                             from '@angular/core';
import { DomSanitizer }          from '@angular/platform-browser';
import { Location }            from '@angular/common';
import { 
  MdIconModule,
  MdIconRegistry,
  MaterialModule,
 }                               from '@angular/material';
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
// 3rd party
import { AngularFireAuth }     from 'angularfire2/auth';
import { Observable }            from 'rxjs/Observable';
//Custom
import * as firebase from 'firebase/app';
// import { AddressComponent }    from '../../address/address/address.component';
// import { CompanyService }      from '../company.service';
import { ItemListComponent }   from '../../item/item-list/item-list.component';

@Component({
  selector: 'app-invoices-dashboard',
  templateUrl: './invoices-dashboard.component.html',
  styleUrls: ['./invoices-dashboard.component.scss']
})
export class InvoicesDashboardComponent implements OnInit{
  // @ViewChild(AddressComponent) addressViewChild: AddressComponent;
  address;
  companyKey;
  company;
  companiesArray;
  coId: string;
  coName: string;
  coColor: string;
  fUserId: string
  icons=['add', 'chevron-left'];
  invoices;
  user: Observable<firebase.User>
  userId: string;
  
  constructor(
    // private _companyService: CompanyService,
    // private _invoiceService: InvoiceService,
    public afAuth: AngularFireAuth,
    private location: Location,
    // private companyService:CompanyService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private iconRegistry: MdIconRegistry,
    private router: Router,
    private sanitizer: DomSanitizer,
    ) {
      this.icons.forEach((icon) =>{
        iconRegistry.addSvgIcon(
          icon,
          sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
        );
      });
      this.user = afAuth.authState;
    }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.companyKey = params['id']; 
        this.coId = this.companyKey;
      });

    if(!this.user){ 
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user);

    this.afAuth.authState.subscribe ( user => {
      if (user) {
          this.userId = user.uid;
          this.fUserId = user.providerData[0].uid;
          this.getCompany();
          if (this.company && this.company.invoices) {
            this.invoices = (<any>Object).values(this.company.invoices);
          }
      }
    });  
  }
  
  getCompany() {
    firebase.database().ref('/users/'+ this.fUserId + '/companies/' + this.companyKey ).on('value', (snapshot)=> {
      console.log('snapshot', snapshot.val());
      this.company = snapshot.val();
      this.coName = this.company.name
      this.coColor = this.company.color;
      this.address = this.company.address;
      console.log('thiEEEEEEEEE', this.company.invoices);
    });
  }
  
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
  goToInvoice() {
    this.router.navigate(['/invoice-edit/', {companyKey:this.companyKey}]);
  }

  getNothing() {

  }
}

