import rxWrapper from "../rxWrapper";
import View from './View';

function signalMap(dataMap) {
    return {
        paused: dataMap.observables.paused
    };
}

function sinkMap(dataMap) {
    return {
        pauseButton: dataMap.subjects.pauseButton
    }
}

export default rxWrapper(View, signalMap, sinkMap)