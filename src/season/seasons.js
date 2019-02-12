import * as cardTypes from '../cards/constants';

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
    return {
        type: cardTypes.CARD_TYPE_JOB,
        jobType: 'repair',
        name: 'Repair job',
        description: 'Fix a Scythe',
        basePay: 5,
        timeLimit: 120 * 1000,
        id: CARD_ID++,
        associatedCards: [
            {
                id: CARD_ID++,
                type: cardTypes.CARD_TYPE_ITEM,
                name: 'Scythe',
                description: 'Scythe',
                quality: 2,
                maxQuality: 50,
                sharpness: 5
            }
        ]
    };
}
function summerJobGenerator(statusEffects) {
    return null;
}
function autumnJobGenerator(statusEffects) {
    return null;
}
function winterJobGenerator(statusEffects) {
    return null;
}
