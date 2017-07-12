import { Component, OnInit }              from '@angular/core';
import { Router, 
         ActivatedRoute, 
         Params }                         from '@angular/router';
import { Location }                       from '@angular/common';
// 3rd party
import * as moment               from 'moment'
import 'rxjs/add/operator/filter';
import { Observable }                     from 'rxjs/Observable';
// custom
import { CompanyService }                 from '../../company/company.service';
import { Company }                        from '../../company/company';
import { Item }                           from '../../item/item';
import { ItemDetailComponent }         from '../../item/item-detail/item-detail.component';
import { Invoice }                        from '../invoice'; 
// import { MyGlobals }                      from '../../shared/myglobals';
import { Shared }                         from '../../shared/shared';


@Component({
  selector: 'app-invoice-pre-pdf',
  templateUrl: './invoice-pre-pdf.component.html',
  styleUrls: ['./invoice-pre-pdf.component.css']
})
export class InvoicePrePdfComponent implements OnInit {

  // existing list
  coDetails
  coId: number;
  color:string = '';
  company:Company;
  coName: string = '';
  coInterval: number;
  date = new Date("2017-2-11");
  date2 = new Date("2017-2-12");
  errorMessage: string;
  createdDate: Date;
  dueDate: Date;
  invoiceId: number = 0;
  invoice: Invoice;
  invoices: Invoice[];
  item: ItemDetailComponent;
  items: Item[];
  items2: Item[] =[];
  m: moment.Moment;
  // myGlobals: MyGlobals;
  shared: Shared;
  


  constructor(
               private _location:Location,
               private _route:ActivatedRoute,
               private _router:Router) {
                 this.shared = new Shared();
                //  this.myGlobals = new MyGlobals();
                }

  ngOnInit() {
    this._route.params.subscribe(params => {this.invoice = params['id']; });
    console.log(JSON.stringify(this.invoice));
  }

  
   
  goNowhere() {};

  goBack(): void {
        this._location.back();
    }
  setColor(color) {
        console.log("COLOR " + this.color);
        return color
    }
  submit(){
    // let stringy = document.documentElement.innerHTML;
  //    let stringy = document.getElementById('invoice-body').innerHTML;
  //    this._invoiceService
  //        .addPdf(stringy)
  //        .subscribe(
  //           x => {console.log("Success!");
  //             this._router.navigate(['companies'])}, 
  //           response => { if (response.status = 404) {
  //             this._router.navigate(['not-found']);}
  //           }
  //        );
  }
}
