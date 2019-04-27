import {IRON, WOOD} from "../constants/cardModifiers";
import UUID from 'uuid/v4';
import {CARD_TYPE_RESOURCE} from "../constants/cardTypes";

export default function deconstruct(card) {
    return card.modifiers.map(m => deconstructModifier(m)).filter(c => !!c);
}

function deconstructModifier(modifier) {
    if(!modifier || !deconstruction[modifier.description]) return null;
    return deconstruction[modifier.description]();
}

const deconstruction = {
    [WOOD.description]: () => Math.random() > 1 ? null : {
        id: UUID(),
        type: CARD_TYPE_RESOURCE,
        position: 0,
        name: "Wood",
        description: "A bit of wood",
        modifiers: [WOOD]
    },
    [IRON.description]: () => Math.random() > 0.6 ? null : {
        id: UUID(),
        type: CARD_TYPE_RESOURCE,
        position: 0,
        name: 'Iron',
        description: 'A hunk of iron',
        modifiers: [IRON]
    }
};
