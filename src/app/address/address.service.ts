import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
 
@Injectable()
export class AddressService {
  
  private address 

  constructor () {
    this.address = ''
  }

  public setAddress(address) {
    this.address = address;
  }

  public getAddress () {
    return this.address;
  }
  
}
