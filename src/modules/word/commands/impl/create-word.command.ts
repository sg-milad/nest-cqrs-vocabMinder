import { CreateWordRequestDto } from "../../dto";

export class CreateWordCommand {
    constructor(
        public readonly userId: string,
        public readonly createWordRequestDto : CreateWordRequestDto
    ){}
}