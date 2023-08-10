import { UpdateWordRequestDto } from "../../dto/update-word.request.dto";

export class UpdateWordCommand {
    constructor(
        public readonly wordId: string,
        public readonly userId:string,
        public readonly updateWordRequestDto : UpdateWordRequestDto
    ){}
}