import { Type, Transform } from 'class-transformer';

export class LeaseReceiptInfo {

    @Type(() => Number)
    idClient: number;

    @Type(() => String)
    leaseAmount?: string;

    @Type(() => String)
    receiptNumber?: string;

    @Type(() => String)
    leaseAmountInWords?: string;

    @Type(() => String)
    leaseDescription?: string;

    @Type(() => String)
    leaseAddress?: string;

    @Type(() => Date)
    @Transform(({ obj }) => parseDate(obj.fechaRecibo), { toClassOnly: true })
    receiptDate: Date;

    @Type(() => Date)
    @Transform(({ obj }) => parseDate(`${obj.anioFI}-${obj.mesFI}-${obj.diaFI}`), { toClassOnly: true })
    startDate: Date;

    @Type(() => Date)
    @Transform(({ obj }) => parseDate(`${obj.anioFF}-${obj.mesFF}-${obj.diaFF}`), { toClassOnly: true })
    endDate: Date;
}

const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};
