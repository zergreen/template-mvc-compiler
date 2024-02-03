// Define the functions within an object
const arrayFunctions = {
  sumAdjacentNumbers(stringArray) {
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

  concatenateNonNumbers(stringArray) {
    let reversedArr = stringArray.slice().reverse();

    // Function to check if a string is numeric
    function isNumeric(s) {
      return !isNaN(parseFloat(s)) && isFinite(s);
    }

    let outputArray = [];
    for (let i = 0; i < reversedArr.length; i++) {
      if (isNumeric(reversedArr[i])) {
        outputArray.push(reversedArr[i]);
      } else {
        // Concatenate nearly elements
        let concatElement = reversedArr[i];
        while (i + 1 < reversedArr.length && !isNumeric(reversedArr[i + 1])) {
          concatElement += reversedArr[i + 1].trim();
          i++;
        }
        outputArray.push(concatElement);
      }
    }
    return outputArray;
  },

  reverseHalves(array) {
    const midPoint = Math.floor(array.length / 2);
    const firstHalfReversed = array.slice(0, midPoint).reverse();
    const secondHalfReversed = array.slice(midPoint).reverse();
    return firstHalfReversed.concat(secondHalfReversed);
  },
};

// Export the object
module.exports = arrayFunctions;
