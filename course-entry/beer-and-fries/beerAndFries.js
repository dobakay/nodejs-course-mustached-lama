function isBeer (item) {
    return item.type === 'beer';
}

function isFries (item) {
    return item.type === 'fries';
}

function sortByScore(a, b) {
    if (a.score > b.score) {
        return 1;
    }
    if (a.score < b.score) {
        return -1;
    }
    // a must be equal to b
    return 0;
}


exports.beerAndFries = function (beerAndFriesArray) {
    'use strict';
    var beers = beerAndFriesArray.filter(isBeer),
        fries = beerAndFriesArray.filter(isFries),
        beerFriesCombos = [],
        bestComboSum = 0

    beers.sort(sortByScore);
    fries.sort(sortByScore);

    //building combo matrix
    for (var i = 0; i < beers.length; i++) {
        var temp = [];
        for (var j = 0; j < fries.length; j++) {
            temp.push(fries[j].score * beers[i].score);
        };
        beerFriesCombos.push(temp);
    };

    for (var i = 0; i < beerFriesCombos.length; i++) {
        bestComboSum += beerFriesCombos[i][i];
    };


    return bestComboSum;
}

