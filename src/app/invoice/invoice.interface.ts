import { Company }     from '../company/company';
import { Item }        from '../item/item';

export interface InvoiceInterface {
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
        paymentTerms: number;
        coName: string;
        dueDate: Date;
}