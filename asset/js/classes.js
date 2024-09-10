class Character {
    _life = 1;

    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}


class Knignt extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1E1, fighter2E2, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1E1 = fighter1E1;
        this.fighter2E2 = fighter2E2;
        this.log = logObject;
    }

    start() {
        this.update();
        this.fighter1E1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2E2.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        // Fight 1
        this.fighter1E1.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1E1.querySelector('.bar').style.width = `${f1Pct}%`;

        // Fight 2
        this.fighter2E2.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2E2.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0) {
            this.log.addMessage('Você virou zumbi? você está morto e não pode atacar');
            return;
        }if (attacked.life <= 0) {
            this.log.addMessage('você está batendo em cachorro morto');
        }
        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacking.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`O ${attacking.name} causou ${actualAttack.toFixed(2)}  em ${attacked.name}`);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender isso que nem pode ser chamado de ataque`)
        }

        //console.log(actualAttack);
        this.update();
    }
}

class Log {
    list = [];

    constructor(listE1) {
        this.listE1 = listE1;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listE1.innerHTML = '';
        
        for(let i in this.list){
            this.listE1.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}
