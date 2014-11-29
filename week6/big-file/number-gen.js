/**
 * Generates a random number between in range [x,y]
 * @param  {[type]} x [description]
 * @param  {[type]} y [description]
 * @return {[type]}   [description]
 */
module.exports = function generateNumber (x , y) {
    return Math.floor(Math.random() * ((y-x)+1) + x);
}
