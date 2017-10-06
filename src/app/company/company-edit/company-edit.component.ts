import { 
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
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
import { AngularFireAuth }       from 'angularfire2/auth';
import * as firebase             from 'firebase/app';

// Custom
import { Address }               from '../../address/address';
import { AddressService }        from '../../address/address.service';
// import { AddressAutoComponent }  from '../../address/address-auto/address-auto.component';
// import { AddressService }        from '../../address/address.service';
import { Company }               from '../company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit{

  address: string;
  coName;
  company:Company;
  companiesByUser: FirebaseListObservable<any[]>
  companyKey:string;
  companies: FirebaseListObservable<any[]>
  icons=['thumbs-up', 'chevron-left']
  myform : FormGroup;
  setCompanyObs: FirebaseObjectObservable<any[]>;
  setactive: boolean;
  title;
  user: Observable<firebase.User>
  userId: string;
  fUserId: string;

  constructor(
    public afAuth: AngularFireAuth,
    public addressService:AddressService,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private iconRegistry: MdIconRegistry,
    private location: Location,
    private route: ActivatedRoute,
    private router:Router,
    private sanitizer: DomSanitizer,
  ) {
    this.icons.forEach((icon) => {
      iconRegistry.addSvgIcon(
      icon,
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
      );
    });
    this.user = afAuth.authState;
  };

  ngOnInit() {
    if(!this.user){ 
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user)
    this.route.params
      .subscribe(params => { 
        this.companyKey = params['id']
      this.buildForm(); 
    });
    this.afAuth.authState.subscribe ( user => {
      if (user){
        this.userId = user.uid;
        this.fUserId = user.providerData[0].uid
        console.log('this.fUserId', this.fUserId);
        firebase.database().ref('/companies/' + this.companyKey ).on('value', (snapshot)=> {
          
          this.company = snapshot.val();
          if(this.company && this.company.address){
            this.addressService.publishData(this.company.address);
          }
          this.addressService.address.subscribe( data => {
            this.address = data;
          })
          this.buildForm(this.company); 

          if(!this.company) this.setactive = true;
            this.title = this.companyKey ? " Edit "+ this.company.name + " Details" : " New Business";
          });
      }
    });
  }

  buildForm(company?) {

    if(!this.myform){
      this.setactive = true;
      this.myform = this.fb.group({
        name: ['', Validators.required],
        color: ['', Validators.required],
        hourly:'',
        paymentTerms: '',
        active: '',
      });
    }
    if(company ) {
      this.setactive = this.company.active;
      this.myform = this.fb.group({
        name:[this.company.name, Validators.required],
        color: [this.company.color, Validators.required],
        hourly: this.company.hourly,
        paymentTerms: this.company.paymentTerms,
        active: this.setactive,
      });
      return this.myform
    }
  }
  onChange(e){
    console.log(e.checked)
    console.log('this.myform.value.active', this.myform.value.active);
  }

  toggleActive() {
     this.myform.value.active = !this.myform.value.active;
  }
  onSubmit() {

    let mf = this.myform.value;
      let name = mf.name;
      let color = mf.color;
      let hourly = mf.hourly;
      let paymentTerms = mf.paymentTerms;
      let active = mf.active;
    
    if(!mf.items) mf.items = null;
    let payload ={
      name:name, 
      color:color,  
      paymentTerms:paymentTerms, 
      hourly:hourly, 
      active:true, 
      userId: this.fUserId,
      address: '' 
    }
    if (this.address) payload.address = this.address;


    if(!this.companyKey){
      let newCompanyKey = this.db.app.database().ref().child('/companies').push().key;
      let updates = {};
      // updates['/companies/' + newCompanyKey] = payload;
      // console.log('this.userId', this.userId);
      
      updates['/users/'+ this.fUserId + '/companies/' + newCompanyKey] = payload;
    
      this.db.app.database().ref().update(updates);
    } else {
      // this.db.object('/companies/'+ this.companyKey).update(payload);
      console.log('this.userId2', this.userId);
      // this.db.object('/users/'+ this.userId + '/companies/').update(payload);
      this.db.object('/'+ this.fUserId + '/companies/').update(payload);
    }
      this.router.navigate(['companies']);
  }
  goBack() {
     this.location.back();
  }
}