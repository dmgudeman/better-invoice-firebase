import { 
  Component, 
  OnInit,
  ViewChild,
  AfterViewInit,
 }                               from '@angular/core';
import { 
  BrowserAnimationsModule,
}                                from '@angular/platform-browser/animations';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule,
  Validators,
}                                from '@angular/forms';
import { 
  AngularFireDatabase, 
  FirebaseListObservable ,
  FirebaseObjectObservable,
}                                from 'angularfire2/database';
import { 
  MdInputContainer,
  MdTabsModule,
  MdTab,
  MdTabGroup,
  MaterialModule,
 }                               from '@angular/material';
import { 
  Router, 
  ActivatedRoute, 
  Params, 
}                                from '@angular/router';
// 3rd party
import { $ }                     from 'jquery';
import { Observable }            from 'rxjs/Observable';
import 'rxjs/add/operator/take';

// Custom
import { Address }               from '../../address/address';
import { AddressEditComponent }  from '../../address/address-edit/address-edit.component';
import { Company }               from '../company';
import { CompanyService }        from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit, AfterViewInit {
  @ViewChild(AddressEditComponent) addressViewChild: AddressEditComponent;
  address: Address;
  coId;
  coName;
  // color;
  company:Company;
  setCompanyObs: FirebaseObjectObservable<any[]>;
  companies: FirebaseListObservable<any[]>
  // hourly;
  // paymentTerms;
  // active;
  userId;
  title;
  myform : FormGroup;

  constructor(
    private companyService: CompanyService,
    private router:Router,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.companies = this.db.list('/companies');
     
    this.route.params
      .subscribe(params => { 
          this.coId = params['id']
    });
    this.db.object('/companies/' + this.coId).subscribe(x => {
      this.company = x;
    })
    this.buildForm();
      this.title = this.coId ? " Edit "+ this.company.name + " Details" : " New Business";
  }
  ngAfterViewInit(){
    if(this.company.address)
    this.addressViewChild.myform.setValue(this.company.address);

  }
  buildForm() {
    if(this.company) {
      this.myform = this.fb.group({
        name:this.company.name,
        color: this.company.color,
        hourly: this.company.hourly,
        paymentTerms: this.company.paymentTerms,
        active: this.company.active,
      });
      return this.myform;
    }
     this.myform = this.fb.group({
        name: '',
        color: '',
        hourly:'',
        paymentTerms: '',
        active: '',
     });
  }

  setCompany() {
    
  }  
  toggleActive() {
     this.myform.value.active = !this.myform.value.active;
  }

  onSubmit() {
    this.address = this.addressViewChild.myform.value;
  
    console.log('this.address ', this.address);

    let mf = this.myform.value;
      let name = mf.name;
      let color = mf.color;
      let hourly = mf.hourly;
      let paymentTerms = mf.paymentTerms;
      let active = mf.active;
    
    if(!mf.items) mf.items = null;
    let payload = {
      name:name, color:color,  paymentTerms:paymentTerms, hourly:hourly, active:true, userId:1, address: this.address
    }
    if(!this.coId){
    this.companies.push(payload);
    } else {
      this.db.object('/companies/'+ this.coId).update(payload);
    }
    this.router.navigate(['companies']);
  }
  goBack() {

  }
}