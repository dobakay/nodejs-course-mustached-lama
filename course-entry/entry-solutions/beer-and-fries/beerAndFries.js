function isBeer (item) {
    return item.type === 'beer';
}

function isFries (item) {
    return item.type === 'fries';
}

exports.beerAndFries = function (beerAndFriesArray) {
    'use strict';
    var beers = beerAndFriesArray.filter(isBeer),
        fries = beerAndFriesArray.filter(isFries),
        bestBeerFriesCombo = 0;

    for (var i = 0; i < beers.length; i++) {
        for (var j = 0; j < fries.length; j++) {
            if(fries[j].score * beers[i].score > bestBeerFriesCombo) {
                bestBeerFriesCombo = fries[j].score * beers[i].score;
            }
        };
    };
    console.log(bestBeerFriesCombo);
    return bestBeerFriesCombo;
}

