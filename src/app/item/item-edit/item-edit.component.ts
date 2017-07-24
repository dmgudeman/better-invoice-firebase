import { 
  Component, 
  HostBinding,
  OnInit,
  ViewChild
}                                         from '@angular/core';
import { DomSanitizer }          from '@angular/platform-browser';
import { Location }                       from '@angular/common';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup,
  FormsModule, 
  ReactiveFormsModule, 
  Validators, 
}                                         from '@angular/forms';
import { 
  MdDatepickerModule,
  MdIconRegistry,
  MdInputModule,
  MdNativeDateModule,
  MdTabsModule,
 }                                        from '@angular/material';
import { BrowserAnimationsModule }        from '@angular/platform-browser/animations';
import { 
  ActivatedRoute, 
  Params,
  Router,
}                                         from '@angular/router';
// 3rd party
import { 
  AngularFireDatabase, 
  FirebaseListObservable ,
  FirebaseObjectObservable,
}                                         from 'angularfire2/database';
import { Observable }                     from 'rxjs/Observable';

import { IMyOptions, IMyDateModel }       from 'mydatepicker';
import * as moment                        from 'moment'
// Custom
import { Company }                        from '../../company/company';
import { Item }                           from '../item';
import { customTransitionRight }          from '../../shared/custom-transition-right.component';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit {
   
  hoursArrayLimit = 25;
  hoursArray:number[] = [];
  coName: string;
  company: Company
  companyId: string;
  companyItems: FirebaseListObservable<any[]>
  date:Date;
  m: moment.Moment;
  title: string;
  myform : FormGroup;
  icons= ['chevron-left'];

  constructor(
    private db: AngularFireDatabase,
    private fb:FormBuilder,
    private iconRegistry:MdIconRegistry,
    private location: Location,
    private MdDatepicker: MdDatepickerModule,
    private sanitizer:DomSanitizer,
    private router:Router,
    private route:ActivatedRoute,
    ) {
      this.icons.forEach((icon) =>{
        iconRegistry.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
        );
      });
    }

  ngOnInit() {
    this.myform = this.fb.group({
      date:'',
      description:'',
      amount:'',
      hours:'',
      type:'',
      companyKey: '',
    });
    
    this.route.params.subscribe(params => {
      this.companyId = params['companyKey'];
    });
    this.db.object('/companies/'+ this.companyId).subscribe(data => {
      this.company = data; 
      console.log('data ', data)});
  }

  makeTitle(coName:string, itemId?:number){
      this.title = (itemId) ? " Edit Item" : " New Item for " + this.coName;
  }

  onSubmit() {
    let payload = this.myform.value;
    payload.companyKey = this.companyId;
    // if(!this.company.items) this.company.items = [];
    // this.company.items.push(this.myform.value);
    // this.db.object('/companies/'+ this.companyId).update({items:this.company.items});
    let total = (
      (this.myform.value.hours - 0 ) * (this.company.hourly - 0)) + (this.myform.value.amount - 0);
    console.log('hours', this.myform.value.hours);
    console.log('hourly', this.company.hourly);
    console.log('amount', this.myform.value.amount);
    console.log('total', total);
    payload.total = total;

    // Get a key for a new Invoice
    let newItemKey = this.db.app.database().ref().child('companies').child('items').push().key;
    payload.id = newItemKey;
    // Write the new Invoice's data simultaneously in the invoice list and the company's invoice list
    let updates = {};
    updates['/companies/'+ this.companyId + '/items/' + newItemKey] = payload;
    updates['/items/' + newItemKey] = payload;
    this.db.app.database().ref().update(updates);
    this.goToCompanies();
  }
  
  goToCompanyDetails() {
    this.router.navigate(['/company-details']);
  } 
  
  goToCompanies() {
    this.router.navigate(['/companies']);
  }

  goBack(): void {
    this.location.back();
  }
}