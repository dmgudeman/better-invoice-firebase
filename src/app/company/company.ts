export class Company {
  id:number;
  name:string;
  color:string;
  hourly:number;
  paymentTerms:number;
  active:boolean;
  userId:string;
  items:{};
  invoices:{};
  address:{}

  constructor(name:string, color:string, hourly:number, paymentTerms:number, active:boolean, userId:string, 
              items:{}, invoices:{}, address:{}){
    this.name = name;
    this.color = color;
    this.hourly= hourly;
    this.paymentTerms = paymentTerms;
    this.active = active ? active : false;
    this.userId = userId;
    this.items = items;
    this.invoices = invoices;
    this.address = address;
  }
} 
