const HEXAGRAM = document.getElementsByClassName("hexagram")[0];

const TEXT = HEXAGRAM.innerHTML;
HEXAGRAM.innerHTML = "";

const TEXT_WIDTH = TEXT.split("\n").reduce((longest, line) => line.length > longest ? line.length : longest, 0);
const LAST_LINE_START_POS = TEXT.lastIndexOf("\n");

let delay = (time) => new Promise(resolve => setTimeout(resolve, time));
let random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

let typeOut = async () => {
    const SPACER_LINE = "\n" + " ".repeat(TEXT_WIDTH);

    for (let i = 0; i < TEXT.length; i++) {
        if (TEXT[i] === " " || TEXT[i] === "\n")
            continue;

        HEXAGRAM.innerHTML = TEXT.substring(0, i) + (i > LAST_LINE_START_POS ? "" : SPACER_LINE);

        await delay(random(5, 18));
    }

    HEXAGRAM.innerHTML = TEXT;
};

const COLORS = ["red", "green", "blue"];

let startGlitching = async () => {
    let duplicates = [];

    for (let i = 0; i < 3; ++i) {
        let duplicate = HEXAGRAM.cloneNode(true);
        duplicate.style.color = COLORS[i];
        duplicate.style.opacity = 0.8;

        document.body.appendChild(duplicate);
        duplicates[i] = duplicate;
    }

    while (true) {
        HEXAGRAM.style.opacity = 0;
        duplicates.forEach(duplicate => {
            duplicate.style.opacity = 1;
            duplicate.innerHTML = HEXAGRAM.innerHTML;
        });

        for (let i = 0; i < random(4, 82); ++i) {
            duplicates.forEach(duplicate => 
                duplicate.style.transform = `translate(-${random(42, 58)}%, -${random(42, 58)}%)`);

            await delay(random(1, 16));
        }
        
        duplicates.forEach(duplicate => duplicate.style.opacity = 0);
        HEXAGRAM.style.opacity = 1;

        await delay(random(400, 4500));
    }
};

let startRandomReplacements = async () => {
    while (true) {
        let text = HEXAGRAM.innerHTML;
        let randomIndex = random(0, TEXT.length);

        if (text[randomIndex] === " "
            || text[randomIndex] === "."
            || text[randomIndex] === "\n")
            continue;

        HEXAGRAM.innerHTML = text.substring(0, randomIndex)
            + String.fromCharCode(random(33, 126))
            + text.substring(randomIndex + 1);

        await delay(random(5, 18));
    }
};

(async () => {
    HEXAGRAM.style.color = "rgb(220, 220, 220)";

    await typeOut();

    await delay(1000);

    startGlitching();
    startRandomReplacements();
})();