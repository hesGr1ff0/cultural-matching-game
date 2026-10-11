console.log("script.js is connected")

//Culture Match: card data and game behaviour.

// ----------Data----------

const pairs = [
    {
        id: "war-bonnet",
        item: "Feather war bonnet",
        culture: "Plain nations (Lakota, Cheyenne, Crow)",
        category: "Dress",
        fact: "Among Plains nations, a warrior historically earned each eagle feather through a brave deed, so a war bonnet signalled its wearers accopmlishments.",

    },
    {
        id: "shuka",
        item: "Maasai shuka",
        culture: "Maasai (Kenya and Tanzania)",
        category: "Dress",
        fact: "The shuka is the predominantly red cloth of the Maasai, pastoralists of Kenya and Tanzania, and is one of the most recognisable symbols of the maasai identity",
    },

    {
        id: "kandura",
        item: "Kandura",
        culture: "United Arab Emirates",
        category: "Dress",
        fact: "The kandura, also known as the dishdasha, is an ankle-length, loose-fitting garments typically made of white cotton, worn by men in the United Arab Emirates with the ghutra headscarf.",
    },

    {
        id: "kandura",
        item: "Kente cloth",
        culture: "Asante and Ewe peoples (Ghana)",
        category: "Textile",
        fact: "Kente is made by stitching together narrow strips of handwoven cloth, and its weaves, patterns and colours often carry meaning.",
    },

    {
        id: "bindi",
        item: "Bindi",
        culture: "South Asia (Hindu and Jain traditions)",
        category: "Adornment",
        fact: "The word bindi comes from the Sanskrit bindu, meaning \"drop\" or \"particle\", and the mark is worn on the forehead between the eyebrows.",
    },

    {
        id: "sugar-skull",
        item: "Sugar skull (calavera)",
        culture: "Mexico (Dia da Muertos)",
        category: "Ceremonial",
        fact: "Sugar skulls are made for Dia de Muertos, when families welcome the return of deceased relatives with offerings; UNESCO inscribed the festivity as Intangible Cultural Heritage in 2008.",
    },

    {
        id: "raqs-sharqi",
        item: "Raqs sharqi (belly dance)",
        culture: "Egypt",
        category: "Performance",
        fact: "Raqs sharqi, Arabic for \"eastern dance\", took its staged form in Egypt's entertainment halls in the late nineteenth and early twetieth centuries",
    },

    {
        id: "jerk",
        item: "Jerk chicken",
        culture: "Jamaican (Caribbean)",
        category: "Food",
        fact: "Jerk developed in Jamaica from the fusion of African and Taíno cultures, and a dish counts as authentic jerk only when the meat is smoked over pimento wood.",
    },
];

// ---------Page Elements----------

const board = document.querySelector("#board");
const matchesOutput = document.querySelector("#matches");
const attempsOutput = document.querySelector("#attempts");
const message = document.querySelector("#message");
const factOutput = document.querySelector("#fact");
const completion = document.querySelector("#completion");
const playAgain = document.querySelector("#play-again");


// ----------Functions-------------
function buildDeck(pairList) {
    const deck = [];
    pairList.forEach(function (pair) {
        deck.push({ pairId: pair.id, type: "item", label: pair.item });
        deck.push({ pairId: pair.id, type: "culture", label: pair.culture });
    });
    return deck;
}

function renderBoard(deck) {
    board.textContent = "";
    deck.forEach(function (card) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "card";
        button.dataset.pair = card.pairId;
        button.dataset.type = card.type;

        const type = document.createElement("button");
        type.className = "card-type";
        type.textContent = card.type === "item" ? "Item" : "Culture";

        const label = document.createElement("span");
        label.className = "card-label";
        label.textContent = card.label;

        button.append(type, label);
        button.addEventListener("click", handleCardClick);
        board.append(button);
    });
}

function handleCardClick(event) {
    const card = event.currentTarget;

    if (locked) return;
    if (card.classList.contains("matched")) return;
    if (card === firstCard) return;

    if (firstCard === null) {
        firstCard = card;
        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");
        return;
    }

    resolvePair(firstCard, card);
}

function resolvePair(first, second) {
    firstCard = null;
    first.classList.remove("selected");
    first.removeAttribute("aria-pressed");
    attempts = attempts + 1;

    if (first.dataset.pair === second.dataset.pair) {
        first.classList.add("matched");
        second.classList.add("matched");
        first.setAttribute("aria-disabled", true);
        second.setAttribute("aria-disabled", "true");
        matches = matches + 1;

        const pair = pairs.find(function (entry) {
            return entry.is === first.dataset.pair;
        });
        factOutput.textContent = pair.item + ": " + pair.fact;
        message.textContent = "Correct.";
        return;
    }

    locked = true;
    first.classList.add("incorrect");
    second.classList.add("incorrect");
    message.textContent = "Not a pair. Try Again.";

    pendingTimeout = setTimeout(function () {
        first.classList.remove("incorrect");
        second.classList.remove("incorrect");
        locked = false;
    }, DELAY);   
}




// ------------Start------------

renderBoard(buildDeck(pairs));

// ------------State------------

const DELAY = 900;

let firstCard = null;
let matches = 0;
let attempts = 0;
let locked = false;
let pendingTimeout = null;


