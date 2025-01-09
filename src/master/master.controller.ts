import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) { }


  @Get('DM_sp_GetUserDetailsByUserId/:nUserId')
  async DM_sp_GetUserDetailsByUserId(
    @Param('nUserId') nUserId: number,
  ): Promise<any> {
    const data = await this.masterService.DM_sp_GetUserDetailsByUserId(nUserId);
    console.log("data",data);
    return data;
  }

  @Get('DM_sp_GetUserDetailsUsingUNandPW/:vUserName/:vPassword/:vDeviceId')
  async DM_sp_GetUserDetailsUsingUNandPW(
    @Param('vUserName') vUserName: string,
    @Param('vPassword') vPassword: string,
    @Param('vDeviceId') vDeviceId: string,
  ): Promise<any> {
    return await this.masterService.DM_sp_GetUserDetailsUsingUNandPW(vUserName, vPassword, vDeviceId);
  }


  @Get('DM_sp_CategoryMaster_SelectAll_Active')
  async DM_sp_CategoryMaster_SelectAll_Active(): Promise<any> {
    const data = await this.masterService.DM_sp_CategoryMaster_SelectAll_Active();
    console.log("data", data);
    return data;
  }
  

  @Get('DM_sp_ItemMaster_SelectAll_Active')
  async DM_sp_ItemMaster_SelectAll_Active(): Promise<any> {
    const data = await this.masterService.DM_sp_ItemMaster_SelectAll_Active();
    console.log("data", data);
    return data;
  }

  
  @Get('DM_sp_TableMaster_SelectAll_Active')
  async DM_sp_TableMaster_SelectAll_Active(): Promise<any> {
    const data = await this.masterService.DM_sp_TableMaster_SelectAll_Active();
    console.log("data", data);
    return data;
  }

  @Get('DS_sp_UserMaster_SelectAllActive')
  async DS_sp_UserMaster_SelectAllActive(): Promise<any> {
    const data = await this.masterService.DS_sp_UserMaster_SelectAllActive();
    console.log("data", data);
    return data;
  }



  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Get()
  findAll() {
    return this.masterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.masterService.update(+id, updateMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterService.remove(+id);
  }
}
