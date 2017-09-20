import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  Router,
  // ActivatedRoute,
  Params
} from '@angular/router';
import { Company } from '../../company/company';
import { CompanyDetailsComponent } from '../../company/company-details/company-details.component';
import { CompanyService } from '../../company/company.service';
import { Item } from '../item';
import { Shared } from '../../shared/shared';
import { ItemListComponent }        from '../item-list/item-list.component';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  // shared = require('shared');
  @Input() item: Item
  @Input() itemColor: string;
  shared = new Shared();
  color:string;
  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    let date;
    date = this.shared.setDate(this.item.date);
    this.item.date = date;
  }
  

  goToEditItem(item?: Item) {
    let id = item.id;
    this.router.navigate(['/item-edit/' + id, { id: id }]);
  }

  setColor(color) {
      this.color = color
    return this.color;
  }

}

