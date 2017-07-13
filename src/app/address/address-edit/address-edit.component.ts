import { 
  Component, 
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  OnInit, 
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA, 
  }                              from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule }          from '@angular/forms';
import { Location }              from '@angular/common';

import { 
  Router, 
  ActivatedRoute, 
  Params }                       from '@angular/router';
import { Observable }            from 'rxjs/Observable';
import { Address }               from '../address';
// import { AddressService }              from '../address.service';
import { CompanyService }        from '../../company/company.service';
import { Company }               from '../../company/company';
import { customTransitionRight } from '../../shared/custom-transition-right.component';
// import { InputComponent }              from '../shared/input/input.component';
import { ItemDetailComponent }   from '../../item/item-detail/item-detail.component';
import { 
  MdInputContainer,
  MdTab,
  MdTabGroup,
 }                               from '@angular/material';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css'],
  providers:[]
})
export class AddressEditComponent implements OnInit {
  @Input() coId: number;
  @Input() company: Company;
  address:Address;
  addressId:number;
  errorMessage: string;
  myform : FormGroup;

  constructor( 
    // private _addressService:AddressService,
    // private _companyService:CompanyService,
    private location:Location,
    private router:Router,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    ) {
      this.buildForm();
  }

  ngOnInit() {
    if(this.company)
    console.log('company.name in ngOnInit', this.company.name);
    if(this.company) {
      let address = this.company.address;
      let mf = this.myform.value; 
    }
  } 
  buildForm() {
    this.myform = this.fb.group({
      city: '',
      country:'',
      invalid:false,
      // latitude:'',
      // longitude:'',
      postalCode:'',
      street1:'',
      street2:'',
      state:'',
      companyId:''
    });
  }
  getAddress(coId) { 
      // this._companyService
      //     .getCompany(coId)
      //     .subscribe(company => {this.address= company.Address;
      //         console.log(`address-edit getAddress address= ${JSON.stringify(this.address)}`)
      //             console.log(`INNNNNNNNNNNNNNNN ${coId}`);
      //         if (this.address !==null) {
      //             this.myform.patchValue({
      //             city: this.address.city,
      //             invalid: false,
      //             country: this.address.country,
      //             state: this.address.state,
      //             postalCode: this.address.postalCode,
      //             // latitude: null,
      //             // longitude: null,
      //             street1:this.address.street1,
      //             street2: this.address.street2,
      //             CompanyId: coId,
      //         })
      //             response => {
      //                 if (response.status === 404){
      //                     this._router.navigate(['NotFound']);
      //                 }
      //             }
      //         } else {
                  
      //             console.log(`NO ADDRESS FOUND this.address= ${this.address}`);
      //         }

      // });
  }

  onSubmit2($event) {
     console.log('address', this.myform.value);
     
  }

  goBack(): void {
    this.location.back();
  }
}

