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
  styleUrls: ['./company-edit.component.css']
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
    this.buildForm(this.company);
      this.title = this.coId ? " Edit "+ this.company.name + " Details" : " New Business";
  }
  ngAfterViewInit(){
    if(this.company.address)
    this.addressViewChild.myform.setValue(this.company.address);

  }
  buildForm(company?) {
    this.myform = this.fb.group({
      name:[company.name, Validators.required],
      color: company.color,
      hourly: company.hourly,
      paymentTerms: company.paymentTerms,
      active: company.active,
    });

  }

  setCompany() {
    
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
    console.log('MMMMMMMMMMFFFFFFFFF', mf);
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