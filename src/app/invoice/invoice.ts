import { Company }              from '../company/company';
import { Item }                 from '../item/item';
import { InvoiceInterface }     from "./invoice.interface";
import * as moment                        from 'moment'


export class Invoice implements InvoiceInterface {
  beginDate: Date;
  endDate: Date;
  description: string;
  amount: number;
  discount: number;
  url;
  companyKey: string;
  company: Company;
  items: Item[];
  createdAt: string;
  total: number;
  address: string;
  paymentTerms: number;
  coName: string;
  dueDate: Date;

  constructor(id?, beginDate?, endDate?, description?,
     amount?, discount?, url?, companyKey?, company?, items?, total?, address?, paymentTerms?, coName?, dueDate? ){
    this.beginDate   = beginDate.moment.format('L') || null;
    this.endDate     = endDate.moment.format('L') || null;
    this.description = description || null;
    this.amount      = amount || 0;
    this.discount    = discount || 0;
    this.url         = url || null;
    this.companyKey   = companyKey || 0
    this.company     = company || null;
    this.items       = items || null;
    this.createdAt   = moment().format('ll');
    this.total       = total;
    this.address     = address;
    this.paymentTerms= paymentTerms;
    this.coName      = coName;
    this.dueDate     = dueDate.moment.format('L');
  }
}