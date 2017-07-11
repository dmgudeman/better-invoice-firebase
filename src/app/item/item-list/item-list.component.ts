import { 
  Component, 
  OnInit, 
  Input 
}                            from '@angular/core';
import { 
  AngularFireDatabase, 
  FirebaseListObservable ,
  FirebaseObjectObservable,
}                            from 'angularfire2/database';
import { Item }              from '../item';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import {
  Router,
  ActivatedRoute,
  Params 
}                              from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() companyKey;
  items: Item[];
  item: ItemDetailComponent;
  
  constructor(
    private db: AngularFireDatabase,
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
          try{
             this.items = company.items;
             console.log(this.items);
          }
          catch( error ){console.log('Error in ngOnInit ItemList', error)}
         })
  }

}
