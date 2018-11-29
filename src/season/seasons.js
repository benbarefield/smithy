const seasons = {
    'SPRING': { name: 'Spring', className: 'spring' },
    'SUMMER': { name: 'Summer', className: 'summer' },
    'AUTUMN': { name: 'Autumn', className: 'autumn' },
    'WINTER': { name: 'Winter', className: 'winter' }
};

Object.freeze(seasons);
Object.keys(seasons).forEach(k => Object.freeze(seasons[k]));

export let SEASONS = seasons;

export function nextSeason(currentSeasonName) {
    let nextSeasonInfo = followingSeason(currentSeasonName);
    let jobTimes = new Array(determineNumberOfJobs(nextSeasonInfo));
    let sectionLength = Math.floor(60 * 1000 / jobTimes.length);
    for(let i = 0; i < jobTimes.length: ++i) {
        jobTimes[i] = (Math.random() * sectionLength) + (i * sectionLength);
    }
    return {
        time: 60 * 1000,
        info: nextSeasonInfo,
        jobGenerator: jobGeneratorMap[nextSeasonInfo.name],
        jobTimes
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
    return Math.random() < 0.25 ? 1 : 0;
}

const jobGeneratorMap = {
    [seasons.SPRING.name]: springJobGenerator,
    [seasons.SUMMER.name]: summerJobGenerator,
    [seasons.AUTUMN.name]: autumnJobGenerator,
    [seasons.WINTER.name]: winterJobGenerator
};
function springJobGenerator(statusEffects) {
    return null;
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
