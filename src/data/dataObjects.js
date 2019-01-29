import * as subjectProducers from './subjects';
import * as observableProducers from './observables';

export default function(add) {
    Object.keys(subjectProducers).forEach(key => add(key, subjectProducers[key]));
    Object.keys(observableProducers).forEach(key => add(key, observableProducers[key]));
}