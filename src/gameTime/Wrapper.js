import rxWrapper from "../rxWrapper";
import View from './View';

function signalMap(gameSpeed) {
    return { gameSpeed };
}

function sinkMap(gameSpeed, timeButton) {
    return { timeButton };
}

export default rxWrapper(View, ['gameSpeed', 'timeButton'], signalMap, sinkMap)