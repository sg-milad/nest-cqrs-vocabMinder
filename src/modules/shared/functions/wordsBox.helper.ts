import { WordsBoxEntity } from "@src/entities";
import { EntityManager, FindOptionsRelations, FindOptionsWhere } from "typeorm";

export const GetWordsBox = async (
    manager: EntityManager,
    where: FindOptionsWhere<WordsBoxEntity>,
    relations: FindOptionsRelations<WordsBoxEntity> = {}
) => {
    const wordsBox = await manager.findOne(WordsBoxEntity, {
        where,
        relations: {
            ...relations
        },
    })
    return wordsBox
}