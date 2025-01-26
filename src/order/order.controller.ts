import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GenerateBillDto, PlaceOrder, UpdateKOTStatusDto } from './entities/place-order';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('placeOrder')
  async placeOrder(@Body() orderData: PlaceOrder): Promise<any> {
    const data = await this.orderService.placeOrder(orderData);
    console.log('Order placed:', data.recordset);
    return data.recordset;
  }

  @Post('generate')
  async generateBill(@Body() billData: GenerateBillDto): Promise<any> {
    const data = await this.orderService.generateBill(billData);
    console.log('Bill generated:', data);
    return data;
  }


  @Get('PrintKot/:nKotNumber')
  async PrintKot(
    @Param('nUserId') nKotNumber: number,
  ): Promise<any> {
    const data = await this.orderService.PrintKot(nKotNumber);
    console.log("data.recordset", data.recordset);
    return data;
  }

  
   @Get('DM_sp_Bill_Select/:nTableNumber')
  async DM_sp_Bill_Select(
    @Param('nTableNumber') nTableNumber: number,
  ): Promise<any> {
    const data = await this.orderService.DM_sp_Bill_Select(nTableNumber);
    console.log("data.recordset", data.recordset);
    return data.recordset;
  }

  @Post('UpdateKOTStatus')
  async updateKOTStatus(@Body() kotData: UpdateKOTStatusDto): Promise<any> {
    const data = await this.orderService.updateKOTStatus(kotData);
    console.log('update KOT Status:', data);
    return data;
  }


  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}