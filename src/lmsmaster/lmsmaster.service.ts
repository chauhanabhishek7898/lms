import { Injectable } from '@nestjs/common';
import { CreateLmsmasterDto } from './dto/create-lmsmaster.dto';
import { UpdateLmsmasterDto } from './dto/update-lmsmaster.dto';
import * as sql from 'mssql';
import { sqlConnection } from '../env';
import { Lmsmaster } from './entities/lmsmaster.entity';

@Injectable()
export class LmsmasterService {

  private pool: sql.ConnectionPool;
  private sqlConnection = sqlConnection
  constructor() {
    this.pool = new sql.ConnectionPool(sqlConnection);
  }



  async UserMaster_SelectAll_Active(): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      const recordSet = await request.execute('GetTopicSubtopicJson');

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

  async insertUser(user: Lmsmaster): Promise<any> {
    console.log('Insert User Data:', user);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('topic_name', sql.VarChar(50), user.topic_name);
      request.input('subtopic_name', sql.VarChar(50), user.subtopic_name);
      request.input('completed', sql.VarChar(50), user.completed);

      const result = await request.execute('LMSMaster_Insert');

      await sql.close();
      console.log('Disconnected from SQL Server');
      return result;
    } catch (error) {
      console.error('Failed to execute stored procedure:', error);
      throw new Error('Failed to execute stored procedure');
    }
  }



  create(createLmsmasterDto: CreateLmsmasterDto) {
    return 'This action adds a new lmsmaster';
  }

  findAll() {
    return `This action returns all lmsmaster`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lmsmaster`;
  }

  update(id: number, updateLmsmasterDto: UpdateLmsmasterDto) {
    return `This action updates a #${id} lmsmaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} lmsmaster`;
  }
}
