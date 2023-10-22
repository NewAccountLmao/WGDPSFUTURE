/**
 * Basefactor for parameters a and b
 * basefactor = 1/(18000000/(100+minpoints)^2-50)
 * 
 * current basefactor for minpoints = 1
 */
const basefactor = 0.0005832492374192035997815;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @Param {Number} levelCount Current number of levels
 * @returns {Number}
 */
export function score(rank, percent, minPercent, levelCount) {
    const b = (levelCount - 1) * basefactor
    const a = 600 * Math.sqrt(b)

    let score = (a / Math.sqrt((rank - 1) / 50 + b) - 100) *
        ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return round(score);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
