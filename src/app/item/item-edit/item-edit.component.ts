import { 
  Component, 
  HostBinding,
  OnInit,
  ViewChild
}                                         from '@angular/core';
import * as firebase       from 'firebase/app';
import { DomSanitizer }                   from '@angular/platform-browser';
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
import { AngularFireAuth }       from 'angularfire2/auth';
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
  companyKey: string;
  companyItems: FirebaseListObservable<any[]>
  date:Date;
  fUserId
  icons= ['chevron-left'];
  item;
  itemKey: string;
  loggedIn;
  m: moment.Moment;
  myform : FormGroup;
  title: string;
  user;
  userId: string;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth, 
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
    this.user = afAuth.authState;
    }

  ngOnInit() {
     this.afAuth.authState.subscribe ( user => {
      if (!user) { 
        console.log('NOT LOGGED IN');
        this.loggedIn = "Not Logged In"
        this.goToLogin();
      }
      else if (user){
        this.userId = user.uid;
        this.fUserId = user.providerData[0].uid;
        console.log('user.uid', this.fUserId.uid);
        this.loggedIn = "Logged In";
       

        console.log("LOGGED IN", user.uid)
        this.route.params.subscribe(params => {
          this.companyKey = params['companyKey'];
          this.itemKey = params[ 'itemKey']
         
          
        });
        this.getCompany();
        this.getItem()
      }  
    })
   
    


    // obtain the item if it is pre-existing
    
    this.buildForm();
    this.makeTitle( this.coName);
  }
  getItem() {if (this.itemKey){
    this.db.object('/users/'+ this.fUserId + '/companies/'+ this.companyKey + '/items/' + this.itemKey ).subscribe(data => {
      this.item = data; 
      this.buildForm(this.item);
      this.makeTitle(this.coName, this.itemKey);
    });
  return;
  }}
  getCompany(){
      // obtain the company
      firebase.database().ref('/users/'+ this.fUserId + '/companies/' + this.companyKey).on('value', (snapshot)=> {
        if(snapshot.val()){
             this.company = snapshot.val(); 
        this.coName = this.company.name;
        this.makeTitle(this.coName);
        }
      })

  }
  makeTitle(coName:string, itemId?:string){
      this.title = (this.itemKey) ? " Edit Item for " + this.coName : " New Item for " + this.coName;
  }

  buildForm(item?) {
    if(!this.myform){
      this.myform = this.fb.group({
        date:'',
        description:'',
        amount:'',
        hours:'',
        type:'',
        companyKey: '',
      });
    }
    if(item) {
      this.myform = this.fb.group({
        date: item.date,
        description: item.description,
        amount: item.amount,
        hours: item.hours,
        type: item.type,
        companyKey: item.companyKey,
        itemKey: item.itemKey,
      });
      return this.myform;
    }
  }
  
  goToCompanyDetails() {
    this.router.navigate(['/company-details']);
  } 
  
  goToCompanies() {
    this.router.navigate(['/companies']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goBack(): void {
    this.location.back();
  }
  onSubmit() {
    
    let payload = this.myform.value;
    payload.companyKey = this.companyKey;
    payload.userId = this.userId;
    payload.fUserId = this.fUserId;
    // if(!this.company.items) this.company.items = [];
    // this.company.items.push(this.myform.value);
    // this.db.object('/companies/'+ this.companyKey).update({items:this.company.items});
    let total = (
      (this.myform.value.hours - 0 ) * (this.company.hourly - 0)) + (this.myform.value.amount - 0);
    payload.total = total;

    // Get a key for a new Invoice
    if(!this.itemKey){
      let newItemKey = this.db.app.database().ref().child('companies').child('items').push().key;
      payload.itemKey = newItemKey;
    } else {
      payload.itemKey = this.item.itemKey;
    } 
    // Write the new Invoice's data simultaneously in the invoice list and the company's invoice list
    let updates = {};
    updates['/users/'+ this.fUserId + '/companies/'+ this.companyKey + '/items/' + payload.itemKey] = payload;
    this.db.app.database().ref().update(updates);
    this.goToCompanies();
  }

  calcAmount() {

      console.log("calcAMMMMMOUUUUNNNNNNTTT" + this.myform.value.hours);
      console.log('this.company.hourly', this.company.hourly);
      this.myform.value.amount = this.company.hourly * this.myform.value.hours;
      console.log('this.myform.value.amount', this.myform.value.amount);
  }
  
}