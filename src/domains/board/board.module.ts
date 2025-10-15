import { Module } from "@nestjs/common";
import { BoardController } from "./controller/board.controller";

@Module({
  imports: [],
  controllers: [BoardController],
  providers: [],
  exports: [],
})
export class BoardModule {}