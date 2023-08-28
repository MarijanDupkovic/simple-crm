export class Customer {
    company: string;
    street: string;
    zipCode: number;
    city: string;
    email:string;
    notices: any[];
    invoices: any[];
    constructor(obj?: any) {
            this.company = obj ? obj.company : '';
            this.street = obj ? obj.street : '';
            this.zipCode = obj ? obj.zipCode : '';
            this.city = obj ? obj.city : '';
            this.email = obj ? obj.email : '';
            this.notices = obj ? obj.notices : [];
            this.invoices = obj ? obj.invoices : [];
    }

    public toJson(){
        return {
            company: this.company,           
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email,
            notices: this.notices,
            invoices: this.invoices
        };
    }
}
