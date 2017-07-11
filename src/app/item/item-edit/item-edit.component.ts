import { 
  Component, 
  HostBinding,
  OnInit,
  ViewChild
}                                         from '@angular/core';
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
  styleUrls: ['./item-edit.component.css'],
  animations: [customTransitionRight]
})
export class ItemEditComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
   
  hoursArrayLimit = 25;
  hoursArray:number[] = [];
  coName: string;
  company: Company
  companyId: string;
  companyItems: FirebaseListObservable<any[]>
  date:Date;
  m: moment.Moment;
  myDatePickerOptions: IMyOptions = { dateFormat: 'yyyy-mm-dd'};
  title: string;
  myform : FormGroup;

  constructor(
    private location: Location,
    private router:Router,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private db: AngularFireDatabase,
    private MdDatepicker: MdDatepickerModule,
    ) { }

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
    
    this.makeHoursArray(41);
  }

  makeTitle(coName:string, itemId?:number){
      this.title = (itemId) ? " Edit Item" : " New Item for " + this.coName;
  }

  makeHoursArray(hoursArrayLimit):number[]{
    for (let i =0; i < hoursArrayLimit; i++){
      let x = 0.25 * i;
      this.hoursArray.push(x);
    }
    return this.hoursArray;
  }

  onSubmit() {
    this.myform.value.companyKey = this.companyId;
    console.log('this.myform.value', this.myform.value);
    
    if(!this.company.items) this.company.items = [];
    this.company.items.push(this.myform.value);
    
    this.db.object('/companies/'+ this.companyId).update({items:this.company.items});
    this.goToCompanies();
  }
  // from github.com/kekeh/mydatepicker
  setDate(beginDate?): void {
    let date;
    // date ? newDate = new Date(date) : newDate = new Date();
    if (!beginDate) {date= new Date();} else {date = new Date(beginDate)};
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    this.date = date;
    this.myform.value.date({date: {year: year, month: month, day: day}});
  }

  prepareDate(date){
      this.m= moment(date);
      let year = this.m.year;
      let month = this.m.month;
      let day = this.m.day;
      let fdate = this.m.format('YYYY-MM-DD');
      this.myform.value.date(fdate);
  }
    // from github.com/kekeh/mydatepicker
  clearDate(): void {
      // Clear the date using the setValue function
    this.myform.setValue({fcDate: ''});
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
