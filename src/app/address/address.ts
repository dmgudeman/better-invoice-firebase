export class Address {
  id:number;
  city:string = '';
  country:string = '';
  invalid:boolean = false;
  latitude:number = null;
  longitude:number = null;
  postalCode:string = '';
  street1:string = '';
  street2:string = '';
  state:string = '';
  updatedAt:Date;
  createdAt:Date;
  companyId:number = null;

  constructor(city:string, country:string, invalid:boolean, postalCode:string, 
              state:string, street1:string, street2?:string, companyId?:number){
    this.city = city;
    this.country = country;
    this.invalid = false;
    this.postalCode = postalCode;
    this.state = state;
    this.street1 = street1;
    this.street2 = street2;
    this.companyId = companyId;
  }
} 
