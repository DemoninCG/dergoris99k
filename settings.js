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

function setPreset() {
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
    updateSettingVisuals();
}

function setStartingLevel() {
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
}

function setBoardWidth() {
    let boardWidth = parseInt(document.getElementById("boardWidthSetting").value);
    if (boardWidth < 4) {
        boardWidth = 4;
    }
    if (boardWidth > 20) {
        boardWidth = 20;
    }
    document.getElementById("boardWidthSetting").value = boardWidth;
    settings.boardWidth = boardWidth;
}

function setBoardHeight() {
    let boardHeight = parseInt(document.getElementById("boardHeightSetting").value);
    if (boardHeight < 4) {
        boardHeight = 4;
    }
    if (boardHeight > 25) {
        boardHeight = 25;
    }
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
    if (softDropSpeed < 1) {
        softDropSpeed = 1;
    }
    if (softDropSpeed > 20) {
        softDropSpeed = 20;
    }
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

function setOverrideGameARE() {
    let overrideGameARE = document.getElementById("overrideGameARESetting").checked;
    settings.overrideGameARE = overrideGameARE;
    document.getElementById("ARESetting").disabled = !settings.overrideGameARE;
    document.getElementById("ARELineClearSetting").disabled = !settings.overrideGameARE;
}

function setARE() {
    let ARE = parseInt(document.getElementById("ARESetting").value);
    if (ARE < 0) {
        ARE = 0;
    }
    if (ARE > 60) {
        ARE = 60;
    }
    document.getElementById("ARESetting").value = ARE;
    settings.ARE = ARE;
}

function setARELineClear() {
    let ARELineClear = parseInt(document.getElementById("ARELineClearSetting").value);
    if (ARELineClear < 0) {
        ARELineClear = 0;
    }
    if (ARELineClear > 60) {
        ARELineClear = 60;
    }
    document.getElementById("ARELineClearSetting").value = ARELineClear;
    settings.ARELineClear = ARELineClear;
}

function setDASInitial() {
    let DASInitial = parseInt(document.getElementById("DASInitialSetting").value);
    if (DASInitial < 1) {
        DASInitial = 1;
    }
    if (DASInitial > 60) {
        DASInitial = 60;
    }
    document.getElementById("DASInitialSetting").value = DASInitial;
    settings.DASInitial = DASInitial;
}

function setDAS() {
    let DAS = parseInt(document.getElementById("DASSetting").value);
    if (DAS < 1) {
        DAS = 1;
    }
    if (DAS > 60) {
        DAS = 60;
    }
    document.getElementById("DASSetting").value = DAS;
    settings.DAS = DAS;
}

function setLockDelay() {
    let lockDelay = parseInt(document.getElementById("lockDelaySetting").value);
    if (lockDelay < 0) {
        lockDelay = 0;
    }
    if (lockDelay > 180) {
        lockDelay = 180;
    }
    document.getElementById("lockDelaySetting").value = lockDelay;
    settings.lockDelay = lockDelay;
}

function setLockReset() {
    let lockReset = document.getElementById("lockResetSetting").value;
    settings.lockReset = lockReset;
}