function sumAdjacentNumbers(stringArray) {
    
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

    console.log(444);
    console.log(stringArray);
    return stringArray;
}

function concatenateNonNumbers(stringArray) {
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
}

function reverseHalves(array) {
    const midPoint = Math.floor(array.length / 2);
    const firstHalfReversed = array.slice(0, midPoint).reverse();
    const secondHalfReversed = array.slice(midPoint).reverse();
    return firstHalfReversed.concat(secondHalfReversed);
}

function printExampleUsage() {
    const originalArray = ['12', 'hello', 'world', '10.75', '3', 'world', '3.25', 'end'];
    console.log("Original array:", originalArray);

    const processedSum = sumAdjacentNumbers([...originalArray]);
    console.log("After summing adjacent numbers:", processedSum);

    const processedConcat = concatenateNonNumbers([...originalArray]);
    console.log("After concatenating non-numbers:", processedConcat);

    const processedReverse = reverseHalves([...originalArray]);
    console.log("After reversing halves:", processedReverse);
}

printExampleUsage();
