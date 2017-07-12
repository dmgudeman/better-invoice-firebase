import { Company }              from '../company/company';
import { Item }                 from '../item/item';
import { InvoiceInterface }     from "./invoice.interface";


export class Invoice implements InvoiceInterface {
        beginDate: Date;
        endDate: Date;
        description: string;
        amount: number;
        discount: number;
        url;
        companyId: number;
        Company: Company;
        Items: Item[];

    constructor(id?, beginDate?, endDate?, description?, amount?, discount?, url?, companyId?, company?, Items?){
        this.beginDate   = beginDate || null;
        this.endDate     = endDate || null;
        this.description = description || null;
        this.amount      = amount || 0;
        this.discount    = discount || 0;
        this.url         = url || null;
        this.companyId   = companyId || 0;
        this.Company     = company || null;
        this.Items       = Items || null;
        }
    }