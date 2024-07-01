export interface LeaseReceipt {
    receiptId: number;
    idClient: number;
    fullNameClient?: string;
    leaseAmount?: string;
    receiptNumber?: string;
    leaseAmountInWords?: string;
    leaseDescription?: string;
    leaseAddress?: string;
    receiptDate: Date;
    startDate: Date;
    endDate: Date;
  }