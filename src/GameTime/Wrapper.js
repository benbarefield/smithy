import rxWrapper from "../rxWrapper";
import View from './View';

function signalMap(dataMap) {
    return {
        paused: dataMap.observables.paused,
        time: dataMap.observables.timeData,
        keyCode: dataMap.observables.whichKeyUp
    };
}

function sinkMap(dataMap) {
    return {
        pauseButton: dataMap.subjects.pauseButton
    }
}

export default rxWrapper(View, signalMap, sinkMap)