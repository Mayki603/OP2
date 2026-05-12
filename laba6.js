async function* dataStreamGenerator(totalItems) {
    for (let i = 1; i <= totalItems; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        yield i; 
    }
}

async function processLargeData(stream) {
    let processedCount = 0;
    let sum = 0;

    try {
        for await (let chunk of stream) {
            sum += chunk;
            processedCount++;
            
            if (processedCount % 5 === 0) {
                console.log('Processed items:', processedCount, '| Current sum:', sum);
            }
        }
        console.log('Finished. Total items processed:', processedCount, '| Final sum:', sum);
    } catch (error) {
        console.error('An error occurred while processing the stream:', error.message);
    }
}

async function runDemo6() {
    console.log('Starting data stream processing...');
    let myStream = dataStreamGenerator(20);
    await processLargeData(myStream);
}

runDemo6();