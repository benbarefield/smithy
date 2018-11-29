const seasons = {
    'SPRING': { name: 'Spring', className: 'spring' },
    'SUMMER': { name: 'Summer', className: 'summer' },
    'AUTUMN': { name: 'Autumn', className: 'autumn' },
    'WINTER': { name: 'Winter', className: 'winter' }
};

Object.freeze(seasons);
Object.keys(seasons).forEach(k => Object.freeze(seasons[k]));

export default seasons;