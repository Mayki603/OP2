function makePhrases() {
    const words1 = ["Мій хомяк", "Мій пес", "Мій кіт", "Мій папуга"];
    const words2 = ["любить", "намагається вкрасти", "постійно шукає", "мріє про"];
    const words3 = ["печиво", "салат", "піцу", "яблуко"];

    const random1 = Math.floor(Math.random() * words1.length);
    const random2 = Math.floor(Math.random() * words2.length);
    const random3 = Math.floor(Math.random() * words3.length);                                  
    
    return words1[random1] + " " + words2[random2] + " " + words3[random3];
}

alert(makePhrases());