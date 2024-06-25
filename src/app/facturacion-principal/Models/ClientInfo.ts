import { Type } from 'class-transformer';

export class ClientInfo {
    @Type(() => String)
    identification: string;

    @Type(() => String)
    phone: string;

    @Type(() => String)
    fullName: string;

    constructor(identification: string, phone: string, fullName: string) {
        this.identification = identification;
        this.phone = phone;
        this.fullName = fullName;
    }
}