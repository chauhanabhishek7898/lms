import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LmsmasterService } from './lmsmaster.service';
import { CreateLmsmasterDto } from './dto/create-lmsmaster.dto';
import { UpdateLmsmasterDto } from './dto/update-lmsmaster.dto';
import { Lmsmaster, LmsUserDto } from './entities/lmsmaster.entity';

@Controller('lmsmaster')
export class LmsmasterController {
  constructor(private readonly lmsmasterService: LmsmasterService) { }


  @Post('sendmail')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string
  ) {
    return this.lmsmasterService.sendEmail(to, subject, text);
  }

  @Get('GetTopicSubtopicJson')
  async UserMaster_SelectAll_Active(): Promise<any> {
    const data = await this.lmsmasterService.UserMaster_SelectAll_Active();
    console.log("data", data);
    return data?.recordset;
  }

  @Post('PostTopicSubtopic')
  async insertUser(@Body() userData: Lmsmaster): Promise<any> {
    const data = await this.lmsmasterService.insertUser(userData);
    console.log('User inserted:', data);
    return data;
  }

  

  @Post()
  create(@Body() createLmsmasterDto: CreateLmsmasterDto) {
    return this.lmsmasterService.create(createLmsmasterDto);
  }


    @Get('getUser/:userId/:activeStatus?')
  async getUser(
    @Param('userId') userId: string,
    @Param('activeStatus') activeStatus?: number
  ): Promise<any> {
    return this.lmsmasterService.getUser(userId, activeStatus);
  }

  @Get('GetTopicSubtopicByUserJson/:userId')
  async getTopicsWithSubtopicsByUser(
    @Param('userId') userId: string
  ): Promise<any> {
    return this.lmsmasterService.getTopicsWithSubtopicsByUser(userId);
  }

   @Post('Insert_Userwise')
  async Insert_Userwise(
    @Body() userProgressData: LmsUserDto
  ): Promise<any> {
    return this.lmsmasterService.Insert_Userwise(userProgressData);
  }


  @Get()
  findAll() {
    return this.lmsmasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lmsmasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLmsmasterDto: UpdateLmsmasterDto) {
    return this.lmsmasterService.update(+id, updateLmsmasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lmsmasterService.remove(+id);
  }
}
