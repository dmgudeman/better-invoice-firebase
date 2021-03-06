
export class Item {
  id: number;
  date: Date;
  description: string;  
  amount: number;
  hours: number;
  type: string;
  companyKey: number;

  constructor(id?, date?, description?, amount?, hours?, type?, companyKey?){
    this.id = id || null;
    this.date = date || null;
    this.description = description || null;
    this.amount = amount || 0;
    this.hours = hours || 0;
    this.type = type || null;
  }
}

