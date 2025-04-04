import { Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';

import * as sql from 'mssql';
import { sqlConnection } from '../env';
import { UserDto } from './dto/user.dto';
import { CategoryDto, ItemDto, RoleDto, TableDto } from './entities/master.entity';

@Injectable()
export class MasterService {

  private pool: sql.ConnectionPool;
  private sqlConnection = sqlConnection
  constructor() {
    this.pool = new sql.ConnectionPool(sqlConnection);
  }


  async DM_sp_GetUserDetailsByUserId(nUserId): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nUserId', sql.Numeric(18, 0), nUserId);
      const recordSet = await request.execute('DM_sp_GetUserDetailsByUserId');

      //   console.log('Executing proc...', recordSet);
      try {
        await this.pool.close();
        console.log('Disconnected from SQL Server');
      } catch (error) {
        console.error('Failed to disconnect from SQL Server:', error);
      }
      console.log("recordSet",  recordSet);
      
      return recordSet;
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw new Error('Failed to connect to SQL Server');
    }
  }


  async DM_sp_GetUserDetailsUsingUNandPW(vUserName, vPassword, vDeviceId): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('vUserName', sql.VarChar, vUserName);
      request.input('vPassword', sql.VarChar, vPassword);
      request.input('vDeviceId', sql.VarChar, vDeviceId);
      const recordSet = await request.execute('DM_sp_GetUserDetailsUsingUNandPW');

      // const user = recordSet;

      // const secretKey = process.env.JWT_SECRET;
      // console.log('secretKey', secretKey)
      // const token = jwt.sign({ userId: user.recordset[0].nUserId, username: user.recordset[0].vUserName }, secretKey, { expiresIn: '5m' });
      // //   console.log('Executing proc...', recordSet);
      // try {
      //   await this.pool.close();
      //   console.log('Disconnected from SQL Server');
      // } catch (error) {
      //   console.error('Failed to disconnect from SQL Server:', error);
      // }
      // return { user, token };
      console.log('recordSet', recordSet?.recordset);
      return recordSet?.recordset;
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw new Error('Failed to connect to SQL Server');
    }
  }



  

  async UserMaster_SelectAll_Active(): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      const recordSet = await request.execute('UserMaster_SelectAll_Active');

      //   console.log('Executing proc...', recordSet);
      try {
        await this.pool.close();
        console.log('Disconnected from SQL Server');
      } catch (error) {
        console.error('Failed to disconnect from SQL Server:', error);
      }
      console.log("recordSet", recordSet);

      return recordSet;
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw new Error('Failed to connect to SQL Server');
    }
  }

  async insertUser(user: UserDto): Promise<any> {
    console.log('Insert User Data:', user);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('vFullName', sql.VarChar(50), user.vFullName);
      request.input('vUserName', sql.VarChar(50), user.vUserName);
      request.input('vPassword', sql.VarChar(50), user.vPassword);
      request.input('vMobileNo', sql.VarChar(50), user.vMobileNo);
      request.input('vEmailId', sql.VarChar(50), user.vEmailId);
      request.input('nRoleId', sql.Int, user.nRoleId);

      const result = await request.execute('DM_sp_UserMaster_Insert');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }

  async updateUser(user: UserDto): Promise<any> {
    console.log('Update User Data:', user);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nUserId', sql.Int, user.nUserId);
      request.input('vFullName', sql.VarChar(50), user.vFullName);
      request.input('vUserName', sql.VarChar(50), user.vUserName);
      request.input('vPassword', sql.VarChar(50), user.vPassword);
      request.input('vMobileNo', sql.VarChar(50), user.vMobileNo);
      request.input('vEmailId', sql.VarChar(50), user.vEmailId);
      request.input('nRoleId', sql.Int, user.nRoleId);
      request.input('btActive', sql.Bit, user.btActive);
      request.input('vDeviceId', sql.VarChar(50), user.vDeviceId);

      const result = await request.execute('DM_sp_UserMaster_Update');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }


  async DM_sp_TableMaster_SelectAll_Active(): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      const recordSet = await request.execute('DM_sp_TableMaster_SelectAll_Active');

      //   console.log('Executing proc...', recordSet);
      try {
        await this.pool.close();
        console.log('Disconnected from SQL Server');
      } catch (error) {
        console.error('Failed to disconnect from SQL Server:', error);
      }
      console.log("recordSet", recordSet);

      return recordSet;
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw new Error('Failed to connect to SQL Server');
    }
  }


  async insertTable(table: TableDto): Promise<any> {
    console.log('Insert Table Data:', table);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('vTableDesc', sql.VarChar(50), table.vTableDesc);
      request.input('vTableCurrStatus', sql.VarChar(50), table.vTableCurrStatus);
      request.input('bStatus', sql.Bit, table.bStatus);

      const result = await request.execute('DM_sp_TableMaster_Insert');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }

  async updateTable(table: TableDto): Promise<any> {
    console.log('Update Table Data:', table);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nTableId', sql.Int, table.nTableId);
      request.input('vTableDesc', sql.VarChar(50), table.vTableDesc);
      request.input('vTableCurrStatus', sql.VarChar(50), table.vTableCurrStatus);
      request.input('bStatus', sql.Bit, table.bStatus);

      const result = await request.execute('DM_sp_TableMaster_Update');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }



  async DM_sp_RoleMaster_SelectAllActive(): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      const recordSet = await request.execute('DM_sp_RoleMaster_SelectAllActive');

      //   console.log('Executing proc...', recordSet);
      try {
        await this.pool.close();
        console.log('Disconnected from SQL Server');
      } catch (error) {
        console.error('Failed to disconnect from SQL Server:', error);
      }
      console.log("recordSet", recordSet);

      return recordSet?.recordset;
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw new Error('Failed to connect to SQL Server');
    }
  }


  async DM_sp_RoleMaster_Insert(table: RoleDto): Promise<any> {
    console.log('Insert Table Data:', table);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      // request.input('nRoleId', sql.Int, table.nRoleId);
      request.input('vRoleName', sql.VarChar(50), table.vRoleName);
      request.input('btActive', sql.Bit, table.btActive);
      request.input('vAlias', sql.VarChar(50), table.vAlias);

      const result = await request.execute('DM_sp_RoleMaster_Insert');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }

  async DM_sp_RoleMaster_Update(table: RoleDto): Promise<any> {
    console.log('Update Table Data:', table);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nRoleId', sql.Int, table.nRoleId);
      request.input('vRoleName', sql.VarChar(50), table.vRoleName);
      request.input('btActive', sql.Bit, table.btActive);
      request.input('vAlias', sql.VarChar(50), table.vAlias);

      const result = await request.execute('DM_sp_RoleMaster_Update');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }
  




  
  async DM_sp_CategoryMaster_SelectAll_Active(): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      const recordSet = await request.execute('DM_sp_CategoryMaster_SelectAll_Active');

      //   console.log('Executing proc...', recordSet);
      try {
        await this.pool.close();
        console.log('Disconnected from SQL Server');
      } catch (error) {
        console.error('Failed to disconnect from SQL Server:', error);
      }
      console.log("recordSet", recordSet);

      return recordSet?.recordset;
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw new Error('Failed to connect to SQL Server');
    }
  }

  async DM_sp_CategoryMaster_Insert(user: CategoryDto): Promise<any> {
    console.log('Insert User Data:', user);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('vCategoryName', sql.VarChar(50), user.vCategoryName);
      request.input('vCatPrefix', sql.VarChar(50), user.vCatPrefix);
      request.input('btActive', sql.Bit, user.btActive);

      const result = await request.execute('DM_sp_CategoryMaster_Insert');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }

  async DM_sp_CategoryMaster_Update(user: CategoryDto): Promise<any> {
    console.log('Update User Data:', user);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nCId', sql.Int, user.nCId);
      request.input('vCategoryName', sql.VarChar(50), user.vCategoryName);
      request.input('vCatPrefix', sql.VarChar(50), user.vCatPrefix);
      request.input('btActive', sql.Bit, user.btActive);

      const result = await request.execute('DM_sp_CategoryMaster_Update');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }




  async DM_sp_ItemMaster_SelectAll_Active(): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      const recordSet = await request.execute('DM_sp_ItemMaster_SelectAll_Active');

      //   console.log('Executing proc...', recordSet);
      try {
        await this.pool.close();
        console.log('Disconnected from SQL Server');
      } catch (error) {
        console.error('Failed to disconnect from SQL Server:', error);
      }
      console.log("recordSet", recordSet);

      return recordSet?.recordset;
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw new Error('Failed to connect to SQL Server');
    }
  }

  async DM_sp_ItemMaster_Insert(item: ItemDto): Promise<any> {
    console.log('Insert Item Data:', item);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('vItemCode', sql.NVarChar(50), item.vItemCode);
      request.input('vItemName', sql.NVarChar(250), item.vItemName);
      request.input('nPrice', sql.Numeric(18, 2), item.nPrice);
      request.input('nTax', sql.Numeric(18, 2), item.nTax);
      request.input('nCategoryId', sql.Int, item.nCategoryId);
      request.input('bActive', sql.Bit, item.bActive);

      const result = await request.execute('DM_sp_ItemMaster_Insert');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }

  async DM_sp_ItemMaster_Update(item: ItemDto): Promise<any> {
    console.log('Update Item Data:', item);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nItemId', sql.Int, item.nItemId);
      request.input('vItemCode', sql.NVarChar(50), item.vItemCode);
      request.input('vItemName', sql.NVarChar(250), item.vItemName);
      request.input('nPrice', sql.Numeric(18, 2), item.nPrice);
      request.input('nTax', sql.Numeric(18, 2), item.nTax);
      request.input('nCategoryId', sql.Int, item.nCategoryId);
      request.input('bActive', sql.Bit, item.bActive);

      const result = await request.execute('DM_sp_ItemMaster_Update');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }


  create(createMasterDto: CreateMasterDto) {
    return 'This action adds a new master';
  }

  findAll() {
    return `This action returns all master`;
  }

  findOne(id: number) {
    return `This action returns a #${id} master`;
  }

  update(id: number, updateMasterDto: UpdateMasterDto) {
    return `This action updates a #${id} master`;
  }

  remove(id: number) {
    return `This action removes a #${id} master`;
  }
}
