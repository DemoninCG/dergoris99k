//User settings
document.getElementById("boardBumpSetting").checked = game.boardBumpVisuals;
document.getElementById("volumeSetting").value = (game.volume*100);
document.getElementById("musicVolumeSetting").value = (game.musicVolume*100);

function setBoardBump() {
    game.boardBumpVisuals = document.getElementById("boardBumpSetting").checked;
    save();
}

function setVolume() {
    game.volume = parseFloat(document.getElementById("volumeSetting").value) / 100;
    Howler.volume(game.volume);
    save();
}

function setMusicVolume() {
    game.musicVolume = parseFloat(document.getElementById("musicVolumeSetting").value) / 100;
    setSoundVolume("menuMusic", game.musicVolume);
    save();
}

//Game settings

function updateSettingVisuals() {
    document.getElementById("startingLevelSetting").value = settings.startingLevel;
    document.getElementById("boardWidthSetting").value = settings.boardWidth;
    document.getElementById("boardHeightSetting").value = settings.boardHeight;
    document.getElementById("visualsSetting").value = settings.visuals;
    document.getElementById("gameMechanicsSetting").value = settings.gameMechanics;
    document.getElementById("segaDifficultySetting").value = settings.segaDifficulty;
    document.getElementById("segaDifficultySetting").disabled = (settings.gameMechanics != "sega");
    document.getElementById("DASInitialSetting").disabled = (settings.gameMechanics == "dragonStyle");
    document.getElementById("DASSetting").disabled = (settings.gameMechanics == "dragonStyle");
    document.getElementById("lockDelaySetting").disabled = (settings.gameMechanics == "dragonStyle");
    document.getElementById("randomizerSetting").value = settings.randomizer;
    document.getElementById("pieceColouringSetting").value = settings.pieceColouring;
    document.getElementById("softDropSetting").checked = settings.softDrop;
    document.getElementById("softDropSpeedSetting").value = settings.softDropSpeed;
    document.getElementById("hardDropSetting").checked = settings.hardDrop;
    document.getElementById("sonicDropSetting").checked = settings.sonicDrop;
    document.getElementById("sonicDropSetting").disabled = !settings.hardDrop;
    document.getElementById("rotationSystemSetting").value = settings.rotationSystem;
    document.getElementById("IRSSetting").checked = settings.IRS;
    document.getElementById("twentyGSetting").checked = settings.twentyGOverride;
    document.getElementById("levelLockSetting").disabled = (settings.gameMechanics != "classicStyle" && settings.gameMechanics != "masterStyle" && settings.gameMechanics != "dragonStyle" && settings.gameMechanics != "tgm");
    document.getElementById("levelLockSetting").checked = settings.levelLock;
    document.getElementById("overrideGameARESetting").checked = settings.overrideGameARE;
    document.getElementById("ARESetting").value = settings.ARE;
    document.getElementById("ARESetting").disabled = !settings.overrideGameARE;
    document.getElementById("ARELineClearSetting").value = settings.ARELineClear;
    document.getElementById("ARELineClearSetting").disabled = !settings.overrideGameARE;
    document.getElementById("DASInitialSetting").value = settings.DASInitial;
    document.getElementById("DASSetting").value = settings.DAS;
    document.getElementById("lockDelaySetting").value = settings.lockDelay;
    document.getElementById("lockResetSetting").value = settings.lockReset;
}

updateSettingVisuals()
document.getElementById("presetsSetting").value = "classicStyle";

function clamp(min, val, max) {
    if(val < min) {
        return min;
    }
    if(val > max) {
        return max;
    }
    return val;
}

function setPreset(preset = document.getElementById("presetsSetting").value) {
    document.getElementById("presetsSetting").value = preset;
    switch (preset) {
        case "classicStyle":
            settings.boardWidth = 10;
            settings.boardHeight = 20;
            settings.visuals = "classicStyle";
            settings.gameMechanics = "classicStyle";
            settings.randomizer = "tgm";
            settings.pieceColouring = "regular";
            settings.softDrop = true;
            settings.softDropSpeed = 2;
            settings.hardDrop = true;
            settings.sonicDrop = false;
            settings.rotationSystem = "nintendo-r";
            settings.IRS = true;
            settings.twentyGOverride = false;
            settings.levelLock = false;
            settings.overrideGameARE = false;
            settings.DASInitial = 16;
            settings.DAS = 6;
            settings.lockDelay = 0;
            break;
        case "masterStyle":
            settings.boardWidth = 10;
            settings.boardHeight = 20;
            settings.visuals = "masterStyle";
            settings.gameMechanics = "masterStyle";
            settings.randomizer = "tgm";
            settings.pieceColouring = "regular";
            settings.softDrop = true;
            settings.softDropSpeed = 1;
            settings.hardDrop = false;
            settings.sonicDrop = false;
            settings.rotationSystem = "ars";
            settings.IRS = true;
            settings.twentyGOverride = false;
            settings.levelLock = false;
            settings.overrideGameARE = false;
            settings.DASInitial = 16;
            settings.DAS = 1;
            settings.lockDelay = 30;
            break;
        case "dragonStyle":
            settings.boardWidth = 10;
            settings.boardHeight = 20;
            settings.visuals = "dragonStyle";
            settings.gameMechanics = "dragonStyle";
            settings.randomizer = "tgm";
            settings.pieceColouring = "regular";
            settings.softDrop = true;
            settings.softDropSpeed = 1;
            settings.hardDrop = false;
            settings.sonicDrop = false;
            settings.rotationSystem = "ars";
            settings.IRS = true;
            settings.twentyGOverride = true;
            settings.levelLock = false;
            settings.overrideGameARE = false;
            settings.DASInitial = 16;
            settings.DAS = 1;
            settings.lockDelay = 30;
            break;
        case "gb":
            settings.startingLevel = Math.min(settings.startingLevel, 20);
            settings.boardWidth = 10;
            settings.boardHeight = 18;
            settings.visuals = "gb";
            settings.gameMechanics = "gb";
            settings.randomizer = "gb";
            settings.pieceColouring = "monotoneAll";
            settings.softDrop = true;
            settings.softDropSpeed = 3;
            settings.hardDrop = false;
            settings.sonicDrop = false;
            settings.rotationSystem = "nintendo-l";
            settings.IRS = false;
            settings.twentyGOverride = false;
            settings.levelLock = false;
            settings.overrideGameARE = false;
            settings.DASInitial = 24;
            settings.DAS = 9;
            settings.lockDelay = 0;
            break;
        case "nes":
            settings.startingLevel = Math.min(settings.startingLevel, 29);
            settings.boardWidth = 10;
            settings.boardHeight = 20;
            settings.visuals = "nes";
            settings.gameMechanics = "nes";
            settings.randomizer = "nes";
            settings.pieceColouring = "regular";
            settings.softDrop = true;
            settings.softDropSpeed = 2;
            settings.hardDrop = false;
            settings.sonicDrop = false;
            settings.rotationSystem = "nintendo-r";
            settings.IRS = false;
            settings.twentyGOverride = false;
            settings.levelLock = false;
            settings.overrideGameARE = false;
            settings.DASInitial = 16;
            settings.DAS = 6;
            settings.lockDelay = 0;
            break;
        case "dx":
            settings.startingLevel = Math.min(settings.startingLevel, 30);
            settings.boardWidth = 10;
            settings.boardHeight = 18;
            settings.visuals = "dx";
            settings.gameMechanics = "dx";
            settings.randomizer = "dx";
            settings.pieceColouring = "regular";
            settings.softDrop = true;
            settings.softDropSpeed = 2;
            settings.hardDrop = false;
            settings.sonicDrop = false;
            settings.rotationSystem = "dx";
            settings.IRS = false;
            settings.twentyGOverride = false;
            settings.levelLock = false;
            settings.overrideGameARE = false;
            settings.DASInitial = 9;
            settings.DAS = 3;
            settings.lockDelay = 32;
            break;
        case "sega":
            settings.startingLevel = Math.min(settings.startingLevel, 99);
            settings.boardWidth = 10;
            settings.boardHeight = 20;
            settings.visuals = "sega";
            settings.gameMechanics = "sega";
            settings.randomizer = "random";
            settings.pieceColouring = "regular";
            settings.softDrop = true;
            settings.softDropSpeed = 1;
            settings.hardDrop = false;
            settings.sonicDrop = false;
            settings.rotationSystem = "sega";
            settings.IRS = false;
            settings.twentyGOverride = false;
            settings.levelLock = false;
            settings.overrideGameARE = false;
            settings.DASInitial = 20;
            settings.DAS = 1;
            settings.lockDelay = 30;
            break;
        case "tgm":
            settings.boardWidth = 10;
            settings.boardHeight = 20;
            settings.visuals = "tgm";
            settings.gameMechanics = "tgm";
            settings.randomizer = "tgm";
            settings.pieceColouring = "regular";
            settings.softDrop = true;
            settings.softDropSpeed = 1;
            settings.hardDrop = false;
            settings.sonicDrop = false;
            settings.rotationSystem = "ars";
            settings.IRS = true;
            settings.twentyGOverride = false;
            settings.levelLock = false;
            settings.overrideGameARE = false;
            settings.DASInitial = 16;
            settings.DAS = 1;
            settings.lockDelay = 30;
            break;
    }
    updateSettingVisuals();
}

function setStartingLevel() {
    let startingLevel = parseInt(document.getElementById("startingLevelSetting").value);
    const capTable = {
        classicStyle: 998,
        gb: 20,
        nes: 29,
        dx: 30,
        sega: 99,
        tgm: 998
    };
    const max = capTable[settings.gameMechanics] || Infinity;
    startingLevel = clamp(0, startingLevel, max);
    document.getElementById("startingLevelSetting").value = startingLevel;
    settings.startingLevel = startingLevel;
}

function setBoardWidth() {
    let boardWidth = parseInt(document.getElementById("boardWidthSetting").value);
    boardWidth = clamp(4, boardWidth, 20);
    document.getElementById("boardWidthSetting").value = boardWidth;
    settings.boardWidth = boardWidth;
}

function setBoardHeight() {
    let boardHeight = parseInt(document.getElementById("boardHeightSetting").value);
    boardHeight = clamp(4, boardHeight, 25);
    document.getElementById("boardHeightSetting").value = boardHeight;
    settings.boardHeight = boardHeight;
}

function setVisuals() {
    let visuals = document.getElementById("visualsSetting").value;
    settings.visuals = visuals;
}

function setGameMechanics() {
    let gameMechanics = document.getElementById("gameMechanicsSetting").value;
    settings.gameMechanics = gameMechanics;
    document.getElementById("segaDifficultySetting").disabled = (settings.gameMechanics != "sega");
    document.getElementById("DASInitialSetting").disabled = (settings.gameMechanics == "dragonStyle");
    document.getElementById("DASSetting").disabled = (settings.gameMechanics == "dragonStyle");
    document.getElementById("lockDelaySetting").disabled = (settings.gameMechanics == "dragonStyle");
    document.getElementById("levelLockSetting").disabled = (settings.gameMechanics != "classicStyle" && settings.gameMechanics != "masterStyle" && settings.gameMechanics != "dragonStyle" && settings.gameMechanics != "tgm");
}

function setSegaDifficulty() {
    let segaDifficulty = document.getElementById("segaDifficultySetting").value;
    settings.segaDifficulty = segaDifficulty;
}

function setRandomizer() {
    let randomizer = document.getElementById("randomizerSetting").value;
    settings.randomizer = randomizer;
}

function setPieceColouring() {
    let pieceColouring = document.getElementById("pieceColouringSetting").value;
    settings.pieceColouring = pieceColouring;
}

function setInvisible() {
    let invisible = document.getElementById("invisibleSetting").checked;
    settings.invisible = invisible;
}

function setSoftDrop() {
    let softDrop = document.getElementById("softDropSetting").checked;
    settings.softDrop = softDrop;
}

function setSoftDropSpeed() {
    let softDropSpeed = parseInt(document.getElementById("softDropSpeedSetting").value);
    softDropSpeed = clamp(1, softDropSpeed, 20);
    document.getElementById("softDropSpeedSetting").value = softDropSpeed;
    settings.softDropSpeed = softDropSpeed;

}

function setHardDrop() {
    let hardDrop = document.getElementById("hardDropSetting").checked;
    settings.hardDrop = hardDrop;
    document.getElementById("sonicDropSetting").disabled = (!hardDrop);
}

function setSonicDrop() {
    let sonicDrop = document.getElementById("sonicDropSetting").checked;
    settings.sonicDrop = sonicDrop;
}

function setRotationSystem() {
    let rotationSystem = document.getElementById("rotationSystemSetting").value;
    settings.rotationSystem = rotationSystem;
}

function setIRS() {
    let IRS = document.getElementById("IRSSetting").checked;
    settings.IRS = IRS;
}

function setTwentyGOverride() {
    let twentyGOverride = document.getElementById("twentyGSetting").checked;
    settings.twentyGOverride = twentyGOverride;
}

function setLevelLock() {
    let levelLock = document.getElementById("levelLockSetting").checked;
    settings.levelLock = levelLock;
}

function setOverrideGameARE() {
    let overrideGameARE = document.getElementById("overrideGameARESetting").checked;
    settings.overrideGameARE = overrideGameARE;
    document.getElementById("ARESetting").disabled = !settings.overrideGameARE;
    document.getElementById("ARELineClearSetting").disabled = !settings.overrideGameARE;
}

function setARE() {
    let ARE = parseInt(document.getElementById("ARESetting").value);
    ARE = clamp(0, ARE, 60);
    document.getElementById("ARESetting").value = ARE;
    settings.ARE = ARE;
}

function setARELineClear() {
    let ARELineClear = parseInt(document.getElementById("ARELineClearSetting").value);
    ARELineClear = clamp(0, ARELineClear, 60);
    document.getElementById("ARELineClearSetting").value = ARELineClear;
    settings.ARELineClear = ARELineClear;
}

function setDASInitial() {
    let DASInitial = parseInt(document.getElementById("DASInitialSetting").value);
    DASInitial = clamp(1, DASInitial, 60);
    document.getElementById("DASInitialSetting").value = DASInitial;
    settings.DASInitial = DASInitial;
}

function setDAS() {
    let DAS = parseInt(document.getElementById("DASSetting").value);
    DAS = clamp(1, DAS, 60);
    document.getElementById("DASSetting").value = DAS;
    settings.DAS = DAS;
}

function setLockDelay() {
    let lockDelay = parseInt(document.getElementById("lockDelaySetting").value);
    lockDelay = clamp(0, lockDelay, 9999);
    document.getElementById("lockDelaySetting").value = lockDelay;
    settings.lockDelay = lockDelay;
}

function setLockReset() {
    let lockReset = document.getElementById("lockResetSetting").value;
    settings.lockReset = lockReset;
}