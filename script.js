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

    if (card === firstCard) return;

    if (firstCard === null) {
        firstCard = card;
        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");
        return;
    }

    const isPair = firstCard.dataset.pair === card.dataset.pair;
    console.log(firstCard.dataset.pair, "+", card.dataset.pair, "=", isPair ? "pair" : "not a pair");

    firstCard.classList.remove("selected");
    firstCard.removeAttribute("aria-pressed");
    firstcard = null;
}

// ------------Start------------

renderBoard(buildDeck(pairs));

// ------------State------------

let firstCard = null;
