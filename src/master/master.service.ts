import { Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';

import * as sql from 'mssql';
import { sqlConnection } from '../env';

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
      console.log('recordSet', recordSet);
      return recordSet;
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw new Error('Failed to connect to SQL Server');
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

      return recordSet;
    } catch (error) {
      console.error('Failed to connect to SQL Server:', error);
      throw new Error('Failed to connect to SQL Server');
    }
  }

  async DM_sp_ItemMaster_SelectAll_Active(): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      // request.input('nTrans_Id', sql.Numeric(18, 0), palletMaster.nTrans_Id);
      // request.input('vTransCode', sql.VarChar(18), palletMaster.vTransCode);
      const recordSet = await request.execute('DM_sp_ItemMaster_SelectAll_Active');

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

  async DS_sp_UserMaster_SelectAllActive(): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      const recordSet = await request.execute('DS_sp_UserMaster_SelectAllActive');

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
