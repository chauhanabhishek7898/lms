import { Injectable } from '@nestjs/common';
import { CreateLmsmasterDto } from './dto/create-lmsmaster.dto';
import { UpdateLmsmasterDto } from './dto/update-lmsmaster.dto';
import * as sql from 'mssql';
import { sqlConnection } from '../env';
import { Lmsmaster } from './entities/lmsmaster.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class LmsmasterService {
private transporter: nodemailer.Transporter;


  
  private pool: sql.ConnectionPool;
  private sqlConnection = sqlConnection
  constructor(
    // private configService: ConfigService
  ) {
    this.pool = new sql.ConnectionPool(sqlConnection);
    this.initializeTransporter();
  }

   private initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      // service: this.configService.get<string>('EMAIL_SERVICE'),
      // auth: {
      //   user: this.configService.get<string>('EMAIL_USER'),
      //   pass: this.configService.get<string>('EMAIL_PASSWORD'),
      // },
        service: 'gmail', // Use the service you prefer, e.g., Gmail, Outlook, etc.
      auth: {
        user: 'abhishekchauhan7898992278@gmail.com', // Sender email address
        pass: 'rasadstdaaloaqta', // Email password or App password for Gmail
      },
    });
  }


  async sendEmail(to: string, subject: string, text: string, html?: string) {
    // const mailOptions = {
    //   from: this.configService.get<string>('EMAIL_FROM'),
    //   to,
    //   subject,
    //   text,
    //   html,
    // };
     const mailOptions = {
      from: 'abhishekchauhan7898992278@gmail.com', // Sender address
      to, // List of recipients
      subject, // Subject line
      text,// Plain text body
      html
    };


    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: %s', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendTemplateEmail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>
  ) {
    // Implement template rendering logic here
    // You can use handlebars, ejs, or any other template engine
    const html = this.renderTemplate(template, context);
    return this.sendEmail(to, subject, '', html);
  }

  private renderTemplate(template: string, context: Record<string, any>): string {
    // Implement your template rendering logic
    // Example with handlebars:
    // return handlebars.compile(template)(context);
    return '';
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


 async getUser(userId: string,activeStatus: number): Promise<any> {
    try {
     await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');
      
      const request = new sql.Request();
      request.input('UESR_ID', sql.NVarChar(250), userId);
      request.input('USER_ACTIVE_STATUS', sql.SmallInt, activeStatus);
      
      const result = await request.execute('USP_USER_GET');
       await this.pool.close();
      console.log("result", result);
      
      return result?.recordset;
    } catch (error) {
      console.error('Error executing USP_USER_GET:', error);
      throw new Error(`Failed to fetch user with ID ${userId}`);
    }
  }


   async getTopicsWithSubtopicsByUser(userId: string): Promise<any> {
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');
      
      const request = new sql.Request();
      
      request.input('nuserid', sql.NVarChar(150), userId);
      
      const result = await request.execute('GetTopicSubtopicByUserJson');
       await this.pool.close();
      console.log("result", result);
      
      return result?.recordset;
    } catch (error) {
      console.error('Error executing GetTopicSubtopicByUserJson:', error);
      throw new Error(`Failed to fetch topics for user ${userId}`);
    }
  }

  async Insert_Userwise(user: any): Promise<any> {
    console.log('Insert User Data:', user);
    try {
      await sql.connect(this.sqlConnection);
      console.log('Connected to SQL Server');

      const request = new sql.Request();
      request.input('topic_name', sql.NVarChar(255), user.topic_name);
      request.input('subtopic_name', sql.NVarChar(255), user.subtopic_name);
      request.input('completed', sql.Bit, user.completed);
      request.input('userid', sql.NVarChar(150), user.userid);

      const result = await request.execute('LMSMaster_Insert_Userwise');
      
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
