import * as subjectProducers from './subjects';
import * as observableProducers from './observables';

export default function() {
    const subjects = Object.keys(subjectProducers).reduce((m, k) => {
        m[k] = subjectProducers[k](m);
        return m;
    }, {});
    const observables = Object.keys(observableProducers).reduce((m, k) => {
        m[k] = observableProducers[k](subjects, m);
        return m;
    }, {});

    return { subjects, observables };
}