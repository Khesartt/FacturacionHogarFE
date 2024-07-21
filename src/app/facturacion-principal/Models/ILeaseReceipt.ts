export interface LeaseReceipt {
    receiptId: number;
    idClient: number;
    clientName?: string;
    leaseAmount?: number;
    receiptNumber?: string;
    leaseAmountInWords?: string;
    leaseDescription?: string;
    leaseAddress?: string;
    receiptDate: Date;
    startDate: Date;
    endDate: Date;
    shouldSave : boolean;
  }