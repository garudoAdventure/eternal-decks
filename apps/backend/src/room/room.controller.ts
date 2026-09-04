import { Body, Controller, Get, Post} from "@nestjs/common";
import { RoomService } from "./room.service";
import { CreateRoomPayload } from "@shared/types";

@Controller('room')
export class RoomController {
  constructor(
    private roomService: RoomService
  ){}

  @Post()
  createRoom(
    @Body() payload: CreateRoomPayload
  ) {
    return this.roomService.createRoom(payload);
  }
}