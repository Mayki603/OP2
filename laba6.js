async function* dataStreamGenerator(totalItems) {
    for (let i = 1; i <= totalItems; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        yield i; 
    }
}