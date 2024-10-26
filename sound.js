Howler.volume(game.volume);

var buttonClick = new Howl({
    src: ['sound/buttonClick.mp3'],
    preload: true,
});

var buttonHover = new Howl({
    src: ['sound/talk.wav'],
    preload: true,
    volume: 0.5,
});

var menuMusic = new Howl({
    src: ['sound/stuntmaster.mp3'],
    preload: true,
    loop: true,
    volume: game.musicVolume,
});

var TGMSoundEffects = new Howl({
    src: ['sound/TGMSoundEffects.mp3'],
    preload: true,
    volume: 0.8,
    sprite: {
        coinEnter: [0, 1800],
        ready: [1900, 1800],
        go: [3780, 1200],
        pieceO: [5200, 1000],
        pieceJ: [6430, 1000],
        pieceL: [7640, 1000],
        pieceZ: [9060, 1000],
        pieceS: [10330, 1000],
        pieceT: [11550, 1000],
        pieceI: [12950, 1000],
        IRS: [14420, 800],
        lock: [15300, 500],
        land: [15880, 500],
    }
});

var lockSound = new Howl({
    src: ['sound/plastic_box_impact_bullet5.mp3'],
    preload: true,
    volume: 0.5,
});

var breakSound = new Howl({
    src: ['sound/etc06.wav'],
    preload: true,
    volume: 0.5,
});

var levelUp = new Howl({
    src: ['sound/levelUp.wav'],
    preload: true,
    volume: 0.5,
});

var endSound = new Howl({
    src: ['sound/fail.wav'],
    preload: true,
});

var finishSound = new Howl({
    src: ['sound/Applause.ogg'],
    preload: true,
    volume: 0.4,
});

var gameMusic1 = new Howl({
    src: ['sound/wireframe-aural-imbalance.mp3'],
    preload: true,
    loop: true,
    volume: 0.4 * game.musicVolume,
});

var gameMusic2 = new Howl({
    src: ['sound/tensor-jlm-productions.mp3'],
    preload: true,
    loop: true,
    volume: 0.4 * game.musicVolume,
});

var gameMusic3 = new Howl({
    src: ['sound/Night Stream.mp3'],
    preload: true,
    loop: true,
    volume: 0.4 * game.musicVolume,
});

var gameMusic4 = new Howl({
    src: ['sound/Pearl Blue Soul.mp3'],
    preload: true,
    loop: true,
    volume: 0.4 * game.musicVolume,
});

var gameMusic5 = new Howl({
    src: ['sound/Vanishing Horizon.mp3'],
    preload: true,
    loop: true,
    volume: 0.4 * game.musicVolume,
});

var gameMusic6 = new Howl({
    src: ['sound/Tek Trek.mp3'],
    preload: true,
    loop: true,
    volume: 0.4 * game.musicVolume,
});

function playSound(sound, levelTransition=false) {
    if (!soundEnabled) return;
    switch(sound) {
        case "buttonClick":
            buttonClick.play();
            break;
        case "buttonHover":
            buttonHover.play();
            break;
        case "menuMusic":
            menuMusic.play();
            break;
        case "ready":
            TGMSoundEffects.play("ready");
            break;
        case "go":
            TGMSoundEffects.play("go");
            break;
        case "gameMusic":
            if ((settings.visuals == "classicStyle" || settings.visuals == "masterStyle" || settings.visuals == "dragonStyle") && level >= 485 && level < 500 && !levelTransition) {break;} //Intermission
            else if (settings.visuals == "classicStyle" && (level >= 500 || levelTransition)) {gameMusic2.play();}
            else if (settings.visuals == "classicStyle") {gameMusic1.play();}
            else if (settings.visuals == "masterStyle" && (level >= 500 || levelTransition)) {gameMusic4.play();}
            else if (settings.visuals == "masterStyle") {gameMusic3.play();}
            else if (settings.visuals == "dragonStyle" && (level >= 500 || levelTransition)) {gameMusic6.play();}
            else if (settings.visuals == "dragonStyle") {gameMusic5.play();}
            break;
        case "pieceO":
            TGMSoundEffects.play("pieceO");
            break;
        case "pieceJ":
            TGMSoundEffects.play("pieceJ");
            break;
        case "pieceL":
            TGMSoundEffects.play("pieceL");
            break;
        case "pieceZ":
            TGMSoundEffects.play("pieceZ");
            break;
        case "pieceS":
            TGMSoundEffects.play("pieceS");
            break;
        case "pieceT":
            TGMSoundEffects.play("pieceT");
            break;
        case "pieceI":
            TGMSoundEffects.play("pieceI");
            break;
        case "IRS":
            TGMSoundEffects.play("IRS");
            break; 
        case "land":
            TGMSoundEffects.play("land");
            break;
        case "lock":
            if (settings.visuals == "tgm") {TGMSoundEffects.play("lock");}
            else {lockSound.play();}
            break;
        case "lineClear":
            breakSound.play();
            break;
        case "levelUp":
            levelUp.play();
            break;
        case "end":
            endSound.play();
            break;
        case "finish":
            finishSound.play();
            break;
    }
}

function stopSound(sound) {
    if (!soundEnabled) return;
    switch(sound) {
        case "menuMusic":
            menuMusic.stop();
            break;
        case "gameMusic":
            gameMusic1.stop();
            gameMusic2.stop();
            gameMusic3.stop();
            gameMusic4.stop();
            gameMusic5.stop();
            gameMusic6.stop();
            break;
    }
}

function setSoundVolume(sound, vol) {
    if (!soundEnabled) return;
    switch(sound) {
        case "menuMusic":
            menuMusic.volume(vol);
            break;
        case "gameMusic":
            gameMusic1.volume(vol * 0.4);
            gameMusic2.volume(vol * 0.4);
            gameMusic3.volume(vol * 0.4);
            gameMusic4.volume(vol * 0.4);
            gameMusic5.volume(vol * 0.4);
            gameMusic6.volume(vol * 0.4);
            break;
    }
}

function fadeOutSound(sound, length) {
    if (!soundEnabled) return;
    switch(sound) {
        case "menuMusic":
            menuMusic.fade(game.musicVolume, 0, length);
            break;
        case "gameMusic":
            if (settings.visuals == "classicStyle" && level >= 500) {gameMusic2.fade(0.4 * game.musicVolume, 0, length);}
            else if (settings.visuals == "classicStyle") {gameMusic1.fade(0.4 * game.musicVolume, 0, length);}
            else if (settings.visuals == "masterStyle" && level >= 500) {gameMusic4.fade(0.4 * game.musicVolume, 0, length);}
            else if (settings.visuals == "masterStyle") {gameMusic3.fade(0.4 * game.musicVolume, 0, length);}
            else if (settings.visuals == "dragonStyle" && level >= 500) {gameMusic6.fade(0.4 * game.musicVolume, 0, length);}
            else if (settings.visuals == "dragonStyle") {gameMusic5.fade(0.4 * game.musicVolume, 0, length);}
            break;
    }
}

function fadeInSound(sound, length) {
    if (!soundEnabled) return;
    switch(sound) {
        case "menuMusic":
            menuMusic.fade(0, game.musicVolume, length);
            break;
        case "gameMusic":
            if (settings.visuals == "classicStyle" && level >= 500) {gameMusic2.fade(0, 0.4 * game.musicVolume, length);}
            else if (settings.visuals == "classicStyle") {gameMusic1.fade(0, 0.4 * game.musicVolume, length);}
            else if (settings.visuals == "masterStyle" && level >= 500) {gameMusic4.fade(0, 0.4 * game.musicVolume, length);}
            else if (settings.visuals == "masterStyle") {gameMusic3.fade(0, 0.4 * game.musicVolume, length);}
            else if (settings.visuals == "dragonStyle" && level >= 500) {gameMusic6.fade(0, 0.4 * game.musicVolume, length);}
            else if (settings.visuals == "dragonStyle") {gameMusic5.fade(0, 0.4 * game.musicVolume, length);}
            break;
    }
}