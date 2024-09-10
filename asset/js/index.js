const log = new Log(document.querySelector('.log'));
const char = new Sorcerer("Kaio");
const monster = new BigMonster();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();