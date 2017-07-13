import { 
  Component, 
  OnInit, 
  Input 
}                            from '@angular/core';
import { NgFor } from '@angular/common';
import { 
  AngularFireDatabase, 
  FirebaseListObservable ,
  FirebaseObjectObservable,
}                             from 'angularfire2/database';
import {
  Router,
  ActivatedRoute,
  Params 
}                              from '@angular/router';
// 3rd Party
// Custom
import { Company }             from '../../company/company';
import { Item }                from '../item';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() companyKey;
  arrayOfKeys =[];
  company: Company;
  items: {};
  itemArray = [];
  item: ItemDetailComponent;
  
  constructor(
    private db:AngularFireDatabase,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.companyKey = params['id']; 
        console.log('companyKey', this.companyKey);
        });

    this.db.object('/companies/' + this.companyKey)
      .subscribe(company => {
        console.log('company', company);
        this.company = company;

        try {
          if(this.company.items){
            this.items = this.company.items
            this.arrayOfKeys = Object.keys(this.items);

          }
          console.log(this.items);
        } 
        catch( error ){console.log('Error in ngOnInit ItemList', error)}
        }
      )

  }
}
