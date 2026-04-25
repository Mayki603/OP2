function asyncMapCallback(items, handler, done) {
    let results = [];
    let processed = 0;

    for (let i = 0; i < items.length; i++) {
        setTimeout(() => {
            handler(items[i], result => {
                results[i] = result; 
                processed++;

                if (processed === items.length) {
                    done(results);
                }
            });
        }, 200);
    }
}

asyncMapCallback(
    [1, 2, 3],
    (value, cb) => cb(value * 10),
    result => console.log(result)
);

function asyncMap(items, handler, signal) {
    return new Promise((resolve, reject) => {
        let results = [];
        let processed = 0;

        if (items.length === 0) {
            resolve([]);
            return;
        }

        if (signal && signal.aborted) {
            reject(new Error('aborted'));
            return;
        }

        if (signal) {
            signal.addEventListener('abort', () => {
                reject(new Error('aborted'));
            });
        }

        for (let i = 0; i < items.length; i++) {
            handler(items[i]).then(result => {
                if (signal && signal.aborted) {
                    return;
                }

                results[i] = result;
                processed++;

                if (processed === items.length) {
                    resolve(results);
                }
            }).catch(err => {
                reject(err);
            });
        }
    });
}

async function runDemo() {
    let controller = new AbortController();
    
    try {
        let res = await asyncMap(
            [10, 20, 30],
            async (val) => {
                return new Promise(r => setTimeout(() => r(val * 2), 100));
            },
            controller.signal
        );
        console.log(res);
    } catch (e) {
        console.log(e.message);
    }
}

runDemo();
