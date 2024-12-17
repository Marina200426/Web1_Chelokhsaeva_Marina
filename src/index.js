/* Задание 8, Номер 1 */


function pickPropArray(objectsArray, property) {
    const result = [];

    for (let i = 0; i < objectsArray.length; i++) {
        if (objectsArray[i].hasOwnProperty(property)) {
            result.push(objectsArray[i][property]);
        }
    }

    return result;
}

const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
];

const result = pickPropArray(students, 'name');

console.log(result);



/* Задание 8, Номер 2 */


function createCounter() {
    let count = 0;
    return function () {
        count += 1;
        console.log(count);
        return count;
    };
}

const counter1 = createCounter();
counter1(); // 1
counter1(); // 2

const counter2 = createCounter();
counter2(); // 1
counter2(); // 2



/* Задание 8, Номер 3 */


function spinWords(str) {
    const words = str.split(' ');

    let result = '';

    for (let i = 0; i < words.length; i++) {
        if (words[i].length >= 5) {
            result += words[i].split('').reverse().join('') + ' ';
        } else {
            result += words[i] + ' ';
        }
    }

    return result;
}

const result1 = spinWords("Привет от Legacy")
console.log(result1) // тевирП от ycageL

const result2 = spinWords("This is a test")
console.log(result2) // This is a test



/* Задание 8, Номер 4 */

function findTwoSum(nums, target) {
    const pairs = {};

    for (let i = 0; i < nums.length; i++) {
        if (pairs.hasOwnProperty(target - nums[i])) {
            return [pairs[target - nums[i]], i];
        }
        pairs[nums[i]] = i;
    }

    return [];
}


/* Задание 8, Номер 5 */

function longestCommonSuffix(strs) {
    if (!strs || strs.length < 2) {
        return "";
    }

    const minLength = Math.min(...strs.map(s => s.length));
    if (minLength < 2) {
        return "";
    }

    let suffix = "";
    for (let i = 1; i <= minLength; i++) {

        const currentSuffix = strs[0].slice(-i);
        if (strs.every(s => s.endsWith(currentSuffix))) {
            if (currentSuffix.length >= 2) {
                suffix = currentSuffix;
            }
        } else {
            break;
        }
    }

    return suffix;
}


console.log(longestCommonSuffix(["цветок", "поток", "хлопок"])); // Вывод: "ок"
console.log(longestCommonSuffix(["собака", "гоночная машина", "машина"])); // Вывод: ""
