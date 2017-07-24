// displays a list of company-card.component
// input: list of companies for a given user
import { Component, OnInit } from '@angular/core';
import { 
  AngularFireDatabase, 
  FirebaseListObservable,
  FirebaseObjectObservable,
}                           from 'angularfire2/database';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule,
  Validators,
}                           from '@angular/forms';
import { 
  MaterialModule,
  MdIconRegistry,
 }                          from '@angular/material';
import { DomSanitizer }     from '@angular/platform-browser';
import { 
  Router, 
  ActivatedRoute, 
  Params, 
}                          from '@angular/router';
// 3rd party
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase       from 'firebase/app';
import * as $ from 'jquery';
import { Observable }      from 'rxjs/Observable';
// custom
import { Company }         from '../company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: FirebaseListObservable<any[]>;
  company: FirebaseObjectObservable<any>;
  companiesArray = [];
  icons=['add'];
  keysArray=[];
  sanpshot;

  user: Observable<firebase.User>
  userId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private iconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer,
    public afAuth: AngularFireAuth,
    ) {
      
      this.icons.forEach((icon) =>{
      iconRegistry.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/' + icon + '.svg')
      );
      });
    this.user = afAuth.authState;
  };

  ngOnInit() {
    this.afAuth.authState.subscribe ( user => {
      if (!user) return;
      this.userId = user.uid;
      
      firebase.database().ref('/companiesByUser/' + this.userId).once('value', (snapshot)=> {
        if(snapshot.val()){
          this.keysArray = (<any>Object).keys(snapshot.val()); 
          this.companiesArray =  (<any>Object).values(snapshot.val());
          this.attachKeys(this.keysArray, this.companiesArray);
          console.log('this.companiesArray', this.companiesArray);
        }
      })
      
    })
  }

  goToEditCompany() {
    this.router.navigate(['company-edit' ]);
  
  }
  onLogOut() {

  }
  attachKeys(keys, data){
    for(let i =0; i<data.length; i++){
      data[i].companyKey = keys[i];
    }

  } 
}







/*
 console.log('snapshot', snapshot.val());
        let obj = snapshot.val();
        let x= "hi"
        if(obj){
           for (let item in obj){
             console.log('item', item);
             let array
            array.push(item);
           }
        }
      console.log('this fired');
      */