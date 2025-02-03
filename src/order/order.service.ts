import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import * as sql from 'mssql';
import { sqlConnection } from 'src/env';
import { GenerateBillDto, PaidBillDto, PlaceOrder, UpdateKOTStatusDto } from './entities/place-order';

@Injectable()
export class OrderService {

  private pool: sql.ConnectionPool;
  private sqlConnection = sqlConnection;
  constructor() {
    this.pool = new sql.ConnectionPool(sqlConnection);
  }

  async placeOrder(order: PlaceOrder): Promise<any> {
    console.log('Order data:', order);
    try {
      // Connect to SQL Server
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();

      // Input parameters for the stored procedure
      request.input('nTableNumber', sql.Int, order.nTableNumber);
      request.input('nWaiterId', sql.Int, order.nWaiterId);
      request.input('vCustomerName', sql.NVarChar(250), order.vCustomerName);
      request.input('p_items', sql.NVarChar(sql.MAX), JSON.stringify(order.p_items));
      request.input('nuserid', sql.Int, order.nuserid);

      // Execute the stored procedure
      const recordSet = await request.execute('PlaceOrder');

      // Close the connection
      try {
        await this.pool.close();
        console.log('Disconnected from SQL Server');
      } catch (error) {
        console.error('Failed to disconnect from SQL Server:', error);
      }

      console.log('RecordSet:', recordSet);
      return recordSet;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }


  async generateBill(billData: GenerateBillDto): Promise<any> {
    console.log('Generating bill with data:', billData);

    try {
      // Connect to SQL Server
      const pool = await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request(pool);

      // Input parameters for the stored procedure
      request.input('nBillId', sql.Int, billData.nBillId);
      request.input('nTaxPer', sql.Numeric(18, 2), billData.nTaxPer);
      request.input('nDiscount', sql.Numeric(18, 2), billData.nDiscount);

      // Execute the stored procedure
      const result = await request.execute('GenerateBill');

      // Close the connection
      await pool.close();
      console.log('Disconnected from SQL Server');

      console.log('Generated Bill:', result.recordset);
      return result.recordset;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }




  async PrintKot(nKotNumber): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nKotNumber', sql.Numeric(18, 0), nKotNumber);
      const recordSet = await request.execute('PrintKot');

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


  async DM_sp_Bill_Select(nTableNumber): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nTableNumber', sql.Numeric(18, 0), nTableNumber);
      const recordSet = await request.execute('DM_sp_Bill_Select');

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

async DM_sp_Print_Bill(nTableNumber): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nTableNumber', sql.Numeric(18, 0), nTableNumber);
      const recordSet = await request.execute('DM_sp_Print_Bill');

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



  async updateKOTStatus(updateKOTStatusDto: UpdateKOTStatusDto): Promise<any> {
    console.log('Updating KOT status with data:', updateKOTStatusDto);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nKotNumber', sql.Int, updateKOTStatusDto.nKotNumber);
      request.input('vKotStatus', sql.NVarChar(50), updateKOTStatusDto.vKotStatus);

      const recordSet = await request.execute('UpdateKOTStatus');

      console.log('RecordSet:', recordSet);
      return recordSet;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    } finally {
      try {
        await sql.close();
        console.log('Disconnected from SQL Server');
      } catch (error) {
        console.error('Failed to disconnect from SQL Server:', error);
      }
    }
  }


  async recordPayment(paymentData: PaidBillDto): Promise<any> {
    console.log('Processing payment:', paymentData);

    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('nBillId', sql.Int, paymentData.nBillId);
      request.input('vPaymentMode', sql.NVarChar(50), paymentData.vPaymentMode);
      request.input('nPaidAmount', sql.Decimal(18, 2), paymentData.nPaidAmount);
      request.input('dPaymentDate', sql.DateTime, paymentData.dPaymentDate || new Date());
      request.input('vPaymentReference', sql.NVarChar(100), paymentData.vPaymentReference || null);
      request.input('vUPIID', sql.NVarChar(100), paymentData.vUPIID || null);
      request.input('vBankName', sql.NVarChar(100), paymentData.vBankName || null);
      request.input('vAccountNumber', sql.NVarChar(50), paymentData.vAccountNumber || null);

      const result = await request.execute('rest.PaidBill');

      console.log('Payment successfully recorded');
      await sql.close();

      return result.recordset;
    } catch (error) {
      console.error('Payment recording failed:', error);
      await sql.close();
      throw new Error(error.message || 'Database operation failed');
    }
  }


  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
