import { 
  Component,
  Input, 
  OnInit,
}                         from '@angular/core';
import { Address }        from '../address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() address:Address;
  street1:string;
  street2:string;
  city:string;
  state:string;
  postalCode:string;
  country:string;
  line3:string;


  constructor() { }

  ngOnInit() {
    if(this.address){
      this.street1 = this.address.street1;
      this.street2 = this.address.street2;
      this.city = this.address.city;
      this.state = this.address.state;
      this.postalCode = this.address.postalCode;
      this.country = this.address.country;
      this.line3 = this.city + ', ' + this.state + '  ' + this.postalCode;
    }
  }
}
