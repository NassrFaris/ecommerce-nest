import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image',{
    storage:diskStorage({
      destination:'./uploads/categories',
      filename:(req,file,callback)=>{
        const uniquName=Date.now()+'-'+Math.round(Math.random()*1E9);
        const ext=extname(file.originalname);
        callback(null,`${uniquName}${ext}`);
      }
    })
  }))
  create(@Body() createCategoryDto: CreateCategoryDto,@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({maxSize:5*1024*1024}),
      ],
      fileIsRequired:false,

  }),
  ) 
  Image?: Express.Multer.File,
){
    return this.categoryService.create(createCategoryDto,Image);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
