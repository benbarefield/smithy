import rxWrapper from '../rxWrapper';
import View from './ToolView';

function signalMap(dataMap) {
    return {
        toolData: dataMap.observable
    };
}

function sinkMap(dataMap) {
    return {
        sink: dataMap.sink
    };
}

export default rxWrapper(View, signalMap, sinkMap);