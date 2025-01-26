export class PlaceOrder {
    nTableNumber: number;
    nWaiterId: number;
    vCustomerName: string;
    p_items: { item_id: number; quantity: number }[];
    nuserid: number;
  }
  

// DTO file (generate-bill.dto.ts)
export class GenerateBillDto {
  nBillId: number;
  nTaxPer: number;
  nDiscount: number;
}

export class UpdateKOTStatusDto {
  nKotNumber: number;
  vKotStatus: string; // 'pending', 'in_progress', or 'served'
}