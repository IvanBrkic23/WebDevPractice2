import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Administrator } from "entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { ApiResponse } from "src/services/administrator/misc/api.response.class";

@Controller('api/administrator')
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
        ) {}
        // GET http://localhost:3000/api/administrator/
        @Get()
        getAll(): Promise<Administrator[]> {
          return this.administratorService.getAll();
        }
        // GET http://localhost:3000/api/administrator/4 : ID/
        @Get(':id') 
        getById(@Param('id') administratorId: number): Promise<Administrator | ApiResponse> {
          return new  Promise (async (resolve) =>{
            let admin = await this.administratorService.getById(administratorId);
            if (admin === undefined) {
               resolve(new ApiResponse('error', -1002));
              }
              resolve(admin);
          });
        }
        // PUT http://localhost:3000/api/administrator/
        @Put()
        add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
          return this.administratorService.add(data);
        }
      // POST http://localhost:3000/api/administrator/4/
        @Post(':id')
        edit(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
          return this.administratorService.editById(id, data);
      }
}