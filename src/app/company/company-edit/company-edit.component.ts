import { Component, OnInit }     from '@angular/core';
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
import { Company }               from '../company';
import { CompanyService }        from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
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
     this.myform = this.fb.group({
            name:['', Validators.required],
            color:'',
            hourly: '',
            paymentTerms: '',
            active: '',
            userId: '',
            items: '',
          });
          this.route.params
            .subscribe(params => { 
                this.coId = params['id']
                this.coName = params['coName']
            });
        this.title = this.coId ? " Edit "+ this.coName + " Details" : " New Business";
  }

  setCompany() {
    
  }  

  onSubmit() {

  let mf = this.myform.value;
    let name = mf.name;
    let color = mf.color;
    let hourly = mf.hourly;
    let paymentTerms = mf.paymentTerms;
    let active = mf.active;
    if(!mf.items) mf.items = null;
    console.log(name, color, paymentTerms);
    this.companies.push({
      name:name, color:color,  paymentTerms:paymentTerms, hourly:hourly, active:true, userId:1
    });
    this.router.navigate(['companies']);

  }
}