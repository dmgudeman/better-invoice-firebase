import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule,
  Validators,
}                           from '@angular/forms';
import { 
  AngularFireDatabase, 
  FirebaseListObservable,
  FirebaseObjectObservable,
}                           from 'angularfire2/database';
import { 
  Router, 
  ActivatedRoute, 
  Params, 
}                           from '@angular/router';
import { Company }          from '../company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  getCompanies: FirebaseListObservable<any[]>;
  companies: Company[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.db.list('/companies', {
      query: {
        orderByChild: 'name'
      }
    }).subscribe(x=>{
     this.companies = x;
    })
  }
    


}
