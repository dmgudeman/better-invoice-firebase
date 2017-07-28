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
import { AddressAutoComponent }  from '../../address/address-auto/address-auto.component';
import { AddressService }        from '../../address/address.service';
import { Company }               from '../company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit{
  @ViewChild(AddressAutoComponent) addressViewChild: AddressAutoComponent;

  address: google.maps.places.PlaceResult;
  addr;
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
  $event

  constructor(
    public afAuth: AngularFireAuth,
    private addressService: AddressService,
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
      this.buildForm(); 
    });
    this.afAuth.authState.subscribe ( user => {
      if (user){
        this.userId = user.uid;
        firebase.database().ref('/companies/' + this.companyKey ).once('value', (snapshot)=> {
          
          this.company = snapshot.val();
          this.buildForm(this.company); 

          console.log('TTTTTTTTTTTTTTTTTTTTif ', this.company.address)
          if(this.company && this.company.address){
            console.log('HHHHHHHHHHHHHHHHHHh', this.company.address);
            this.addressService.setAddress(this.company.address);
          }




          
          if(!this.company) this.setactive = true;
            this.title = this.companyKey ? " Edit "+ this.company.name + " Details" : " New Business";
          });
      }
    });
  }
  onAddress($event){
    this.address = $event;
  }

  buildForm(company?) {

    if(!this.myform){
      console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBB11111111111111');
      this.setactive = true;
      this.myform = this.fb.group({
        name: ['', Validators.required],
        color: '',
        hourly:'',
        paymentTerms: '',
        active: '',
      });
      //  this.addressViewChild.address = '';
      this.addressService.setAddress('');
    }
    if(company ) {
      console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBB22222222222222');
      
      this.setactive = this.company.active;
      this.myform = this.fb.group({
        name:this.company.name,
        color: this.company.color,
        hourly: this.company.hourly,
        paymentTerms: this.company.paymentTerms,
        active: this.setactive,
      });
      this.addressService.setAddress(this.company.address);
      return this.myform
    }
  }
  ngAfterViewInit() {
    if(this.company && this.company.address)
      this.addressViewChild.address = this.company.address;
  }

  toggleActive() {
     this.myform.value.active = !this.myform.value.active;
  }
    onChange(e){
      console.log(e.checked)
      console.log('this.myform.value.active', this.myform.value.active);
    }

  onSubmit() {
    // this.addressViewChild.onAddress.subscribe( data => {
    //   this.address = data;
    //   console.log('THHHHHHHHHISSSSSSSSS address = ', this.address);
    // }
    // );
  
    console.log('this.address ', this.address);
    this.addr = this.address.formatted_address;

    console.log('this.addr', this.addr);
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
        address: this.addr
    }

    let newCompanyKey = this.db.app.database().ref().child('/companies').push().key;
    // console.log('newCompanyKey', newCompanyKey);

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