export class Master {}

export class TableDto {
    nTableId?: number; // Optional for insert, required for update
    vTableDesc: string;
    vTableCurrStatus: string;
    bStatus: boolean;
  }

  export class RoleDto {
    nRoleId: number;
    vRoleName: string;
    btActive: boolean;
    vAlias: string;
  }

  export class CategoryDto {
    nCId: number;
    vCategoryName: string;
    btActive?: boolean = true; // Default active
    vCatPrefix: string;
  }

  export class ItemDto {
    nItemId?: number; // Required only for update
    vItemCode: string;
    vItemName: string;
    nPrice: number;
    nTax: number;
    nCategoryId: number;
    bActive: boolean;
  }