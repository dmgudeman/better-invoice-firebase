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
  
  company: Company;
  companyId: string;
  errorMessage: string;
  invoice:any;
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
    // this.icons.forEach((icon) =>{
    // iconRegistry.addSvgIcon(
    //   icon,
    //   sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
    // );
    // });
    let myIcons = new MyIcons(iconRegistry, sanitizer);
    myIcons.makeIcon("chevron-left");
  }

  ngOnInit() {
    this.myform = this.fb.group({
      beginDate: '',
      endDate: '',
      description: '',
      amount: '',
      discount: '',
      companyId: '',
    });
    this.route.params.subscribe(params => {
      this.companyId = params['companyKey'];
      console.log('companyId', this.companyId);
    });
    this.invoices = this.db.list('/invoices')
    this.db.object('/companies/'+ this.companyId).subscribe(data => {
      this.company = data; 
      this.items = this.company.items;
      console.log('this.items', this.items);
      console.log('data ', this.company.name)});
    }
  
  onFormChange() {
    this.myform.valueChanges.subscribe(data => {
      // this.filterByDateRange(data.beginDate, data.endDate)
      // this.output = data
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
    let id = this.companyId;
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
      for( this.item of this.items){
      let imDate;
        imDate = moment(this.item.date);
        if (imDate.isSameOrAfter(bmDate, 'day') && imDate.isSameOrBefore(emDate, 'day')) {
        console.log(`INVOICE_EDIT filterByDateRange this.items[i]= ${JSON.stringify(this.item)}`);
        filteredItems.push(this.item)
      }
    }
      // console.log(`INVOICE_EDIT filterByDateRange imDate= ${JSON.stringify(imDate)}`);
      // console.log(`INVOICE_EDIT filterByDateRange bmDate= ${JSON.stringify(bmDate)}`);
      // console.log(`INVOICE_EDIT filterByDateRange emDate= ${JSON.stringify(emDate)}`);
      // console.log(`INVOICE_EDIT filterByDateRange im.isSorA(bm, day)= ${imDate.isSameOrAfter(bmDate, 'day')}`);

     
    }
    console.log(`INVOICE_EDIT filterByDateRange filteredItemsId= ${JSON.stringify(filteredItems)}`);
    
    if(filteredItems.length>0)return filteredItems;
    return "There are no items for those dates"

  } 

  goBack() { this.location.back(); }

  onSubmit() {
    let bdate= this.myform.value.beginDate;
    let edate= this.myform.value.endDate;

    this.invoice = this.myform.value;
    this.invoice.companyId = this.companyId;
    this.invoice.items = this.filterByDateRange(bdate, edate);
    // console.log(JSON.stringify(this.invoice.items));
    // console.log(this.invoice);
    // console.log(this.company);
    
    // Get a key for a new Invoice
    let newInvoiceKey = this.db.app.database().ref().child('/invoices/' + this.companyId).push().key;
    
    // Write the new Invoice's data simultaneously in the invoice list and the company's invoice list
    let updates = {};
    updates['/invoices/' + newInvoiceKey] = this.invoice;
    updates['/companies/'+ this.companyId + '/invoices/' + newInvoiceKey] = this.invoice;
    this.db.app.database().ref().update(updates);

    this.router.navigate(['/invoice-pre-pdf/' + newInvoiceKey ]);
  }
}
