import rxWrapper from '../rxWrapper';
import View from './ToolView';

function signalMap() {
    return {
        // toolData: dataMap.observable
    };
}

function sinkMap() {
    return {
        // sink: dataMap.sink
    };
}

export default rxWrapper(View, [], signalMap, sinkMap);