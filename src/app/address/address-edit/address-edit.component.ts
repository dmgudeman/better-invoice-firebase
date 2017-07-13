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
  }

  ngOnInit() {
    if(this.company)
    console.log('company.name in ngOnInit', this.company.name);
    if(this.company) {
      let address = this.company.address;
      this.buildForm(this.company.address)
    }
    this.buildForm(); 
  } 
  buildForm(address?) {
    if(address){
      this.myform = this.fb.group({
        city: address.city || null,
        country: address.country || null,
        invalid: address.invalid || false,
        // latitude:'',
        // longitude:'',
        postalCode: address.postalCode || null,
        street1: address.street1 || null,
        street2: address.street2 || null,
        state: address.state || null,
        companyId: address.companyId || null,
    });
    } else{
      this.myform = this.fb.group({
        city: '',
        country: '',
        invalid: false,
        // latitude:'',
        // longitude:'',
        postalCode: null,
        street1: '',
        street2: '',
        state: '',
        companyId: '',
      });
    }
  }
  

  onSubmit2($event) {
     console.log('address', this.myform.value);
     
  }

  goBack(): void {
    this.location.back();
  }
}

