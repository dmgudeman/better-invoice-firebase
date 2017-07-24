import { 
  AfterContentInit,
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
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// Custom
import { Address }               from '../../address/address';
import { AddressEditComponent }  from '../../address/address-edit/address-edit.component';
import { Company }               from '../company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit{
  @ViewChild(AddressEditComponent) addressViewChild: AddressEditComponent;
  address;
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

  constructor(
    public afAuth: AngularFireAuth,
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
    console.log('Login constructor');
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
    });
    this.afAuth.authState.subscribe ( user => {
      if (user){
        this.userId = user.uid;
        firebase.database().ref('/companies/' + this.companyKey ).once('value', (snapshot)=> {
          this.company = snapshot.val();
          this.address = this.company.address;
          console.log('this.address', this.address);

          if(this.company && this.company.address){
            console.log('this.addres2222222', this.address);
            this.addressViewChild.myform.setValue(this.company.address);
          }
         
          this.buildForm(); 
          
          if(!this.company) this.setactive = true;
          this.title = this.companyKey ? " Edit "+ this.company.name + " Details" : " New Business";
          });
      }
    });
      this.buildForm(); 
  }
  // ngAfterContentInit(){
  //     console.log('this.addres333333333', this.address);

  //   if(this.company && this.company.address){
  //     console.log('this.addres2222222', this.address);
  //     this.addressViewChild.myform.setValue(this.company.address);
  //   }

  // }
  buildForm() {
    console.log('buildFormmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
    if(!this.myform){
      this.setactive = true;
      this.myform = this.fb.group({
      name: ['', Validators.required],
      color: '',
      hourly:'',
      paymentTerms: '',
      active: '',
    });
    }
    if(this.company) {
      this.setactive = this.company.active;
      this.myform = this.fb.group({
        name:this.company.name,
        color: this.company.color,
        hourly: this.company.hourly,
        paymentTerms: this.company.paymentTerms,
        active: this.setactive,
      });
      return this.myform;
    }
    
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
        userId: this.userId, 
        address: this.address
    }

    let newCompanyKey = this.db.app.database().ref().child('/companies').push().key;
    console.log('newCompanyKey', newCompanyKey);

    if(!this.companyKey){
      let updates = {};
      updates['/companies/' + newCompanyKey] = payload;
      updates['/companiesByUser/'+ this.userId + '/' + newCompanyKey] = payload;
      this.db.app.database().ref().update(updates);
    } else {
      this.db.object('/companies/'+ this.companyKey).update(payload);
      this.db.object('/companiesByUser/' + this.userId + '/' + this.companyKey).update(payload);
    }
      this.router.navigate(['companies']);
  }
  goBack() {
     this.location.back();
  }
}