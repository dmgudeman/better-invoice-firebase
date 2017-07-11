export class Company {
  id:number;
  name:string;
  color:string;
  hourly:number;
  paymentTerms:number;
  active:boolean;
  userId:number;
  items:any[];
  updatedAt:Date;
  createdAt:Date;

  constructor(name:string, color:string, hourly:number, paymentTerms:number, active:boolean, userId:number, items:any[]){
    this.name = name;
    this.color = color;
    this.hourly= hourly;
    this.paymentTerms = paymentTerms;
    this.active = active ? active : false;
    this.userId = userId;
    this.items = items;
  }
} 
