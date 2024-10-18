/**
 * @typedef {import("./script.js").Settings} Settings
 */

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function updateSettingVisuals(settings) {
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
    document.getElementById("overrideGameARESetting").checked = settings.overrideGameARE;
    document.getElementById("ARESetting").value = settings.ARE;
    document.getElementById("ARESetting").disabled = !settings.overrideGameARE;
    document.getElementById("ARELineClearSetting").value = settings.ARELineClear;
    document.getElementById("ARELineClearSetting").disabled = !settings.overrideGameARE;
    document.getElementById("DASInitialSetting").value = settings.DASInitial;
    document.getElementById("DASSetting").value = settings.DAS;
    document.getElementById("lockDelaySetting").value = settings.lockDelay;
    document.getElementById("lockResetSetting").value = settings.lockReset;
    return settings;
}

document.getElementById("presetsSetting").value = "classicStyle";

/*
Classic Style:
Reminiscent of classic tetris versions
- No lock delay
- Hard drop
- Drop speed and DAS get faster as level increases
- Aim is to maximize score and minimize section times

Master style:
Reminiscent of the TGM series master mode
- Lock delay
- No hard drop
- Drop speed gets faster until it hits 20G
- Aim is to maximize score and minimize section times

Dragon style:
Reminiscent of the TGM series death/shirase mode
- Lock delay
- No hard drop
- Drop speed gets faster until it hits 20G
- Aim is to maximize score and minimize section times
*/ 

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setPreset(settings) {
    let preset = document.getElementById("presetsSetting").value;
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
            settings.twentyGOverride = false,
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
            settings.twentyGOverride = false,
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
            settings.twentyGOverride = true,
            settings.overrideGameARE = false;
            settings.DASInitial = 16;
            settings.DAS = 1;
            settings.lockDelay = 30;
            break;
        case "gb":
            if (settings.startingLevel > 20) {settings.startingLevel = 20}
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
            settings.twentyGOverride = false,
            settings.overrideGameARE = false;
            settings.DASInitial = 24;
            settings.DAS = 9;
            settings.lockDelay = 0;
            break;
        case "nes":
            if (settings.startingLevel > 29) {settings.startingLevel = 29}
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
            settings.twentyGOverride = false,
            settings.overrideGameARE = false;
            settings.DASInitial = 16;
            settings.DAS = 6;
            settings.lockDelay = 0;
            break;
        case "dx":
            if (settings.startingLevel > 30) {settings.startingLevel = 30}
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
            settings.twentyGOverride = false,
            settings.overrideGameARE = false;
            settings.DASInitial = 9;
            settings.DAS = 3;
            settings.lockDelay = 32;
            break;
        case "sega":
            if (settings.startingLevel > 99) {settings.startingLevel = 99}
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
            settings.twentyGOverride = false,
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
            settings.twentyGOverride = false,
            settings.overrideGameARE = false;
            settings.DASInitial = 16;
            settings.DAS = 1;
            settings.lockDelay = 30;
            break;
    }
    return updateSettingVisuals(settings);
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setStartingLevel(settings) {
    let startingLevel = parseInt(document.getElementById("startingLevelSetting").value);
    if (startingLevel < 0) {
        startingLevel = 0;
    }
    if (settings.gameMechanics == "classicStyle" && startingLevel > 998) {startingLevel = 998;}
    else if (settings.gameMechanics == "gb" && startingLevel > 20) {startingLevel = 20;}
    else if (settings.gameMechanics == "nes" && startingLevel > 29) {startingLevel = 29;}
    else if (settings.gameMechanics == "dx" && startingLevel > 30) {startingLevel = 30;}
    else if (settings.gameMechanics == "sega" && startingLevel > 99) {startingLevel = 99;}
    else if (settings.gameMechanics == "tgm" && startingLevel > 998) {startingLevel = 998;}
    document.getElementById("startingLevelSetting").value = startingLevel;
    settings.startingLevel = startingLevel;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setBoardWidth(settings) {
    let boardWidth = parseInt(document.getElementById("boardWidthSetting").value);
    if (boardWidth < 4) {
        boardWidth = 4;
    }
    if (boardWidth > 20) {
        boardWidth = 20;
    }
    document.getElementById("boardWidthSetting").value = boardWidth;
    settings.boardWidth = boardWidth;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setBoardHeight(settings) {
    let boardHeight = parseInt(document.getElementById("boardHeightSetting").value);
    if (boardHeight < 4) {
        boardHeight = 4;
    }
    if (boardHeight > 25) {
        boardHeight = 25;
    }
    document.getElementById("boardHeightSetting").value = boardHeight;
    settings.boardHeight = boardHeight;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setVisuals(settings) {
    let visuals = document.getElementById("visualsSetting").value;
    settings.visuals = visuals;
    return settings;
}

/**
 * @param {Settings} settings
 * @returns {Settings}
 */
export function setGameMechanics(settings) {
    let gameMechanics = document.getElementById("gameMechanicsSetting").value;
    settings.gameMechanics = gameMechanics;
    document.getElementById("segaDifficultySetting").disabled = (settings.gameMechanics != "sega");
    document.getElementById("DASInitialSetting").disabled = (settings.gameMechanics == "dragonStyle");
    document.getElementById("DASSetting").disabled = (settings.gameMechanics == "dragonStyle");
    document.getElementById("lockDelaySetting").disabled = (settings.gameMechanics == "dragonStyle");
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setSegaDifficulty(settings) {
    let segaDifficulty = document.getElementById("segaDifficultySetting").value;
    settings.segaDifficulty = segaDifficulty;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setRandomizer(settings) {
    let randomizer = document.getElementById("randomizerSetting").value;
    settings.randomizer = randomizer;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setPieceColouring(settings) {
    let pieceColouring = document.getElementById("pieceColouringSetting").value;
    settings.pieceColouring = pieceColouring;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setInvisible(settings) {
    let invisible = document.getElementById("invisibleSetting").checked;
    settings.invisible = invisible;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setSoftDrop(settings) {
    let softDrop = document.getElementById("softDropSetting").checked;
    settings.softDrop = softDrop;
    return settings;
}

/**
 * @param {number} min
 * @param {number} val
 * @param {number} max
 * @returns {number}
 */
function clamp(min, val, max) {
    return Math.max(min, Math.min(val, max));
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setSoftDropSpeed(settings) {
    let softDropSpeed = parseInt(document.getElementById("softDropSpeedSetting").value);
    softDropSpeed = clamp(1, softDropSpeed, 20);
    document.getElementById("softDropSpeedSetting").value = softDropSpeed;
    settings.softDropSpeed = softDropSpeed;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setHardDrop(settings) {
    let hardDrop = document.getElementById("hardDropSetting").checked;
    settings.hardDrop = hardDrop;
    document.getElementById("sonicDropSetting").disabled = (!hardDrop);
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setSonicDrop(settings) {
    let sonicDrop = document.getElementById("sonicDropSetting").checked;
    settings.sonicDrop = sonicDrop;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setRotationSystem(settings) {
    let rotationSystem = document.getElementById("rotationSystemSetting").value;
    settings.rotationSystem = rotationSystem;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setIRS(settings) {
    let IRS = document.getElementById("IRSSetting").checked;
    settings.IRS = IRS;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setTwentyGOverride(settings) {
    let twentyGOverride = document.getElementById("twentyGSetting").checked;
    settings.twentyGOverride = twentyGOverride;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setOverrideGameARE(settings) {
    let overrideGameARE = document.getElementById("overrideGameARESetting").checked;
    settings.overrideGameARE = overrideGameARE;
    document.getElementById("ARESetting").disabled = !settings.overrideGameARE;
    document.getElementById("ARELineClearSetting").disabled = !settings.overrideGameARE;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setARE(settings) {
    let ARE = parseInt(document.getElementById("ARESetting").value);
    ARE = clamp(0, ARE, 60);
    document.getElementById("ARESetting").value = ARE;
    settings.ARE = ARE;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setARELineClear(settings) {
    let ARELineClear = parseInt(document.getElementById("ARELineClearSetting").value);
    ARELineClear = clamp(0, ARELineClear, 60);
    document.getElementById("ARELineClearSetting").value = ARELineClear;
    settings.ARELineClear = ARELineClear;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setDASInitial(settings) {
    let DASInitial = parseInt(document.getElementById("DASInitialSetting").value);
    DASInitial = clamp(1, DASInitial, 60);
    document.getElementById("DASInitialSetting").value = DASInitial;
    settings.DASInitial = DASInitial;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setDAS(settings) {
    let DAS = parseInt(document.getElementById("DASSetting").value);
    DAS = clamp(1, DAS, 60);
    document.getElementById("DASSetting").value = DAS;
    settings.DAS = DAS;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setLockDelay(settings) {
    let lockDelay = parseInt(document.getElementById("lockDelaySetting").value);
    lockDelay = clamp(0, lockDelay, 180);
    document.getElementById("lockDelaySetting").value = lockDelay;
    settings.lockDelay = lockDelay;
    return settings;
}

/**
 * @param {Settings} settings 
 * @returns {Settings}
 */
export function setLockReset(settings) {
    let lockReset = document.getElementById("lockResetSetting").value;
    settings.lockReset = lockReset;
    return settings;
}