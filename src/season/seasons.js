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
        let newJob = jobGeneratorMap[nextSeasonInfo.name]();
        if(newJob) {
            newJob.seasonStartTime = jobTimes[i];
            newJob.completionTime = (currentTime + ((60 * 1000) - jobTimes[i])) + newJob.timeLimit; //jobTimes are calculated from a count down
            jobs.push(newJob);
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
const jobGeneratorMap = {
    [seasons.SPRING.name]: springJobGenerator,
    [seasons.SUMMER.name]: summerJobGenerator,
    [seasons.AUTUMN.name]: autumnJobGenerator,
    [seasons.WINTER.name]: winterJobGenerator
};
function springJobGenerator(statusEffects) {
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
function summerJobGenerator(statusEffects) {
    // const jobId = CARD_ID++; // TODO : UUID?
    // return {
    //     type: CARD_TYPE_JOB,
    //     jobType: 'buy',
    //     name: 'Adventurer selling goods',
    //     description: 'An adventurer has arrived at your shop to off load some of what she found on her quests.',
    //     basePay: 0,
    //     timeLimit: 20 * 1000,
    //     id: jobId,
    //     position: 0,
    //     extendedRequirements: [],
    //     modifiers: []
    // }
    return null;
}
function autumnJobGenerator(statusEffects) {
    return null;
}
function winterJobGenerator(statusEffects) {
    return null;
}
