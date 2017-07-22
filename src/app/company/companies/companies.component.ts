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
  companiesArray = [];
  icons=['add']
  x;
  sanpshot

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
  // console.log(this.companiesArray);
  //    if(!this.user){ 
  //     console.log('NOT LOGGED IN')
  //     return;
  //   }
  //   console.log("LOGGED IN", this.user)
    this.afAuth.authState.subscribe ( user => {
      if (!user) return;
      this.userId = user.uid;
      
      firebase.database().ref('/companies').once('value', (snapshot)=> {
        this.companiesArray =  (<any>Object).values(snapshot.val());
      })
    //   let companiesRef = firebase.database().ref('/companiesByUserId/' + this.userId);
    //   companiesRef.on('value', gotData, errData);

    //  function gotData(data, setData){
    //     // console.log((<any>Object).values(data.val()));
    //     let companies = data.val();
    //     var keys = Object.keys(data.val());
    //     let array =[];
    //     for(let i=0; i< keys.length; i++) {
    //       var k = keys[i];
    //       (<any>array).push(companies[k])
    //       // console.log( companies[k]);

    //     }
    //     this.companiesArray = array;
    //   };
     
    //   function errData(err){
    //     console.log('Error');
    //     console.log(err);
    //   }

    //   function setData(data){
    //     console.log('data', data);
    //     this.companiesArray = data;
    //     console.log('this.companiesArray', this.companiesArray);


      })
    //   companiesRef.on('value', function(snapshot){
    //     console.log('snapshot', snapshot.val());
    //     console.log('BBBBBBBBBBBBB', snapshot.val() === null)
    //     this.companiesArray = (<any>Object).values(snapshot.val())
    //   });
      
    //   this.db.list('companies').subscribe(x=>{
    //     this.x = x;
    // }


    // )
    // firebase.database().ref().child('companies').once('value').then(function(snapshot){

    //   console.log('snapshot', snapshot);
    //   return snapshot;
    //   // this.companiesArray = snapshot.val();
    // }).then(data =>{
    //   this.companiesArray = (<any>Object).values(data);
    //   console.log(this.companiesArray);

    // });
      
    // });
   
  }

  getCompanies(a){
    console.log('AAAAAAAAAAAAAA', a);

  }
  goToEditCompany() {
    this.router.navigate(['company-edit' ]);
  
  }
onLogOut() {

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