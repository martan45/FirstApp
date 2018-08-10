function userInput() {
    let answer = document.getElementById("adventureInput").value
    console.log(answer);
};

function introduce(name) {
    console.log(`Hello there ${name}. You should try and finish the game with the highest score possible
     by taking calculated risks along your journey. Your score will depend on how many enemies you beat, total amount of gold you have accumulated and your abilities i.e attack and defence.
     Good luck`);
};

function random(amountOfOptions) {
    let number = Math.floor(Math.random()) * amountOfOptions
    return number
}

function whoGoesFirstFight() {
    if (random(2) === 0) {
        playerGoesFirst = true
    } else {
        playerGoesFirst = false
    }
    return playerGoesFirst
}

function playerHit(playerAttack, enemyDefence) {
    let hpChange = 0
    let typeOfAttack = userInput("What attack to use: \n(1) Quick Attack 100% chance of hitting\n(2) Medium Attack 80% chance of hitting\n(3) Hard Attack 50% chance of hitting\nEnter number in input box")
    if (typeOfAttack === 1) {
        hpChange = (playerAttack - enemyDefence)
    } else if (typeOfAttack === 2) {
        if (random(10) >= 2) {
            hpChange = ((playerAttack * 1.5) - enemyDefence)
        } else {
            hpChange = 0
        }
    } else {
        if (random(10) >=5 ) {
            hpChange = ((playerAttack * 2) - (enemyDefence * 0.5))
        } else {
            hpChange = 0
        }
    }
    return hpChange
}


function enemyHit(enemyLevel, playerDefence) {
    hpChange = 0
    if (playerDefence >= enemyLevel) {
        hpChange = 0
    } else {
        hpChange = (enemyLevel * (random(1) + 1) - playerDefence)
    }
    return hpChange
}

function fight(player, playerAttack, playerDefence, enemyLevel, whoGoesFirstFight) {
    playerHp = player.this._hp
    enemyHp = enemyLevel * 2
    if (whoGoesFirstFight) {
        enemyHp -= playerHit(playerAttack, enemyLevel)
        console.log(`You did ${((enemyLevel * 2) - enemyHp)}`)
    }
    while (enemyHp > 0 || playerHp > 0) {
        playerHp -= enemyHit(enemyLevel, playerDefence)
        console.log(`The emeny has done a total of ${(player.this._hp - playerHp)} damage out of ${playerHp}`)
        enemyHp -= playerHit(playerAttack, enemyLevel)
        console.log(`You have done a total of ${((enemyLevel * 2) - enemyHp)} damage out of ${enemyHp}`)
    }
    if (enemyHp <= 0) {
        return true
    } else {
        return false
    }
}

function fullFight(player, playerAttack, playerDefence, enemyLevel, playerFirst) {
    if (fight(player, playerAttack, playerDefence, enemyLevel, playerFirst)) {
        improvePlayer(player)
    } else {
        console.log("You are dead. Game over!")
    }
}

function improvePlayer(player) {
    console.log("Would you like to improve\n(1) Attack\n(2) Defence\n(3) Amount of HP (restores to full hp aswell)\nEnter number in input box")
    let number = userInput()
    if (number === 1) {
        player.increaseAttack(1)
    } else if (number === 2) {
        player.increaseDefence(1)
    } else if (number ===3) {
        player.increaseHp(2)
        player.restoreHp(player.this._totalHealthIncreased)
    } else {
        console.log("Enter a valid number")
        //improvePlayer(player)
    }
    let gainMoney = (Math.floor(random(9) + 1))
    player.changeMoney(gainMoney)
    console.log(`You have gained ${gainMoney} money`)
    player.changeScore(1)
}


let player = {
    name: "Marcin",
    attack: 5,
    defence: 5,
    money: 100,
    score: 0,
    hp: 15,
    totalHealthIncreased: 0,

    increaseAttack (amount) {
        player.attack += amount
    },
    increaseDefence (amount) {
        player.defence += amount
    },
    changeMoney (amount) {
        player.money += amount
    },
    changeScore (amount) {
        player.score += amount
    },
    increaseHp (amount) {
        player.hp += amount
        player.totalHealthIncreased += amount
    },
    restoreHp (totalHealthIncreased) {
        player.hp = 10 + player.totalHealthIncreased
    }
}

class enemy {
    constructor(level) {
        this._attack = level
        this._defence = level
        this._hp = (level * 2)
    }
}

const nameOfPlayer = player.name

//introduce(nameOfPlayer)

improvePlayer(player)