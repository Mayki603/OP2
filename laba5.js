function asyncFilterCallback(items, handler, done) {
    let passed = [];
    let processed = 0;

    for (let i = 0; i < items.length; i++) {
        setTimeout(() => {
            handler(items[i], result => {

                if (result) {
                    passed.push(items[i]);
                }

                processed++;

                if (processed === items.length) {
                    done(passed);
                }

            });
        }, 200);
    }
}


asyncFilterCallback(
    [1, 2, 3, 4, 5],
    (value, cb) => cb(value % 2 === 0),
    result => console.log(result)
);
