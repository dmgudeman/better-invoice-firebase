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
  companiesArray: Company[];
  icons=['add']

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
     if(!this.user){ 
      console.log('NOT LOGGED IN')
      return;
    }
    console.log("LOGGED IN", this.user)
    this.afAuth.authState.subscribe ( user => {
      if (user) {
      this.userId = user.uid;
      console.log('this.userId', this.userId)
       this.db.list('/companiesByUser/' + this.userId, {
      query: {
        orderByChild: 'name'
      }
    }).subscribe(x=>{
      
     this.companiesArray = x;
     console.log('companies in ngOnInit', this.companies);
    })
      
      }
    });
   
  }

  goToEditCompany() {
    this.router.navigate(['company-edit' ]);
  
  }
onLogOut() {

}

}
