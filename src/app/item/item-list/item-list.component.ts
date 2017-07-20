import { 
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
import { Item }                from '../item';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Input() companyKey;
  arrayOfKeys =[];
  coColor: string;
  company: Company;
  items=[];
  itemArray = [];
  item: Item;
  sortedData
  shared = new Shared();
  moment: moment.Moment;
  
  constructor(
    private db:AngularFireDatabase,
    private route: ActivatedRoute,
  ) {
     
   }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.companyKey = params['id']; 
        });

    this.db.object('/companies/' + this.companyKey)
      .subscribe(company => {
        this.company = company;
        this.coColor = this.company.color;
        

        try {
          let date;
          if(this.company.items){
            this.items = this.company.items
            this.itemArray = (<any>Object).values(this.items);
            console.log(this.itemArray[0]);
            this.itemArray.forEach( (item) => { 
            item.date = moment(item.date).format('MM/DD/YYYY');
            console.log(date);
            }
            )
            this.sortedData = this.itemArray.slice();

          }
        } 
        catch( error ){console.log('Error in ngOnInit ItemList', error)}
        }
      )

  }
    sortData(sort: Sort) {
    const data = this.itemArray.slice();
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
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}