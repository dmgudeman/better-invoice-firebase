import { 
  AfterViewInit,
  Component, 
  OnInit,
  ViewChild,
 }                               from '@angular/core';
import { 
  BrowserAnimationsModule,
}                                from '@angular/platform-browser/animations';
import { DomSanitizer }          from '@angular/platform-browser';
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
import { Location }              from '@angular/common';
import { 
  MdIconModule,
  MdIconRegistry,
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
  company:Company;
  setCompanyObs: FirebaseObjectObservable<any[]>;
  companies: FirebaseListObservable<any[]>
  userId;
  title;
  myform : FormGroup;
  icons=['thumbs-up', 'chevron-left']
  thumbsUp;
  chevronLeft;

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private iconRegistry: MdIconRegistry,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.icons.forEach((icon) =>{
    iconRegistry.addSvgIcon(
      icon,
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
    );
    });
  };

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
    if(this.company && this.company.address){
      this.addressViewChild.myform.setValue(this.company.address);
    }

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
      name: ['', Validators.required],
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
    onChange(e){

      console.log(e.checked)
    console.log('this.myform.value.active', this.myform.value.active);


    }

  onSubmit() {
    this.address = this.addressViewChild.myform.value;
  
    console.log('this.address ', this.address);
    if (!this.myform.value.name){
      this.router.navigate(['companies']);
      return;
    }

    let mf = this.myform.value;
      let name = mf.name;
      let color = mf.color;
      let hourly = mf.hourly;
      let paymentTerms = mf.paymentTerms;
      let active = mf.active;
    
    if(!mf.items) mf.items = null;
    let payload = {
        name:name, 
        color:color,  
        paymentTerms:paymentTerms, 
        hourly:hourly, 
        active:true, 
        userId:1, 
        address: this.address
    }
    if(!this.coId){
      this.companies.push(payload);
    } else {
      this.db.object('/companies/'+ this.coId).update(payload);
    }
      this.router.navigate(['companies']);
  }
  goBack() {
     this.location.back();
  }
}