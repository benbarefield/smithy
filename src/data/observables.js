import {combineLatest, concat, from, fromEvent, merge } from "rxjs";
import {map, scan, share} from "rxjs/operators";
import { nextSeason } from '../season/seasons';

export let whichKeyUp = (subjects, observables) =>
    concat(from([false]), fromEvent(window, 'keyup'))
        .pipe(map(e => e.which), share());

// required observables: whichKeyUp
const SPACE_BAR = 32;
export let gameSpeed = (subjects, observables) =>
    merge(observables.whichKeyUp, subjects.timeButton)
        .pipe(scan((gameSpeed, subjectValue) => {
            if(subjectValue && subjectValue.speed !== undefined) { return subjectValue.speed; }
            if(subjectValue === SPACE_BAR) { return gameSpeed === 0 ? 1 : 0; }
            return gameSpeed;
        }, 1), share());

// required observables: gameSpeed
export let timeData = (subjects, observables) =>
    combineLatest(subjects.timeTracker, observables.gameSpeed)
        .pipe(scan((time, [timeData, gameSpeed]) => {
            const speed = (gameSpeed === null || gameSpeed === undefined) ? 1 : gameSpeed;
            const elapsed = timeData.elapsed * speed;
            return {
                elapsed,
                total: time.total + elapsed
            };
        }, { elapsed: 0, total: 0 }), share());

// required observables: timeData
export let season = (subjects, observables) =>
    observables.timeData
    .pipe(scan((data, time) => {
        let remaining = data.time - time.elapsed;
        if(remaining <= 0) {
            return nextSeason(data.info.name);
        }
        return Object.assign({}, data, {time : remaining});
    }, nextSeason()), share());

export let jobs = (subjects, observables) =>
    combineLatest(observables.season, observables.timeData)
    .pipe(scan((jobList, [season, gameTime]) => { // happening twice because season ticks and timeData ticks...
        let nextJobTime = season.jobTimes.find(t => t > season.time && t < season.time + gameTime.elapsed); // season time counts down
        let nextJobList = jobList.filter(j => j.startTime + j.timeLimit > gameTime.total);
        if(nextJobTime) {
            let newJob = season.jobGenerator();
            if(newJob) {
                newJob.startTime = gameTime.total;
                nextJobList.push(newJob);
            }
        }
        return nextJobList;
    }, []));

// export let jobs2 = (subjects, observables) =>

