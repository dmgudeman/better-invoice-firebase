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
import { DomSanitizer }                   from '@angular/platform-browser';
import { 
  MdIconRegistry,
 }                                        from '@angular/material';
import { Router, 
         ActivatedRoute, 
         Params }                         from '@angular/router';
import { Location }                       from '@angular/common';

// 3rd party
import * as firebase                      from 'firebase/app';
import 'rxjs/add/operator/filter';
import { Observable }                     from 'rxjs/Observable';

// custom
import { Company }                        from '../../company/company';
import { Item }                           from '../../item/item';
import { Invoice }                        from '../invoice'; 
import { InvoiceService }                 from '../invoice.service';
import { Shared }                         from '../../shared/shared';


@Component({
  selector: 'app-invoice-pre-pdf',
  templateUrl: './invoice-pre-pdf.component.html',
  styleUrls: ['./invoice-pre-pdf.component.scss']
})
export class InvoicePrePdfComponent implements OnInit {
  address;
  company:Company;
  coName: string = '';
  companyKey: string;
  errorMessage: string;
  createdDate: string;
  description: string;
  dueDate: Date;
  icons = ['chevron-left'];
  invoice: Invoice;
  invoiceKey: string;
  items: Item[];
  shared: Shared;
  state: string;
  total: number;

  constructor(
    private db: AngularFireDatabase,
    private invoiceService: InvoiceService,
    private location: Location,
    private iconRegistry: MdIconRegistry,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    ) {
      this.shared = new Shared();
      this.icons.forEach((icon) =>{
        iconRegistry.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
        );
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {this.invoiceKey = params['id']; });
    
    firebase.database().ref('/invoices/' + this.invoiceKey).on('value', (snapshot)  => {
      this.invoice = snapshot.val();
      this.total = this.invoice.total;
      this.createdDate = this.invoice.createdAt;
      this.companyKey = this.invoice.companyKey;
      this.address = this.invoice.address
      this.coName = this.invoice.coName;
      this.dueDate = this.invoice.dueDate;
      this.items = this.invoice.items;
      this.description = this.invoice.description;
    });
  }

goBack(): void {
  this.location.back();
}



setColor(color) {
    return color
}
goToCompanies(){
    this.router.navigate(['/companies']);
  }
onSubmit(){
  console.log('submit Fired');
  let newPdf = this.invoiceService.addPdf(document.getElementById('invoice-body').innerHTML);


  // Get a key for a new Invoice
  let newInvoiceKey = this.db.app.database().ref().child('companies').child('invoices').push().key;
  
  let updates = {};
  updates['/invoice-pre-pdf/' + newInvoiceKey] = newPdf;
  this.db.object('/invoice-pre-pdf/'+ newInvoiceKey).update(updates);
  this.goToCompanies();
  }
}
