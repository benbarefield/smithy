import rxWrapper from "../rxWrapper";
import View from './View';

function signalMap(dataMap) {
    return {
        gameSpeed: dataMap.observables.gameSpeed
    };
}

function sinkMap(dataMap) {
    return {
        timeButton: dataMap.subjects.timeButton
    }
}

export default rxWrapper(View, signalMap, sinkMap)