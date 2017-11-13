import { 
  AfterContentInit,
  Component, 
  OnInit, 
  Input 
}                            from '@angular/core';
import { 
  AngularFireDatabase, 
  FirebaseListObservable ,
  FirebaseObjectObservable,
}                             from 'angularfire2/database';
import {Sort} from '@angular/material';
import {
  Router,
  ActivatedRoute,
  Params 
}                              from '@angular/router';
// 3rd Party
import * as moment                        from 'moment'
// Custom
import { Company }             from '../../company/company';
import { Invoice }                from '../invoice';
import { Shared } from '../../shared/shared';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit{
  @Input() companyKey;
  arrayOfKeys =[];
  coColor: string;
  company: Company;
  @Input()invoices=[];
  invoicesArray = [];
  @Input() public invoice;
  sortedData
  shared = new Shared();
  moment: moment.Moment;
  
  constructor(
    private db:AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.invoicesArray = (<any>Object).values(this.invoices);
    let date;
    this.sortedData = this.invoicesArray.slice();

  }
    sortData(sort: Sort) {
    const data = this.invoicesArray.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'date':  return compare(a.date, b.date, isAsc);
        case 'amount': return compare(+a.amount, +b.amount, isAsc);
        case 'hours': return compare(+a.hours, +b.hours, isAsc);
        default: return 0;
      }
    });
  }
  goToInvoice(invoice){
  
    console.log('invoicemmmmmmmmmmmmmms', invoice);
    console.log('invoiceKey', invoice.invoiceKey);
    console.log('companyKey', invoice.companyKey);
    this.router.navigate(['/invoice-edit/', {companyKey: invoice.companyKey, invoiceKey: invoice.invoiceKey}])
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


