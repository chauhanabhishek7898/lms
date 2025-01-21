import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import * as sql from 'mssql';
import { sqlConnection } from 'src/env';
import { GenerateBillDto, PlaceOrder } from './entities/place-order';

@Injectable()
export class OrderService {

private pool: sql.ConnectionPool;
  private sqlConnection = sqlConnection
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
