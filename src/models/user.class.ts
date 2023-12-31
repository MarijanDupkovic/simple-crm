export class User {
    firstName: string;
    lastName: string;
    street: string;
    zipCode: number;
    city: string;
    email:string;
    constructor(obj?: any) {
            this.firstName = obj ? obj.firstName : '';
            this.lastName = obj ? obj.lastName : '';
            this.street = obj ? obj.street : '';
            this.zipCode = obj ? obj.zipCode : '';
            this.city = obj ? obj.city : '';
            this.email = obj ? obj.email : '';
    }

    public toJson(){
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email,
        };
    }
}