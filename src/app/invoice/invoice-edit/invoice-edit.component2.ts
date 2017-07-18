import { 
  Component, 
  HostBinding,
  OnInit,
}                                from '@angular/core';
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
  MdInputModule,
  MdNativeDateModule,
  MdTabsModule,
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

// Custom Modules
import { Company }               from '../../company/company';
import { Item }                  from '../../item/item';
import { Shared }                from '../../shared/shared';
// import { InvoiceService }        from '../invoice.service';
import { Invoice }               from '../invoice';
import { customTransitionRight } from '../../shared/custom-transition-right.component';

@Component({
  selector: 'invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss'],
  // animations: [ customTransitionRight ]
})
export class InvoiceEditComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  // company: Company;
  // companyId: string;
  // errorMessage: string;
  // invoice:any;
  // invoices: FirebaseListObservable<any[]>;
  // invoiceRes: FirebaseObjectObservable<any>;
  // item;
  // items;
  // itemIds: number[] = [];
  // m: moment.Moment;
  // myform: FormGroup;
  // output
  // shared: Shared;
  // submittedForm
  // title: string;


  constructor(
    // private db: AngularFireDatabase,
    // private fb: FormBuilder,
    // private location: Location,
    // private route: ActivatedRoute,
    // private router: Router,
  ) {
    // this.shared = new Shared();
    location.reload;
  }

  ngOnInit() {
    // this.myform = this.fb.group({
    //   beginDate: '',
    //   endDate: '',
    //   description: '',
    //   amount: '',
    //   discount: '',
    //   companyId: '',
    // });
    // this.route.params.subscribe(params => {
    //   this.companyId = params['companyKey'];
    //   console.log('companyId', this.companyId);
    // });
    // this.invoices = this.db.list('/invoices')
    // this.db.object('/companies/'+ this.companyId).subscribe(data => {
    //   this.company = data; 
    //   this.items = this.company.items;
    //   console.log('this.items', this.items);
    //   console.log('data ', this.company.name)});
    }
}