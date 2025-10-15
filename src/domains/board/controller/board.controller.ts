import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller({version: '1', path: 'v1/boards'})
export class BoardController {
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getBoards() {
    return { message: 'Boards fetched successfully' };
  }
}