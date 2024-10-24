//Fetch the mode info canvas element and its 2D drawing context
const modeStatsCanvas = document.getElementById("modeStatsCanvas");
const modeStatsCtx = modeStatsCanvas && modeStatsCanvas.getContext("2d");

//Fetch the overall grade canvas element and its 2D drawing context
const overallGradeCanvas = document.getElementById("overallGradeCanvas");
const overallGradeCtx = overallGradeCanvas && overallGradeCanvas.getContext("2d");

let modeStatsImage = new Image();
modeStatsImage.src = "img/modeInfo.png";
let digitsSmall = new Image();
digitsSmall.src = "img/main/digitsSmall.png";
let overallGradeImage = new Image();
overallGradeImage.src = "img/overallGrades.png";
let overallGradeInfoImage = new Image();
overallGradeInfoImage.src = "img/overallGradeInfo.png";

function switchToTab(x) {
    inCampaign = (x == 2); //Set inCampaign to true if entering the campaign screen
    switch(x) {
        case 1:
            onCampaignScreen = false;
            backgroundColorDestination = [80, 120, 120];
            document.getElementsByClassName("container")[0].style.top = "0";
            document.getElementsByClassName("container")[0].style.left = "0";
            document.getElementsByClassName("container")[1].style.top = "0";
            document.getElementsByClassName("container")[1].style.left = "100vw";
            document.getElementsByClassName("container")[2].style.top = "0";
            document.getElementsByClassName("container")[2].style.left = "100vw";
            document.getElementsByClassName("container")[3].style.top = "100vh";
            document.getElementsByClassName("container")[3].style.left = "0";
            break;
        case 2:
            onCampaignScreen = true;
            backgroundColorDestination = [50, 50, 50];
            document.getElementsByClassName("container")[0].style.top = "0";
            document.getElementsByClassName("container")[0].style.left = "-100vw";
            document.getElementsByClassName("container")[1].style.top = "0";
            document.getElementsByClassName("container")[1].style.left = "0";
            document.getElementsByClassName("container")[2].style.top = "0";
            document.getElementsByClassName("container")[2].style.left = "100vw";
            document.getElementsByClassName("container")[3].style.top = "100vh";
            document.getElementsByClassName("container")[3].style.left = "-100vw";
            hideKeybinds();
            hideSettings();
            break;
        case 3:
            onCampaignScreen = false;
            backgroundColorDestination = [100, 100, 100];
            document.getElementsByClassName("container")[0].style.top = "0";
            document.getElementsByClassName("container")[0].style.left = "-100vw";
            document.getElementsByClassName("container")[1].style.top = "0";
            document.getElementsByClassName("container")[1].style.left = "100vw";
            document.getElementsByClassName("container")[2].style.top = "0";
            document.getElementsByClassName("container")[2].style.left = "0";
            document.getElementsByClassName("container")[3].style.top = "100vh";
            document.getElementsByClassName("container")[3].style.left = "-100vw";
            hideKeybinds();
            hideSettings();
            break;
        case 4:
            onCampaignScreen = false;
            backgroundColorDestination = [50, 50, 50];
            document.getElementsByClassName("container")[0].style.top = "-100vh";
            document.getElementsByClassName("container")[0].style.left = "0";
            document.getElementsByClassName("container")[1].style.top = "-100vh";
            document.getElementsByClassName("container")[1].style.left = "100vw";
            document.getElementsByClassName("container")[2].style.top = "-100vh";
            document.getElementsByClassName("container")[2].style.left = "100vw";
            document.getElementsByClassName("container")[3].style.top = "0";
            document.getElementsByClassName("container")[3].style.left = "0";
            hideKeybinds();
            hideSettings();
            break;
    }
}

let currentMenuMode = 1;
let onCampaignScreen = false;
function selectMenuMode(x) {
    let containerCenter;
    if (document.getElementsByClassName("container")[1].style.display != "none") containerCenter = document.getElementById('modeSelectContainer').offsetHeight / 2; //Recalculate containerCenter
    document.getElementsByClassName("menuArrow")[0].style.top = (containerCenter - 90) + "px";
    document.getElementsByClassName("menuArrow")[1].style.top = (containerCenter + 90) + "px";
    document.getElementsByClassName("menuArrow")[0].style.display = x!=1 ? "block" : "none";
    document.getElementsByClassName("menuArrow")[1].style.display = x!=3 ? "block" : "none";
    currentMenuMode = x;
    switch(x) {
        case 1:
            setPreset("classicStyle");
            document.getElementsByClassName("menuMode")[0].style.top = containerCenter + "px";
            document.getElementsByClassName("menuMode")[1].style.top = (containerCenter + 200) + "px";
            document.getElementsByClassName("menuMode")[2].style.top = (containerCenter + 400) + "px";
            //document.getElementsByClassName("menuMode")[3].style.top = (containerCenter + 600) + "px";
            document.getElementsByClassName("menuMode")[0].style.left = "60px";
            document.getElementsByClassName("menuMode")[1].style.left = "10px";
            document.getElementsByClassName("menuMode")[2].style.left = "10px";
            //document.getElementsByClassName("menuMode")[3].style.left = "10px";
            document.getElementsByClassName("menuMode")[0].style.filter = "none";
            document.getElementsByClassName("menuMode")[1].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[2].style.filter = "brightness(0.7)";
            //document.getElementsByClassName("menuMode")[3].style.filter = "brightness(0.7)";
            break;
        case 2:
            setPreset("masterStyle");
            document.getElementsByClassName("menuMode")[0].style.top = (containerCenter - 200) + "px";
            document.getElementsByClassName("menuMode")[1].style.top = containerCenter + "px";
            document.getElementsByClassName("menuMode")[2].style.top = (containerCenter + 200) + "px";
            //document.getElementsByClassName("menuMode")[3].style.top = (containerCenter + 400) + "px";
            document.getElementsByClassName("menuMode")[0].style.left = "10px";
            document.getElementsByClassName("menuMode")[1].style.left = "60px";
            document.getElementsByClassName("menuMode")[2].style.left = "10px";
            //document.getElementsByClassName("menuMode")[3].style.left = "10px";
            document.getElementsByClassName("menuMode")[0].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[1].style.filter = "none";
            document.getElementsByClassName("menuMode")[2].style.filter = "brightness(0.7)";
            //document.getElementsByClassName("menuMode")[3].style.filter = "brightness(0.7)";
            break;
        case 3:
            setPreset("dragonStyle");
            document.getElementsByClassName("menuMode")[0].style.top = (containerCenter - 400) + "px";
            document.getElementsByClassName("menuMode")[1].style.top = (containerCenter - 200) + "px";
            document.getElementsByClassName("menuMode")[2].style.top = containerCenter + "px";
            //document.getElementsByClassName("menuMode")[3].style.top = (containerCenter + 200) + "px";
            document.getElementsByClassName("menuMode")[0].style.left = "10px";
            document.getElementsByClassName("menuMode")[1].style.left = "10px";
            document.getElementsByClassName("menuMode")[2].style.left = "60px";
            //document.getElementsByClassName("menuMode")[3].style.left = "10px";
            document.getElementsByClassName("menuMode")[0].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[1].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[2].style.filter = "none";
            //document.getElementsByClassName("menuMode")[3].style.filter = "brightness(0.7)";
            break;
        case 4:
            document.getElementsByClassName("menuMode")[0].style.top = (containerCenter - 600) + "px";
            document.getElementsByClassName("menuMode")[1].style.top = (containerCenter - 400) + "px";
            document.getElementsByClassName("menuMode")[2].style.top = (containerCenter - 200) + "px";
            //document.getElementsByClassName("menuMode")[3].style.top = containerCenter + "px";
            document.getElementsByClassName("menuMode")[0].style.left = "10px";
            document.getElementsByClassName("menuMode")[1].style.left = "10px";
            document.getElementsByClassName("menuMode")[2].style.left = "10px";
            //document.getElementsByClassName("menuMode")[3].style.left = "60px";
            document.getElementsByClassName("menuMode")[0].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[1].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[2].style.filter = "brightness(0.7)";
            //document.getElementsByClassName("menuMode")[3].style.filter = "none";
            break;
    }
    displayModeInfo(x);
}
selectMenuMode(1);

function displayModeInfo(x) {
    //Overall grade info
    overallGradeCtx.clearRect(0, 0, 140, 40);
    overallGradeCtx.drawImage(overallGradeInfoImage, 8, 8);
    let overallPower = Math.min(game.bestPowers[0],30000) + Math.min(game.bestPowers[1],30000) + Math.min(game.bestPowers[2],39000);
    let overallGrade = Math.floor(overallPower / 3000);
    overallGradeCtx.drawImage(overallGradeImage, 0, overallGrade*32, 48, 32, 92, 0, 48, 32);
    //Overall power string
    let overallPowerString = Math.floor(overallPower).toString();
    if (overallPowerString == "0") overallPowerString = "";
    for (let i = 0; i < (5-overallPowerString.length); i++) overallGradeCtx.drawImage(digitsSmall, 0, 24, 4, 6, 68 + i*4, 24, 4, 6); //Greyed out zeroes
    let overallPowerColor = overallPower >= 99000 ? 3 : 0;
    for (let i = 0; i < overallPowerString.length; i++) overallGradeCtx.drawImage(digitsSmall, overallPowerString[i] * 4, overallPowerColor * 6, 4, 6, 88 - (4*overallPowerString.length) + i*4, 24, 4, 6);
    //Classic power string
    let classicPowerString = Math.floor(Math.min(game.bestPowers[0],30000)).toString();
    if (classicPowerString == "0") classicPowerString = "";
    for (let i = 0; i < (5-classicPowerString.length); i++) overallGradeCtx.drawImage(digitsSmall, 0, 24, 4, 6, 11 + i*4, 32, 4, 6); //Greyed out zeroes
    let classicPowerColor = game.bestPowers[0] >= 30000 ? 3 : 0;
    for (let i = 0; i < classicPowerString.length; i++) overallGradeCtx.drawImage(digitsSmall, classicPowerString[i] * 4, classicPowerColor * 6, 4, 6, 31 - (4*classicPowerString.length) + i*4, 32, 4, 6);
    //Master power string
    let masterPowerString = Math.floor(Math.min(game.bestPowers[1],30000)).toString();
    if (masterPowerString == "0") masterPowerString = "";
    for (let i = 0; i < (5-masterPowerString.length); i++) overallGradeCtx.drawImage(digitsSmall, 0, 24, 4, 6, 39 + i*4, 32, 4, 6); //Greyed out zeroes
    let masterPowerColor = game.bestPowers[1] >= 30000 ? 3 : 0;
    for (let i = 0; i < masterPowerString.length; i++) overallGradeCtx.drawImage(digitsSmall, masterPowerString[i] * 4, masterPowerColor * 6, 4, 6, 59 - (4*masterPowerString.length) + i*4, 32, 4, 6);
    //Dragon power string
    let dragonPowerString = Math.floor(Math.min(game.bestPowers[2],39000)).toString();
    if (dragonPowerString == "0") dragonPowerString = "";
    for (let i = 0; i < (5-dragonPowerString.length); i++) overallGradeCtx.drawImage(digitsSmall, 0, 24, 4, 6, 67 + i*4, 32, 4, 6); //Greyed out zeroes
    let dragonPowerColor = game.bestPowers[2] >= 39000 ? 3 : 0;
    for (let i = 0; i < dragonPowerString.length; i++) overallGradeCtx.drawImage(digitsSmall, dragonPowerString[i] * 4, dragonPowerColor * 6, 4, 6, 87 - (4*dragonPowerString.length) + i*4, 32, 4, 6);

    //Mode info
    let bestPowerString, bestScoreString, bestLevelString, bestLevelColor;
    switch(x) {
        case 1:
            document.getElementById("modeInfoImage").src = "img/style1.png";
            document.getElementById("modeInfo").innerHTML = "<b>Info:</b><br>Reminiscent of classic tetris games.<br>-Scored like NES tetris (No combo! Best scores come from getting tetrises.)<br>-DAS gets faster as you go<br>-Hard drop is enabled! You can use it to get fast times.<br>-Classic style power is based on level reached, average section time, and points."
            //document.getElementById("modeInfo").innerHTML += "<br><br><img src='img/medal1.png' style='height: 30px; vertical-align: middle'> <b>Bronze medal requirements:</b><br>-Best score: 150,000<br>-Best level: 700"
            //document.getElementById("modeInfo").innerHTML += "<br><br><img src='img/medal2.png' style='height: 30px; vertical-align: middle'> <b>Silver medal requirements:</b><br>-Best score: 300,000<br>-Best level: 999<br>-All section times under 1:15:00"
            modeStatsCtx.clearRect(0, 0, 130, 160);
            modeStatsCtx.fillStyle = "#eaeaff";
            modeStatsCtx.fillRect(0, 1, 129, 1);
            modeStatsCtx.fillStyle = "#000008";
            modeStatsCtx.fillRect(1, 2, 129, 1);
            //Best power
            modeStatsCtx.drawImage(modeStatsImage, 0, 0, 130, 8, 0, 8, 130, 8);
            bestPowerString = Math.floor(game.bestPowers[0]).toString().padStart(5, "0");
            for (let i = 0; i < bestPowerString.length; i++) {
                modeStatsCtx.drawImage(digitsSmall, bestPowerString[i] * 4, 0, 4, 6, 47 + i*4, 8, 4, 6);
            }
            modeStatsCtx.drawImage(modeStatsImage, 0, 8, 130, 8, 0, 16, 130, 8);
            //Best score
            modeStatsCtx.drawImage(modeStatsImage, 0, 24, 130, 16, 0, 24, 130, 16);
            bestScoreString = Math.floor(game.bestScores[0]).toString();
            for (let i = 0; i < bestScoreString.length; i++) {
                modeStatsCtx.drawImage(digitsSmall, bestScoreString[i] * 4, 0, 4, 6, 45 + i*4, 24, 4, 6);
            }
            //Best level
            bestLevelString = Math.floor(game.bestLevels[0]).toString();
            bestLevelColor = game.bestLevels[0] >= 999 ? 3 : 0;
            for (let i = 0; i < bestLevelString.length; i++) {
                modeStatsCtx.drawImage(digitsSmall, bestLevelString[i] * 4, bestLevelColor * 6, 4, 6, 44 + i*4, 32, 4, 6);
            }
            //Best highest section time
            if (game.bestLevels[0] >= 999) {
                modeStatsCtx.drawImage(modeStatsImage, 0, 48, 130, 8, 0, 40, 130, 8);
                let bestHighestSectionTime = game.bestHighestSectionTimes[0];
                let timeString = convertToTime(bestHighestSectionTime);
                let timeColor = getTimeColor(bestHighestSectionTime);

                for (let i=0;i<timeString.length;i++) {
                    if (timeString[i] == ":") {modeStatsCtx.drawImage(digitsSmall, 40, timeColor*6, 4, 6, 89 + i*4, 40, 4, 6);}
                    else {modeStatsCtx.drawImage(digitsSmall, parseInt(timeString[i])*4, timeColor*6, 4, 6, 89 + i*4, 40, 4, 6);}
                }
            }
            else {
                modeStatsCtx.drawImage(modeStatsImage, 0, 40, 130, 8, 0, 40, 130, 8);
            }
            //Best average section time
            if (game.bestLevels[0] >= 999) {
                modeStatsCtx.drawImage(modeStatsImage, 0, 56, 130, 8, 0, 48, 130, 8);
                let bestAverageSectionTime = game.bestAverageSectionTimes[0];
                let timeString = convertToTime(bestAverageSectionTime);
                let timeColor = getTimeColor(bestAverageSectionTime);

                for (let i=0;i<timeString.length;i++) {
                    if (timeString[i] == ":") {modeStatsCtx.drawImage(digitsSmall, 40, timeColor*6, 4, 6, 88 + i*4, 48, 4, 6);}
                    else {modeStatsCtx.drawImage(digitsSmall, parseInt(timeString[i])*4, timeColor*6, 4, 6, 88 + i*4, 48, 4, 6);}
                }
            }
            else {
                modeStatsCtx.drawImage(modeStatsImage, 0, 40, 130, 8, 0, 48, 130, 8);
            }
            //Best individual section times
            modeStatsCtx.drawImage(modeStatsImage, 0, 64, 130, 8, 0, 64, 130, 8);
            for (let i = 0; i < 10; i++) {
                if (game.classicStyleBestSectionTimes[i]) {
                    let sectionTime = game.classicStyleBestSectionTimes[i];
                    let timeString = convertToTime(sectionTime);
                    let sectionTimeColor = getTimeColor(sectionTime);

                    for (let j=0;j<timeString.length;j++) {
                        if (timeString[j] == ":") {modeStatsCtx.drawImage(digitsSmall, 40, sectionTimeColor*6, 4, 6, j*4, 72+i*8, 4, 6);}
                        else {modeStatsCtx.drawImage(digitsSmall, parseInt(timeString[j])*4, sectionTimeColor*6, 4, 6, j*4, 72+i*8, 4, 6);}
                    }
                }
                else {
                    modeStatsCtx.drawImage(digitsSmall, 44, 0, 4, 6, 0, 72+i*8, 4, 6);
                    modeStatsCtx.drawImage(digitsSmall, 44, 0, 4, 6, 4, 72+i*8, 4, 6);
                    modeStatsCtx.drawImage(digitsSmall, 44, 0, 4, 6, 8, 72+i*8, 4, 6);
                }
            }
            break;
        case 2:
            document.getElementById("modeInfoImage").src = "img/style2.png";
            document.getElementById("modeInfo").innerHTML = "<b>Info:</b><br>Reminiscent of Tetris: The Grand Master.<br>-Scored like TGM (Best scores come from combos!)<br>-Master style power is based on level reached and average section time.";
            modeStatsCtx.clearRect(0, 0, 130, 160);
            modeStatsCtx.fillStyle = "#eaeaff";
            modeStatsCtx.fillRect(0, 1, 129, 1);
            modeStatsCtx.fillStyle = "#000008";
            modeStatsCtx.fillRect(1, 2, 129, 1);
            //Best power
            modeStatsCtx.drawImage(modeStatsImage, 0, 0, 130, 8, 0, 8, 130, 8);
            bestPowerString = Math.floor(game.bestPowers[1]).toString().padStart(5, "0");
            for (let i = 0; i < bestPowerString.length; i++) {
                modeStatsCtx.drawImage(digitsSmall, bestPowerString[i] * 4, 0, 4, 6, 47 + i*4, 8, 4, 6);
            }
            modeStatsCtx.drawImage(modeStatsImage, 0, 8, 130, 8, 0, 16, 130, 8);
            //Best score
            modeStatsCtx.drawImage(modeStatsImage, 0, 24, 130, 16, 0, 24, 130, 16);
            bestScoreString = Math.floor(game.bestScores[1]).toString();
            for (let i = 0; i < bestScoreString.length; i++) {
                modeStatsCtx.drawImage(digitsSmall, bestScoreString[i] * 4, 0, 4, 6, 45 + i*4, 24, 4, 6);
            }
            //Best level
            bestLevelString = Math.floor(game.bestLevels[1]).toString();
            bestLevelColor = game.bestLevels[1] >= 999 ? 3 : 0;
            for (let i = 0; i < bestLevelString.length; i++) {
                modeStatsCtx.drawImage(digitsSmall, bestLevelString[i] * 4, bestLevelColor * 6, 4, 6, 44 + i*4, 32, 4, 6);
            }
            //Best highest section time
            modeStatsCtx.drawImage(modeStatsImage, 0, 40, 130, 8, 0, 40, 130, 8);
            //Best average section time
            modeStatsCtx.drawImage(modeStatsImage, 0, 40, 130, 8, 0, 48, 130, 8);
            //Best individual section times
            modeStatsCtx.drawImage(modeStatsImage, 0, 64, 130, 8, 0, 64, 130, 8);
            for (let i = 0; i < 10; i++) {
                if (game.masterStyleBestSectionTimes[i]) {
                    let sectionTime = game.masterStyleBestSectionTimes[i];
                    let timeString = convertToTime(sectionTime);
                    let sectionTimeColor = getTimeColor(sectionTime);

                    for (let j=0;j<timeString.length;j++) {
                        if (timeString[j] == ":") {modeStatsCtx.drawImage(digitsSmall, 40, sectionTimeColor*6, 4, 6, j*4, 72+i*8, 4, 6);}
                        else {modeStatsCtx.drawImage(digitsSmall, parseInt(timeString[j])*4, sectionTimeColor*6, 4, 6, j*4, 72+i*8, 4, 6);}
                    }
                }
                else {
                    modeStatsCtx.drawImage(digitsSmall, 44, 0, 4, 6, 0, 72+i*8, 4, 6);
                    modeStatsCtx.drawImage(digitsSmall, 44, 0, 4, 6, 4, 72+i*8, 4, 6);
                    modeStatsCtx.drawImage(digitsSmall, 44, 0, 4, 6, 8, 72+i*8, 4, 6);
                }
            }
            break;
        case 3:
            document.getElementById("modeInfoImage").src = "img/style3.png";
            document.getElementById("modeInfo").innerHTML = "<b>Info:</b><br>Reminiscent of T.A. Death. Quite difficult!<br>-Scored like TGM (Best scores come from combos!)<br>-DAS, ARE and lock delay get faster as you go<br>-Dragon style power is based on level reached and average section time.";
            modeStatsCtx.clearRect(0, 0, 130, 160);
            modeStatsCtx.fillStyle = "#eaeaff";
            modeStatsCtx.fillRect(0, 1, 129, 1);
            modeStatsCtx.fillStyle = "#000008";
            modeStatsCtx.fillRect(1, 2, 129, 1);
            //Best power
            modeStatsCtx.drawImage(modeStatsImage, 0, 0, 130, 8, 0, 8, 130, 8);
            bestPowerString = Math.floor(game.bestPowers[2]).toString().padStart(5, "0");
            for (let i = 0; i < bestPowerString.length; i++) {
                modeStatsCtx.drawImage(digitsSmall, bestPowerString[i] * 4, 0, 4, 6, 47 + i*4, 8, 4, 6);
            }
            modeStatsCtx.drawImage(modeStatsImage, 0, 16, 130, 8, 0, 16, 130, 8);
            //Best score
            modeStatsCtx.drawImage(modeStatsImage, 0, 24, 130, 16, 0, 24, 130, 16);
            bestScoreString = Math.floor(game.bestScores[2]).toString();
            for (let i = 0; i < bestScoreString.length; i++) {
                modeStatsCtx.drawImage(digitsSmall, bestScoreString[i] * 4, 0, 4, 6, 45 + i*4, 24, 4, 6);
            }
            //Best level
            bestLevelString = Math.floor(game.bestLevels[2]).toString();
            bestLevelColor = game.bestLevels[2] >= 999 ? 3 : 0;
            for (let i = 0; i < bestLevelString.length; i++) {
                modeStatsCtx.drawImage(digitsSmall, bestLevelString[i] * 4, bestLevelColor * 6, 4, 6, 44 + i*4, 32, 4, 6);
            }
            //Best highest section time
            modeStatsCtx.drawImage(modeStatsImage, 0, 40, 130, 8, 0, 40, 130, 8);
            //Best average section time
            modeStatsCtx.drawImage(modeStatsImage, 0, 40, 130, 8, 0, 48, 130, 8);
            //Best individual section times
            modeStatsCtx.drawImage(modeStatsImage, 0, 64, 130, 8, 0, 64, 130, 8);
            for (let i = 0; i < 10; i++) {
                if (game.dragonStyleBestSectionTimes[i]) {
                    let sectionTime = game.dragonStyleBestSectionTimes[i];
                    let timeString = convertToTime(sectionTime);
                    let sectionTimeColor = getTimeColor(sectionTime);

                    for (let j=0;j<timeString.length;j++) {
                        if (timeString[j] == ":") {modeStatsCtx.drawImage(digitsSmall, 40, sectionTimeColor*6, 4, 6, j*4, 72+i*8, 4, 6);}
                        else {modeStatsCtx.drawImage(digitsSmall, parseInt(timeString[j])*4, sectionTimeColor*6, 4, 6, j*4, 72+i*8, 4, 6);}
                    }
                }
                else {
                    modeStatsCtx.drawImage(digitsSmall, 44, 0, 4, 6, 0, 72+i*8, 4, 6);
                    modeStatsCtx.drawImage(digitsSmall, 44, 0, 4, 6, 4, 72+i*8, 4, 6);
                    modeStatsCtx.drawImage(digitsSmall, 44, 0, 4, 6, 8, 72+i*8, 4, 6);
                }
            }
            break;
        case 4:
            modeStatsCtx.clearRect(0, 0, 130, 160);
            modeStatsCtx.fillStyle = "#eaeaff";
            modeStatsCtx.fillRect(0, 1, 129, 1);
            modeStatsCtx.fillStyle = "#000008";
            modeStatsCtx.fillRect(1, 2, 129, 1);
            document.getElementById("modeInfoImage").src = "img/style4.png";
            document.getElementById("modeInfo").innerHTML = "The funny fishing minigame. Not yet implemented.";
            break;
    }
}