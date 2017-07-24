import {
  AfterContentInit, 
  Component, 
  OnInit,
 }                                        from '@angular/core';
import { 
  AngularFireDatabase, 
  FirebaseListObservable,
  FirebaseObjectObservable,
}                                         from 'angularfire2/database';
import { Router, 
         ActivatedRoute, 
         Params }                         from '@angular/router';
import { Location }                       from '@angular/common';

// 3rd party
import * as firebase                      from 'firebase/app';
import * as moment                        from 'moment'
import 'rxjs/add/operator/filter';
import { Observable }                     from 'rxjs/Observable';

// custom
import { CompanyService }                 from '../../company/company.service';
import { Company }                        from '../../company/company';
import { Item }                           from '../../item/item';
import { ItemDetailComponent }            from '../../item/item-detail/item-detail.component';
import { Invoice }                        from '../invoice'; 
import { InvoiceService }                 from '../invoice.service';
// import { MyGlobals }                      from '../../shared/myglobals';
import { Shared }                         from '../../shared/shared';


@Component({
  selector: 'app-invoice-pre-pdf',
  templateUrl: './invoice-pre-pdf.component.html',
  styleUrls: ['./invoice-pre-pdf.component.scss']
})
export class InvoicePrePdfComponent implements OnInit {
  address;
  city:string;
  coDetails
  coId: number;
  color:string = '';
  company:Company;
  coName: string = '';
  coInterval: number;
  companyKey: string;
  date = new Date("2017-2-11");
  date2 = new Date("2017-2-12");
  errorMessage: string;
  createdDate: string;
  dueDate: Date;
  invoiceId: string;
  invoice: Invoice;
  invoiceKey: string;
  invoices: Invoice[];
  item: ItemDetailComponent;
  items: Item[];
  items2: Item[] =[];
  m: moment.Moment;
  moment: moment.Moment;
  postalCode: string;
  // myGlobals: MyGlobals;
  shared: Shared;
  state: string;
  street1: string;
  street2: string;
  


  constructor(
    private db: AngularFireDatabase,
    private invoiceService: InvoiceService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    // private moment: moment,
    ) {
    this.shared = new Shared();
    //  this.myGlobals = new MyGlobals();
  }

  ngOnInit() {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    this.route.params.subscribe(params => {this.invoiceKey = params['id']; });
    
    firebase.database().ref('/invoices/' + this.invoiceKey).once('value', (snapshot)  => {
      this.invoice = snapshot.val();
      this.invoiceId = this.invoiceKey;
      this.createdDate = this.invoice.createdAt;
      this.m = moment( this.createdDate );
      // this.company = this._invoiceService.getCompanyFromInvoice(this.invoice);
      this.companyKey = this.invoice.companyId;

            
      firebase.database().ref('/companies/' + this.companyKey ).once('value', (snapshot)=> {
        this.company = snapshot.val();
        this.address = this.company.address;
        console.log('this.address', this.address);

        if(this.company && this.company.address){
          console.log('this.addres2222222', this.address);
          this.street1 = this.address.street1;
          this.street2 = this.address.street2;
          this.city = this.address.city;
          this.state = this.address.state;
          this.postalCode = this.address.postalCode;
        };
        console.log(this.invoice.items);
        if(this.invoice.items){
          this.items = this.invoice.items;
          console.log('this.items', this.items);

        }
          this.coName = this.company.name;
          this.color = this.company.color;
          this.coInterval = this.company.paymentTerms;
          let date = this.m.add(this.coInterval, 'day')
          this.dueDate = this.m.toDate();
          // console.log("this.m ", this.m._d);
          // console.log("coInterval " + this.coInterval);
      });
    });
  }
  ngAfterContentInit () {

        

  }

goNowhere() {};

goBack(): void {
  this.location.back();
}

setColor(color) {
    console.log("COLOR " + this.color);
    return color
}
submit(){
let newPdf = this.invoiceService.addPdf(document.getElementById('invoice-body').innerHTML);
console.log('newPdf', newPdf);
// Get a key for a new Invoice
let newInvoiceKey = this.db.app.database().ref().child('companies').child('invoices').push().key;
  
  // Write the new Invoice's data simultaneously in the invoice list and the company's invoice list
  let updates = {};
  updates['/invoice-pre-pdf/' + newInvoiceKey] = newPdf;
  // this.db.app.database().ref().update(updates);
  // this.company.items.push(this.myform.value);
  this.db.object('/invoice-pre-pdf/'+ newInvoiceKey).update(updates);
//    this._invoiceService
  //        .addPdf(stringy)
  //        .subscribe(
  //           x => {console.log("Success!");
  //             this._router.navigate(['companies'])}, 
  //           response => { if (response.status = 404) {
  //             this._router.navigate(['not-found']);}
  //           }
  //        );
  }
}
