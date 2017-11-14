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
import { AngularFireAuth }       from 'angularfire2/auth';
import { 
  AngularFireDatabase, 
  FirebaseListObservable ,
  FirebaseObjectObservable,
}                                from 'angularfire2/database';
import * as moment               from 'moment';

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
  
  address: string;
  createdAt;
  company: Company;
  companyKey: string;
  coName: string;
  errorMessage: string;
  dueDate;
  fUserId;
  icons=["chevron-left"];
  invoice:any;
  invoiceKey: string;
  invoices: FirebaseListObservable<any[]>;
  invoiceRes: FirebaseObjectObservable<any>;
  item;
  items;
  itemIds: number[] = [];
  loggedIn;
  m: moment.Moment;
  myform: FormGroup;
  paymentTerms: number;
  output
  submittedForm
  title: string;
  userId;

  constructor(
    public afAuth: AngularFireAuth, 
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
    this.afAuth.authState.subscribe ( user => {
      if (!user) { 
        console.log('NOT LOGGED IN');
        this.loggedIn = "Not Logged In"
        this.goToLogin();
      }
      else if (user){
        this.userId = user.uid;
        this.fUserId = user.providerData[0].uid;
        console.log('user.uid', this.fUserId.uid);
        this.loggedIn = "Logged In";
       

        console.log("LOGGED IN", user.uid)
        this.route.params.subscribe(params => {
          this.companyKey = params['companyKey'];
          this.invoiceKey = params[ 'invoiceKey']
          
        });
        this.getCompany();
        this.getInvoice()
      }  
    })
   
    this.route.params.subscribe(params => {
      this.companyKey = params['companyKey'];
      this.invoiceKey = params['invoiceKey']
    });
      
      this.buildForm();
  }
  getCompany(){
    this.db.object('/users/'+ this.fUserId + '/companies/'+ this.companyKey).subscribe(data => {
      this.company = data;
      console.log('this.company', this.company);
      this.coName = this.company.name; 
      this.items = this.company.items; 
      this.address = this.company.address;
      this.paymentTerms = this.company.paymentTerms;
      this.makeTitle(this.coName);
    });
  }
  getInvoice() {
    if(this.invoiceKey){
      return this.db.object('/users/'+ this.fUserId + '/companies/'+ this.companyKey + '/invoices/'+ this.invoiceKey).subscribe(data => {
        this.invoice = data;
        this.buildForm(this.invoice);
        this.coName = this.company.name; 
        this.items = this.company.items;
        this.makeTitle(this.coName);
      });
    } 
    return;

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

  calcDueDate(date, paymentTerms){
    let a = moment(date);
    a.add(paymentTerms, 'days');
    this.dueDate = a.format(); 
    return this.dueDate;
  }
  filterByDateRange(beginDate?, endDate?) {
    let bmDate = moment(beginDate).format();
    let emDate = moment(endDate).format();
    let filteredItems: Item[]=[];
    // console.log(`INVOICE_EDIT filterByDateRange this.items.length= ${JSON.stringify(this.items.length)}`);
    // console.log(`INVOICE_EDIT filterByDateRange bmDate= ${JSON.stringify(bmDate)}`);
    // console.log(`INVOICE_EDIT filterByDateRange emDate= ${JSON.stringify(emDate)}`);

    if(this.items){
      let itemsArray = (<any>Object).values(this.items);
      itemsArray.forEach(i => {
        let imDate;
        imDate = moment(i.date)
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
    console.log(`INVOICE_EDIT filterByDateRange filteredItems= ${JSON.stringify(filteredItems)}`);
    if(filteredItems.length>0)return filteredItems;
    return 0;
  } 
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goBack() { this.location.back(); }

  goToCompanies() {
    this.router.navigate(['/companies']);
  }
  
  goToPrePdfInvoice() {
    this.router.navigate(['/invoice-pre-pdf/' + this.invoice.invoiceKey ]);
  }

  onSubmit() {

    this.invoice = this.myform.value;

    this.createdAt = moment().format(); 
    let bdate = this.invoice.beginDate;
    let edate = this.invoice.endDate;
    
    this.invoice.companyKey = this.companyKey;
    this.invoice.coName = this.coName;
    this.invoice.createdAt = this.createdAt;
    this.invoice.address = this.address;

    this.invoice.dueDate = this.calcDueDate(this.createdAt, this.paymentTerms);
    // console.log('this.invoice.dueDate', this.invoice.dueDate );
    this.invoice.items = this.filterByDateRange(bdate, edate);
    // console.log('this.invoice.items', this.invoice.items );

    // calculate total
    let invoiceTotal = 0;
    // console.log('this.items', this.items);
    if (this.invoice.items){
      let itemsArray = (<any>Object).values(this.invoice.items);
        itemsArray.forEach(i => {
          console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiinvoiceTotal', invoiceTotal);
          invoiceTotal = invoiceTotal + i.total;
        });
      this.invoice.total = invoiceTotal || 0;
      
      if(!this.invoiceKey){
      let newItemKey = this.db.app.database().ref().child('companies').child('invoices').push().key;
      this.invoice.invoiceKey = newItemKey;
    } else {
      this.invoice.invoiceKey = this.invoice.invoiceKey;
    }
    this.invoice.fUserId = this.fUserId;
    console.log('this.invoice', this.invoice);
    // Write the new Invoice's data simultaneously in the invoice list and the company's invoice list
    let updates = {};
    updates['/users/'+ this.fUserId + '/companies/'+ this.companyKey + '/invoices/' + this.invoice.invoiceKey] = this.invoice;
    // updates['/invoices/' + this.invoice.invoiceKey] = this.invoice;
    this.db.app.database().ref().update(updates);
    this.goToPrePdfInvoice();
  } 
      

      this.router.navigate(['/invoice-pre-pdf/' + this.invoice.invoiceKey ]);
      return;

    // alert('there are no items in that time frame')
      // this.router.navigate(['/companies']);
  }
}

