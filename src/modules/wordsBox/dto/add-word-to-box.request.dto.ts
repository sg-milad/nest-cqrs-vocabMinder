import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID } from "class-validator";

export class AddWordToBoxRequestDto {
    @ApiProperty({ isArray: true})
    @IsArray({always: true,})
    ids: string [];
}