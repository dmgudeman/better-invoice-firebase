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
  address:Address;
  addressId:number;
  company:Company;
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
    if(this.coId){
        this.getAddress(this.coId);
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
          
      // let  id; 
      // if (this.address) {
      //     id=this.address.id
      //     console.log(`address-edit onSubmit id ${this.address}`);
      // };
      
      // let x = this.myform.value;
      // if(this.coId){
      //    x.CompanyId = this.coId 
      // }

      // let payload =x;
      // console.log(`address-edit onSubmit payload ${JSON.stringify(payload)}`)

      // var result;
      // if (!id) {
      //     result = this._addressService.addAddress({Address:payload});
      // } else {
      //     let ID = (id) ? id : "ID NOT HERE";
  
      // result = this._addressService.updateAddress ({Address:payload}, id);}   

      // result.subscribe(x => {
      //     event.stopPropagation();
      //     // Ideally, here we'd want:
      //     // this.form.markAsPristine();
      //     this._router.navigate(['companies']);
      // });
  }

  goBack(): void {
    this.location.back();
  }
}

