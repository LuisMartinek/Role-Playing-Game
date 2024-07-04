let xp = 0; /*Step 6*/
let health = 100; /*Step 7*/
let gold = 50; /*Step 7 & 97 & 100*/
let currentWeaponIndex = 0; /*Step 8*/
let fighting; /*Step 9*/
let monsterHealth; /*Step 10*/
let inventory = ["stick"]; /*Step 10*/
const button1 = document.querySelector("#button1"); /*Step 15 & 17*/
const button2 = document.querySelector("#button2"); /*Step 18*/
const button3 = document.querySelector("#button3"); /*Step 18*/
const text = document.querySelector("#text"); /*Step 29*/
const xpText = document.querySelector("#xpText"); /*Step 29*/
const healthText = document.querySelector("#healthText"); /*Step 29*/
const goldText = document.querySelector("#goldText"); /*Step 29*/
const monsterStats = document.querySelector("#monsterStats"); /*Step 29*/
const monsterName = document.querySelector("#monsterName"); /*Step 29*/
const monsterHealthText = document.querySelector("#monsterHealth"); /*Step 30*/
const weapons = [{ // 80
    name: "stick",
    power: 5 
},
{
    name: "dagger",
    power: 30
},
{
    name: "claw hammer",
    power: 50
},
{
    name: "sword",
    power: 100
} // 81
];

const monsters = [{
    name: "slime",
    level: 2,
    health: 15
},
{
    name: "fanged beast",
    level: 8,
    health: 60
},
{
    name: "dragon",
    level: 20,
    health: 300
}

] // 110

const locations = [{
    name: "town square",
    "button text": ["Go to store","Go to cave","Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
}, // Step 48 & 54 & 55 & 56 & 57 & 58
{
    name:"store",
    "button text":["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store." 
}, // Step 59
{
    name:"cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text:"You enter the cave. You see some monsters."
}, // 71
{
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
},// 115
{
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg], // 174
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.' // 135
}, // 134
{
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart], 
    text:"You die. &#x2620;"
}, // 139
{
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
}, // 143
{
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
} // 162
]; // 47 

/*const cat = {
     name: "Whiskers",
     "Number of legs": 4,
}; // Step 48 & 49 & 50 
console.log(cat["Number of legs"]); // Step 48 & 51 & 52 & 53 */

//initialize buttons /*Step 35*/
button1.onclick = goStore;// Step 36
button2.onclick = goCave; // Step 37
button3.onclick = fightDragon; // Step 37

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0]; // 64 & 65
    button2.innerText = location["button text"][1]; // 66 
    button3.innerText = location["button text"][2]; // 66 
    button1.onclick = location["button functions"][0]; // 67
    button2.onclick = location["button functions"][1]; // 67
    button3.onclick = location["button functions"][2]; //67
    text.innerHTML = location.text; // 68 & 141
}// 46 & 60 

function goTown() { 
    update(locations[0]); // Step 61 & 62 & 63

    //before consolidating the code withe the update function
    /*button1.innerText = "Go to store"; 
    button2.innerText = "Go to cave"; 
    button3.innerText = "Fight dragon"; 
    button1.onclick = goStore; 
    button2.onclick = goCave; 
    button3.onclick = fightDragon; 
    text.innerText = "You are in the town square. You see a sign that says \"Store\"."; */
}// 42 & 43 & 44 & 45

function goStore(){
    update(locations[1]); // 69
    //before consolidating the code withe the update function
    /*button1.innerText = "Buy 10 health (10 gold)"; // Step 38
    button2.innerText = "Buy weapon (30 gold)"; // Step 39
    button3.innerText = "Go to town square"; // Step 39
    button1.onclick = buyHealth; // 40
    button2.onclick = buyWeapon; // 40
    button3.onclick = goTown; // 40
    text.innerText = "You enter the store."; // 41 */
}/*Step 31*/



function goCave() {
    update(locations[2]);
}//Step 33 & 72



function buyHealth() {
    if (gold >= 10){ // 77
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
} else { // 78
    text.innerText = "You do not have enough gold to buy health." // 79
}
}// 42 & 73 & 74 & 75 & 76 

function buyWeapon() {
    if (currentWeaponIndex < weapons.length - 1){ // 95 & 96 & 98
        if (gold >= 30){// 82
            gold -= 30; // 83
            currentWeaponIndex ++;// 84 & 85
            goldText.innerText = gold; // 86
            let newWeapon = weapons[currentWeaponIndex].name; // 87 & 88!! & 89
            text.innerText = "You now have a " + newWeapon + "."; // 86 & 90
            inventory.push(newWeapon); // 91
            text.innerText += " In your inventory you have: " + inventory;// 92 & 93
            } else {
                text.innerText = "You do not have enough gold to buy a weapon."; // 94
            }
    } else { // 99
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold"; // 101
        button2.onclick = sellWeapon; // 101
    }
    
}// 42

function sellWeapon (){
    if (inventory.length > 1){ // 103
        gold += 15; // 104
        goldText.innerText = gold; // 104
        let currentWeapon = inventory.shift(); // 105 & 106
        text.innerText = "You sold a " + currentWeapon  + "."; // 107
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!" // 109
    }

}// 102

function fightSlime() {
    fighting = 0;// 112
    goFight(); //112

}// 70


function fightBeast() {
    fighting = 1; 
    goFight();

}//70 & 113

function fightDragon() {
    fighting = 2;
    goFight();
} /*Step 34 & 113*/

function goFight (){
    update(locations[3]); // 116
    monsterHealth = monsters[fighting].health; // 117
    monsterStats.style.display = 'block'; // 118
    monsterName.innerText = monsters[fighting].name; // 119
    monsterHealthText.innerText = monsters[fighting].health; // 119
}//111

function attack (){
    text.innerText = "The " + monsters[fighting].name + " attacks."; // 120
    text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + "."; // 121
    health -= getMonsterAttackValue(monsters[fighting].level); // 122 & 144
    if (isMonsterHit()){ // 150
        monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1; // 123 & 124 & 151
    } else {
        text.innerText += " You miss." // 152
    }
    healthText.innerText = health; // 125
    monsterHealthText.innerText = monsterHealth; // 125
    if (health <= 0){
        lose(); //126
    } else if (monsterHealth <= 0){// 140
        if (fighting === 2) {
            winGame();
        } else {
            defeatMonster(); // 127
        } 
    }
    if (Math.random() <= .1 && inventory.length !== 1){ // 155 & 158
        text.innerText += " Your " + inventory.pop() + " breaks."; // 156
        currentWeaponIndex --; // 157
    }
}// 114

function getMonsterAttackValue (level){
    const hit = (level * 5) - (Math.floor(Math.random() * xp)); // 146
    console.log(hit);
    return hit > 0 ? hit : 0; // 148 & 149
}// 145

function isMonsterHit () {
    return Math.random() > .2 || health < 20; // 154
} // 153

function dodge () {
text.innerText = "You dodge the attack from the " + monsters[fighting].name + "."; // 129
}// 114

function lose() {
    update(locations[5]); // 137

} // 128

function winGame () {
    update(locations[6]);
}// 142

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7); // 130
    xp += monsters[fighting].level; // 131
    goldText.innerText = gold; // 132
    xpText.innerText = xp; // 132
    update(locations[4]); // 133
} // 128

function restart() {
    xp = 0;
    health = 100;
    gold = 50; 
    currentWeaponIndex = 0; 
    inventory = ["stick"]
    goldText.innerText = gold;
    healthText.innerText = health; 
    xpText.innerText = xp; 
    goTown();
} // 138

function easterEgg () {
    update(locations[7]); // 159
}

function pick (guess) { // 160
    const numbers = []; 
    while (numbers.length < 10) { // 164
        numbers.push(Math.floor(Math.random() * 11)); // 165
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n"; // 166 & 167
    for (let i = 0; i < 10; i ++){ // 168
        text.innerText += numbers[i] + "\n"; // 169
    }
    if (numbers.includes(guess)) { // 170
        text.innerText += "Right! You win 20 gold!"; // 171
        gold += 20; // 171
        goldText.innerText = gold; // 171
    } else {
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10; 
        healthText.innerText = health;
        if (health <= 0){ // 173
            lose();
        } 
    } // 172
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}