// Define the functions within an object
const arrayFunctions = {
  sumAdjacentNumbers (stringArray) {
    let i = 0;
    while (i < stringArray.length - 1) {
      let currentNum = parseFloat(stringArray[i]);
      let nextNum = parseFloat(stringArray[i + 1]);
      if (!isNaN(currentNum) && !isNaN(nextNum)) {
        stringArray[i] = (currentNum + nextNum).toString();
        stringArray.splice(i + 1, 1);
      } else {
        i++;
      }
    }
    return stringArray;
  },

  concatenateNonNumbers (stringArray) {
    let i = stringArray.length - 2;
    while (i >= 0) {
      let canConvertI = !isNaN(parseFloat(stringArray[i]));
      let canConvertINext = !isNaN(parseFloat(stringArray[i + 1]));
      if (!canConvertI && !canConvertINext) {
        stringArray[i] = stringArray[i] + stringArray[i + 1];
        stringArray.splice(i + 1, 1);
      }
      i--;
    }
    return stringArray;
  },

  reverseHalves (array) {
    const midPoint = Math.floor(array.length / 2);
    const firstHalfReversed = array.slice(0, midPoint).reverse();
    const secondHalfReversed = array.slice(midPoint).reverse();
    return firstHalfReversed.concat(secondHalfReversed);
  },
};

// Export the object
module.exports = arrayFunctions
