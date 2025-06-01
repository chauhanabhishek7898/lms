import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LmsmasterService } from './lmsmaster.service';
import { CreateLmsmasterDto } from './dto/create-lmsmaster.dto';
import { UpdateLmsmasterDto } from './dto/update-lmsmaster.dto';
import { Lmsmaster } from './entities/lmsmaster.entity';

@Controller('lmsmaster')
export class LmsmasterController {
  constructor(private readonly lmsmasterService: LmsmasterService) { }


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
