import { 
  Component, 
  HostBinding,
  OnInit,
}                                from '@angular/core';
import { DomSanitizer }          from '@angular/platform-browser';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
}                                from '@angular/forms';
import { Location }              from '@angular/common';
import { 
  MdDatepickerModule,
  MdIconRegistry,
  MdInputModule,
  MdNativeDateModule,
  MdTabsModule,
  MdButton,
 }                               from '@angular/material';
import {
  ActivatedRoute,
  Params,
  Router,
}                                from '@angular/router';
// 3rd party
import { 
  AngularFireDatabase, 
  FirebaseListObservable ,
  FirebaseObjectObservable,
}                                from 'angularfire2/database';
import * as moment               from 'moment'

// Custom 
import { Company }               from '../../company/company';
import { Item }                  from '../../item/item';
import { MyIcons }               from '../../shared/my-icons';
import { Shared }                from '../../shared/shared';
// import { InvoiceService }        from '../invoice.service';
import { Invoice }               from '../invoice';
import { customTransitionRight } from '../../shared/custom-transition-right.component';

@Component({
  selector: 'invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss'],
})
export class InvoiceEditComponent implements OnInit {
  
  createdAt;
  company: Company;
  companyKey: string;
  coName: string;
  errorMessage: string;
  invoice:any;
  invoiceKey: string;
  invoices: FirebaseListObservable<any[]>;
  invoiceRes: FirebaseObjectObservable<any>;
  item;
  items;
  itemIds: number[] = [];
  m: moment.Moment;
  myform: FormGroup;
  output
  submittedForm
  title: string;
  icons=["chevron-left"]

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private iconRegistry:MdIconRegistry,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer:DomSanitizer,
  ) {
    let myIcons = new MyIcons(iconRegistry, sanitizer);
    myIcons.makeIcon("chevron-left");
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.companyKey = params['companyKey'];
      this.invoiceKey = params['invoiceId']
      // console.log('companyKey', this.companyKey);
    });

    this.db.object('/companies/'+ this.companyKey).subscribe(data => {
      this.company = data;
      this.coName = this.company.name; 
      this.items = this.company.items;
      // console.log('this.items', this.items);
      // console.log('data ', this.company.name)
      this.makeTitle(this.coName);
    });
    
    this.db.object('/invoices/'+ this.invoiceKey).subscribe(data => {
      this.invoice = data;
      this.buildForm(this.invoice);
      this.coName = this.company.name; 
      this.items = this.company.items;
      // console.log('this.items', this.items);
      // console.log('data ', this.company.name);
      this.makeTitle(this.coName);
    });
      
      this.buildForm();
  }
     
  buildForm(invoice?) {
    if(!this.invoice){
      this.myform = this.fb.group({
        beginDate: '',
        endDate: '',
        description: '',
        amount: '',
        discount: '',
        companyKey: '',
      });
    }
    if(invoice) {
      this.myform = this.fb.group({
        beginDate: invoice.beginDate,
        endDate: invoice.endDate,
        description: invoice.description,
        amount: invoice.amount,
        discount: invoice.discount,
        companyKey: invoice.companyKey,
        invoiceKey: invoice.invoiceKey,
      });
      return this.myform;
    }
  }
  
  makeTitle(coName:string, invoiceId?:string){
    this.title = (this.invoiceKey) ? " Edit Invoice for " + this.coName : " New Invoice for " + this.coName;
  }
  onFormChange() {
    this.myform.valueChanges.subscribe(data => {
      this.filterByDateRange(data.beginDate, data.endDate)
      this.output = data
    })
  }

  toggle = true;
  toggleIt() {
    this.toggle = !this.toggle;
    console.log("TOGGLE = " + this.toggle)
    return this.toggle;
  }

  canSave = true;
  onClickCanSave() {
    this.canSave = !this.canSave;
  }

  goToPrePdf() {
    let id = this.companyKey;
    this.router.navigate(['/invoice-pre-pdf', id]);
  }
  
  filterByDateRange(beginDate?, endDate?) {
    let bmDate = moment(beginDate).format('LL');
    let emDate = moment(endDate).format('LL');
    let filteredItems: Item[]=[];
    // console.log(`INVOICE_EDIT filterByDateRange this.items.length= ${JSON.stringify(this.items.length)}`);
    // console.log(`INVOICE_EDIT filterByDateRange bmDate= ${JSON.stringify(bmDate)}`);
    // console.log(`INVOICE_EDIT filterByDateRange emDate= ${JSON.stringify(emDate)}`);

    if(this.items){
      let itemsArray = (<any>Object).values(this.items);
      itemsArray.forEach(i => {
        let imDate;
        imDate = moment(i.date);
        // console.log(`INVOICE_EDIT filterByDateRange imDate= ${JSON.stringify(imDate)}`);
        // console.log(`INVOICE_EDIT filterByDateRange bmDate= ${JSON.stringify(bmDate)}`);
        // console.log(`INVOICE_EDIT filterByDateRange emDate= ${JSON.stringify(emDate)}`);
        // console.log(`INVOICE_EDIT filterByDateRange im.isSorA(bm, day)= ${imDate.isSameOrAfter(bmDate, 'day')}`);
        if (imDate.isSameOrAfter(bmDate, 'day') && imDate.isSameOrBefore(emDate, 'day')) {
          // console.log(`INVOICE_EDIT filterByDateRange is[i]= ${JSON.stringify(i)}`);
          filteredItems.push(i)
        }
      })
    }
    // console.log(`INVOICE_EDIT filterByDateRange filteredItemsId= ${JSON.stringify(filteredItems)}`);
    if(filteredItems.length>0)return filteredItems;
    return 0;
  } 

  goBack() { this.location.back(); }

  onSubmit() {
    this.createdAt = moment().format(); 
    let bdate= this.myform.value.beginDate;
    let edate= this.myform.value.endDate;

    this.invoice = this.myform.value;
    // console.log('this.invoiceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', this.invoice);
    this.invoice.companyKey = this.companyKey;
    this.invoice.createdAt = this.createdAt;
    this.invoice.items = this.filterByDateRange(bdate, edate);
    let invoiceTotal = 0;
    if (this.items){
      let itemsArray = (<any>Object).values(this.items);
        itemsArray.forEach(i => {
          invoiceTotal = invoiceTotal + i.total;
        });
      this.invoice.total = invoiceTotal;
      
      
      // Get a key for a new Invoice
      let newInvoiceKey = this.db.app.database().ref().child('/invoices/' + this.companyKey).push().key;
      
      // Write the new Invoice's data simultaneously in the invoice list and the company's invoice list
      let updates = {};
      updates['/invoices/' + newInvoiceKey] = this.invoice;
      updates['/companies/'+ this.companyKey + '/invoices/' + newInvoiceKey] = this.invoice;
      this.db.app.database().ref().update(updates);

      this.router.navigate(['/invoice-pre-pdf/' + newInvoiceKey ]);
      return
    } 
    alert('there are no items in that time frame')
      this.router.navigate(['/companies']);
  }
}
