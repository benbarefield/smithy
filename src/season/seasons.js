import {CARD_TYPE_JOB, CARD_TYPE_ITEM} from '../constants/cardTypes';
import {CASH, COPPER_BIT, FARM_TOOL, MISSHAPEN} from "../constants/cardModifiers";

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

let CARD_ID = 1;
const seasonEventGenerator = {
    [seasons.SPRING.name]: springEventGenerator,
    [seasons.SUMMER.name]: summerEventGenerator,
    [seasons.AUTUMN.name]: autumnEventGenerator,
    [seasons.WINTER.name]: winterEventGenerator
};
function springEventGenerator(statusEffects) {
    const jobId = CARD_ID++; // TODO: probably change to UUID
    return {
        type: CARD_TYPE_JOB,
        jobType: 'repair',
        name: 'Repair job',
        description: 'Fix a Scythe',
        timeLimit: 120 * 1000,
        id: jobId,
        position: 0,
        extendedRequirements: [
            { acceptedModifiers: [FARM_TOOL], rejectedModifiers: [MISSHAPEN], id: 'job_return_1' } // maybe need to link the tool to the job with a modifier? also slot id here is awkward
        ],
        modifiers: [],
        associatedCards: [
            {
                id: CARD_ID++,
                type: CARD_TYPE_ITEM,
                position: 0,
                name: 'Scythe',
                description: 'Scythe',
                modifiers: [FARM_TOOL, MISSHAPEN]
            }
        ],
        pay: [
            { id: CARD_ID++, type: CARD_TYPE_ITEM, position: 0, name: 'Copper Bit', description: 'A copper bit', modifiers: [CASH, COPPER_BIT] },
            { id: CARD_ID++, type: CARD_TYPE_ITEM, position: 0, name: 'Copper Bit', description: 'A copper bit', modifiers: [CASH, COPPER_BIT] }
        ]
    };
}
function summerEventGenerator(statusEffects) {
    return {
        type: CARD_TYPE_TOOL,
        name: 'Adventurer selling goods',
        description: 'An adventurer has arrived at your shop to off load some of what she found on her quests.',
        slots: [
            { id: `buy_adventurer_${CARD_ID++}`, acceptedModifiers: [COPPER_BIT] },
        ],
        sold: {
            id: CARD_ID++,
            type: CARD_TYPE_ITEM,
            position: 0,
            name: 'Scythe',
            description: 'Scythe',
            modifiers: [FARM_TOOL]
        },
        timeLimit: 30 * 1000,
    };
}
function autumnEventGenerator(statusEffects) {
    return null;
}
function winterEventGenerator(statusEffects) {
    return null;
}
