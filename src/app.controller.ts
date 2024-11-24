import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'
import * as path from 'path'
import { IParamBookId } from './interfaces/paramBookId';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getRoot(
  //   @Query() { bookId }: IParamBookId,
  //   @Res() res: Response): any
  // {
  //   console.log(`@Get()`)
  //   console.log(`bookId = ${bookId}`)
  //   let mypath = path.join(__dirname, '..', 'public', 'index.html')
  //   console.log(mypath)
  //   res.sendFile(mypath)  
  // }

  @Get(':bookId')
  getRootById(
    @Param() { bookId }: IParamBookId,
    @Res() res: Response): any
  {
    console.log(`@Get(':bookId')`)
    console.log(`bookId = ${bookId}`)
    let mypath = path.join(__dirname, '..', 'public', 'index.html')
    console.log(mypath)
    res.sendFile(mypath)
  }
}
