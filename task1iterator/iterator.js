function* numbers() {
    while (true) {
        yield Math.floor(Math.random() * 100) + 1;
    }
}

function runWithTimeout(iterator, seconds) {
    let sum = 0;
    let count = 0;

    const id = setInterval(function () {
        const value = iterator.next().value;

        sum += value;
        count++;

        console.log("Number:", value);
        console.log("Total:", sum);
        console.log("Average:", (sum / count).toFixed(2));
        console.log("-----");

    }, 1000);

    setTimeout(function () {
        clearInterval(id);
        console.log("Time is over");
    }, seconds * 1000);
}

const gen = numbers();
runWithTimeout(gen, 5);