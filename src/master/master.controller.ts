import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { UserDto } from './dto/user.dto';
import { CategoryDto, RoleDto, TableDto } from './entities/master.entity';

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




  @Get('DM_sp_ItemMaster_SelectAll_Active')
  async DM_sp_ItemMaster_SelectAll_Active(): Promise<any> {
    const data = await this.masterService.DM_sp_ItemMaster_SelectAll_Active();
    console.log("data", data);
    return data;
  }

  
 

  @Get('UserMaster_SelectAll_Active')
  async UserMaster_SelectAll_Active(): Promise<any> {
    const data = await this.masterService.UserMaster_SelectAll_Active();
    console.log("data", data);
    return data?.recordset;
  }

  @Post('')
  async insertUser(@Body() userData: UserDto): Promise<any> {
    const data = await this.masterService.insertUser(userData);
    console.log('User inserted:', data);
    return data;
  }

  @Put('')
  async updateUser(@Body() userData: UserDto): Promise<any> {
    const data = await this.masterService.updateUser(userData);
    console.log('User updated:', data);
    return data;
  }


  @Get('DM_sp_TableMaster_SelectAll_Active')
  async DM_sp_TableMaster_SelectAll_Active(): Promise<any> {
    const data = await this.masterService.DM_sp_TableMaster_SelectAll_Active();
    console.log("data", data);
    return data;
  }

  @Post('insertTable')
  async insertTable(@Body() tableData: TableDto): Promise<any> {
    const data = await this.masterService.insertTable(tableData);
    console.log('Table inserted:', data);
    return data;
  }

  @Put('updateTable')
  async updateTable(@Body() tableData: TableDto): Promise<any> {
    const data = await this.masterService.updateTable(tableData);
    console.log('Table updated:', data);
    return data;
  }

  @Get('DM_sp_RoleMaster_SelectAllActive')
  async DM_sp_RoleMaster_SelectAllActive(): Promise<any> {
    const data = await this.masterService.DM_sp_RoleMaster_SelectAllActive();
    console.log("data", data);
    return data;
  }
  
  @Post('DM_sp_RoleMaster_Insert')
  async DM_sp_RoleMaster_Insert(@Body() tableData: RoleDto): Promise<any> {
    const data = await this.masterService.DM_sp_RoleMaster_Insert(tableData);
    console.log('Table inserted:', data);
    return data;
  }

  @Put('DM_sp_RoleMaster_Update')
  async DM_sp_RoleMaster_Update(@Body() tableData: RoleDto): Promise<any> {
    const data = await this.masterService.DM_sp_RoleMaster_Update(tableData);
    console.log('Table updated:', data);
    return data;
  }



  @Get('DM_sp_CategoryMaster_SelectAll_Active')
  async DM_sp_CategoryMaster_SelectAll_Active(): Promise<any> {
    const data = await this.masterService.DM_sp_CategoryMaster_SelectAll_Active();
    console.log("data", data);
    return data;
  }
  
  

  @Post('DM_sp_CategoryMaster_Insert')
  async DM_sp_CategoryMaster_Insert(@Body() tableData: CategoryDto): Promise<any> {
    const data = await this.masterService.DM_sp_CategoryMaster_Insert(tableData);
    console.log('Table inserted:', data);
    return data;
  }

  @Put('DM_sp_CategoryMaster_Update')
  async DM_sp_CategoryMaster_Update(@Body() tableData: CategoryDto): Promise<any> {
    const data = await this.masterService.DM_sp_CategoryMaster_Update(tableData);
    console.log('Table updated:', data);
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
