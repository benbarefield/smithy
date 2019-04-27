import UUID from 'uuid/v4';
import {CARD_TYPE_ITEM, CARD_TYPE_JOB, CARD_TYPE_TOOL, TOOL_PURCHASE} from '../constants/cardTypes';
import {CASH, COPPER_BIT, DECONSTRUCTABLE, FARM_TOOL, IRON, MISSHAPEN, WOOD} from "../constants/cardModifiers";

const seasons = {
    'SPRING': { name: 'Spring', className: 'spring' },
    'SUMMER': { name: 'Summer', className: 'summer' },
    'AUTUMN': { name: 'Autumn', className: 'autumn' },
    'WINTER': { name: 'Winter', className: 'winter' }
};

Object.freeze(seasons);
Object.keys(seasons).forEach(k => Object.freeze(seasons[k]));

export let SEASONS = seasons;

export function nextSeason(currentSeasonName, currentTime = 0) {
    let nextSeasonInfo = followingSeason(currentSeasonName);
    let jobTimes = new Array(determineNumberOfJobs(nextSeasonInfo));
    let sectionLength = Math.floor(60 * 1000 / jobTimes.length);
    let jobs = [];
    for(let i = 0; i < jobTimes.length; ++i) {
        // jobTimes[i] = (Math.random() * sectionLength - 1) + (i * sectionLength) + 1; TODO: testing
        jobTimes[i] = 59000;
        let seasonEvent = seasonEventGenerator[nextSeasonInfo.name]();
        if(seasonEvent) {
            seasonEvent.seasonStartTime = jobTimes[i];
            seasonEvent.completionTime = (currentTime + ((60 * 1000) - jobTimes[i])) + seasonEvent.timeLimit; //jobTimes are calculated from a count down
            jobs.push(seasonEvent);
        }
    }
    return {
        time: 60 * 1000,
        info: nextSeasonInfo,
        jobs
    };
}
function followingSeason(currentSeasonName) {
    switch(currentSeasonName) {
        case seasons.SPRING.name: return seasons.SUMMER;
        case seasons.SUMMER.name: return seasons.AUTUMN;
        case seasons.AUTUMN.name: return seasons.WINTER;
        default: return seasons.SPRING;
    }
}
function determineNumberOfJobs(season) {
    // return Math.random() < 0.25 ? 1 : 0; // TODO: testing
    return 1;
}

const seasonEventGenerator = {
    [seasons.SPRING.name]: springEventGenerator,
    [seasons.SUMMER.name]: summerEventGenerator,
    [seasons.AUTUMN.name]: autumnEventGenerator,
    [seasons.WINTER.name]: winterEventGenerator
};
function springEventGenerator(statusEffects) {
    return {
        type: CARD_TYPE_JOB,
        jobType: 'repair',
        name: 'Repair job',
        description: 'Fix a Scythe',
        timeLimit: 120 * 1000,
        id: UUID(),
        position: 0,
        extendedRequirements: [
            { acceptedModifiers: [FARM_TOOL], rejectedModifiers: [MISSHAPEN], id: 'job_return_1' } // maybe need to link the tool to the job with a modifier? also slot id here is awkward
        ],
        modifiers: [],
        associatedCards: [
            {
                id: UUID(),
                type: CARD_TYPE_ITEM,
                position: 0,
                name: 'Scythe',
                description: 'Scythe',
                modifiers: [FARM_TOOL, MISSHAPEN, WOOD, IRON, DECONSTRUCTABLE],
            }
        ],
        pay: [
            { id: UUID(), type: CARD_TYPE_ITEM, position: 0, name: 'Copper Bit', description: 'A copper bit', modifiers: [CASH, COPPER_BIT] },
            { id: UUID(), type: CARD_TYPE_ITEM, position: 0, name: 'Copper Bit', description: 'A copper bit', modifiers: [CASH, COPPER_BIT] }
        ]
    };
}
function summerEventGenerator(statusEffects) {
    let id = UUID();
    return {
        id,
        type: CARD_TYPE_TOOL,
        toolType: TOOL_PURCHASE,
        name: 'Adventurer selling goods',
        description: 'An adventurer has arrived at your shop to off load some of what she found on her quests.',
        position: 0,
        slots: [
            { id: `buy_adventurer_${id}`, acceptedModifiers: [COPPER_BIT] },
        ],
        sold: {
            id: UUID(),
            type: CARD_TYPE_ITEM,
            position: 0,
            name: 'Scythe',
            description: 'Scythe',
            modifiers: [FARM_TOOL]
        },
        timeLimit: 30 * 1000,
        dataSelector: dataMap => {}
    };
}
function autumnEventGenerator(statusEffects) {
    return null;
}
function winterEventGenerator(statusEffects) {
    return null;
}
