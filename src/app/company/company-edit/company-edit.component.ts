import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule,
  Validators,
}                         from '@angular/forms';
import { 
  AngularFireDatabase, 
  FirebaseListObservable ,
  FirebaseObjectObservable,
  }                         from 'angularfire2/database';
import { 
  Router, 
  ActivatedRoute, 
  Params, 
  }                         from '@angular/router';
import { $ }                from 'jquery';
import { Observable }       from 'rxjs/Observable';

import { Company }          from '../company';
import { CompanyService }   from '../company.service';

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
  
    private _companyService: CompanyService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _fb:FormBuilder,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.companies = this.db.list('/companies');
     this.myform = this._fb.group({
            name:['', Validators.required],
            color:'',
            hourly: '',
            paymentTerms: '',
            active: '',
            userId: ''
          });
          this._route.params
            .subscribe(params => { 
                this.coId = params['id']
                this.coName = params['coName']
            });
        this.title = this.coId ? " Edit "+ this.coName + " Details" : " New Business";
                                  
        // if(this.coId){
        //     this._companyService
        //         .getCompany(this.coId)
        //         .subscribe(company => {this.company= company;
        //          console.log(`000edit-company ngOnInit company= ${JSON.stringify(company)}`)
                    
        //             this.name.setValue(this.company.name);
        //             this.color.setValue(this.company.color);
        //             this.hourly.setValue(this.company.hourly);
        //             this.paymentTerms.setValue(this.company.paymentTerms);
        //             this.active.setValue(this.company.active)
        //             return this.company;
        //         },
        //         response => {
        //             if (response.status === 404){
        //                 this._router.navigate(['NotFound']);
        //         }
        //     });
        // }

  }

  setCompany() {
    let formValue = this.myform.value;
    let name = formValue.name;
    let color = formValue.color;
    let hourly = formValue.hourly;
    let paymentTerms = formValue.paymentTerms;
    let active = formValue.active;
    console.log(name, color, paymentTerms);
    this.companies.push({
      name:name, color:color,  paymentTerms:paymentTerms, hourly:hourly, active:true, userId:1
    });
    return name;
  }  


  onSubmit() {
    console.log('onSubmit fired');
    let  id = this.coId;
    let stringUid = '' + this.userId;
    var payload = this.myform.value;
    payload.userId=this.userId;
    // let modified = {"company": payload};
    
    console.log('name', name);

    // this._companyService
    //     .addCompany({name: 'Sinclair', color: 'green', paymentTerms: 30})
    //     .subscribe(data => console.log(data));

  this.setCompany().subscribe(data => {
    console.log('data', data);
  });

    // var result;
    //     if (id) {
    //         let result = this._companyService
    //                          .updateCompany(payload, id)
    //                          .subscribe(result => {
    //                                 console.log(`RESULT = ${JSON.stringify(result)}`);
    //                          })
    //         // this._router.navigate(['companies']);
    //     } else {
    //         let ID = (id) ? id : "ID NOT HERE";
    //         console.log(`333edit-company onSubmit payload ${JSON.stringify(payload)}`);
    //         let result = this._companyService.addCompany(payload);
    //         console.log(`444result ${result}`);
    //     }   
            this._router.navigate(['companies']);
    //    this._companyService.addCompany(payload).subscribe(x => {
    //         // Ideally, here we'd want:
    //         // this.form.markAsPristine();
    //         this._router.navigate(['companies']);
    //     });
    }

}
// this.name = name;
//     this.color = color;
//     this.hourly= hourly;
//     this.paymentTerms = paymentTerms;
//     this.active = active ? active : false;
//     this.userId = userId;