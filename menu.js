//Fetch the mode info canvas element and its 2D drawing context
const modeStatsCanvas = document.getElementById("modeStatsCanvas");
const modeStatsCtx = modeStatsCanvas && modeStatsCanvas.getContext("2d");

let modeStatsCanvasImage = new Image();
modeStatsCanvasImage.src = "img/modeInfo.png";
let modeStatsDigits = new Image();
modeStatsDigits.src = "img/main/digitsSmall.png";

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
            backgroundColorDestination = [80, 120, 80];
            document.getElementsByClassName("container")[0].style.top = "0";
            document.getElementsByClassName("container")[0].style.left = "-100vw";
            document.getElementsByClassName("container")[1].style.top = "0";
            document.getElementsByClassName("container")[1].style.left = "0";
            document.getElementsByClassName("container")[2].style.top = "0";
            document.getElementsByClassName("container")[2].style.left = "100vw";
            document.getElementsByClassName("container")[3].style.top = "100vh";
            document.getElementsByClassName("container")[3].style.left = "-100vw";
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
            break;
    }
}

let currentMenuMode = 1;
let onCampaignScreen = false;
function selectMenuMode(x) {
    let containerCenter = document.getElementById('modeSelectContainer').offsetHeight / 2; //Recalculate containerCenter
    document.getElementsByClassName("menuArrow")[0].style.top = (containerCenter - 90) + "px";
    document.getElementsByClassName("menuArrow")[1].style.top = (containerCenter + 90) + "px";
    currentMenuMode = x;
    switch(x) {
        case 1:
            document.getElementsByClassName("menuMode")[0].style.top = containerCenter + "px";
            document.getElementsByClassName("menuMode")[1].style.top = (containerCenter + 200) + "px";
            document.getElementsByClassName("menuMode")[2].style.top = (containerCenter + 400) + "px";
            document.getElementsByClassName("menuMode")[3].style.top = (containerCenter + 600) + "px";
            document.getElementsByClassName("menuMode")[0].style.left = "60px";
            document.getElementsByClassName("menuMode")[1].style.left = "10px";
            document.getElementsByClassName("menuMode")[2].style.left = "10px";
            document.getElementsByClassName("menuMode")[3].style.left = "10px";
            document.getElementsByClassName("menuMode")[0].style.filter = "none";
            document.getElementsByClassName("menuMode")[1].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[2].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[3].style.filter = "brightness(0.7)";
            break;
        case 2:
            document.getElementsByClassName("menuMode")[0].style.top = (containerCenter - 200) + "px";
            document.getElementsByClassName("menuMode")[1].style.top = containerCenter + "px";
            document.getElementsByClassName("menuMode")[2].style.top = (containerCenter + 200) + "px";
            document.getElementsByClassName("menuMode")[3].style.top = (containerCenter + 400) + "px";
            document.getElementsByClassName("menuMode")[0].style.left = "10px";
            document.getElementsByClassName("menuMode")[1].style.left = "60px";
            document.getElementsByClassName("menuMode")[2].style.left = "10px";
            document.getElementsByClassName("menuMode")[3].style.left = "10px";
            document.getElementsByClassName("menuMode")[0].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[1].style.filter = "none";
            document.getElementsByClassName("menuMode")[2].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[3].style.filter = "brightness(0.7)";
            break;
        case 3:
            document.getElementsByClassName("menuMode")[0].style.top = (containerCenter - 400) + "px";
            document.getElementsByClassName("menuMode")[1].style.top = (containerCenter - 200) + "px";
            document.getElementsByClassName("menuMode")[2].style.top = containerCenter + "px";
            document.getElementsByClassName("menuMode")[3].style.top = (containerCenter + 200) + "px";
            document.getElementsByClassName("menuMode")[0].style.left = "10px";
            document.getElementsByClassName("menuMode")[1].style.left = "10px";
            document.getElementsByClassName("menuMode")[2].style.left = "60px";
            document.getElementsByClassName("menuMode")[3].style.left = "10px";
            document.getElementsByClassName("menuMode")[0].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[1].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[2].style.filter = "none";
            document.getElementsByClassName("menuMode")[3].style.filter = "brightness(0.7)";
            break;
        case 4:
            document.getElementsByClassName("menuMode")[0].style.top = (containerCenter - 600) + "px";
            document.getElementsByClassName("menuMode")[1].style.top = (containerCenter - 400) + "px";
            document.getElementsByClassName("menuMode")[2].style.top = (containerCenter - 200) + "px";
            document.getElementsByClassName("menuMode")[3].style.top = containerCenter + "px";
            document.getElementsByClassName("menuMode")[0].style.left = "10px";
            document.getElementsByClassName("menuMode")[1].style.left = "10px";
            document.getElementsByClassName("menuMode")[2].style.left = "10px";
            document.getElementsByClassName("menuMode")[3].style.left = "60px";
            document.getElementsByClassName("menuMode")[0].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[1].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[2].style.filter = "brightness(0.7)";
            document.getElementsByClassName("menuMode")[3].style.filter = "none";
            break;
    }
    displayModeInfo(x);
}
selectMenuMode(1);

function displayModeInfo(x) {
    switch(x) {
        case 1:
            document.getElementById("modeInfoImage").src = "img/style1.png";
            document.getElementById("modeInfo").innerHTML = "<b>Info:</b><br>Reminiscent of classic tetris games.<br>Scored like NES tetris (No combo! Best scores come from getting tetrises.)<br>Classic style power is based on level reached, average section time, and points."
            modeStatsCtx.clearRect(0, 0, 130, 160);
            modeStatsCtx.fillStyle = "#eaeaff";
            modeStatsCtx.fillRect(0, 1, 129, 1);
            modeStatsCtx.fillStyle = "#000008";
            modeStatsCtx.fillRect(1, 2, 129, 1);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 0, 130, 8, 0, 8, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 8, 130, 8, 0, 16, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 24, 130, 16, 0, 24, 130, 16);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 40, 130, 8, 0, 40, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 40, 130, 8, 0, 48, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 64, 130, 8, 0, 64, 130, 8);
            for (let i = 0; i < 10; i++) {
                modeStatsCtx.drawImage(modeStatsDigits, 44, 0, 4, 6, 0, 72+i*8, 4, 6);
                modeStatsCtx.drawImage(modeStatsDigits, 44, 0, 4, 6, 4, 72+i*8, 4, 6);
                modeStatsCtx.drawImage(modeStatsDigits, 44, 0, 4, 6, 8, 72+i*8, 4, 6);
            }
            break;
        case 2:
            document.getElementById("modeInfoImage").src = "img/style2.png";
            document.getElementById("modeInfo").innerHTML = "<b>Info:</b><br>Reminiscent of Tetris: The Grand Master.<br>Scored like TGM (Best scores come from combos!)<br>Master style power is based on level reached and average section time.";
            modeStatsCtx.clearRect(0, 0, 130, 160);
            modeStatsCtx.fillStyle = "#eaeaff";
            modeStatsCtx.fillRect(0, 1, 129, 1);
            modeStatsCtx.fillStyle = "#000008";
            modeStatsCtx.fillRect(1, 2, 129, 1);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 0, 130, 8, 0, 8, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 16, 130, 8, 0, 16, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 24, 130, 16, 0, 24, 130, 16);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 40, 130, 8, 0, 40, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 40, 130, 8, 0, 48, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 64, 130, 8, 0, 64, 130, 8);
            for (let i = 0; i < 10; i++) {
                modeStatsCtx.drawImage(modeStatsDigits, 44, 0, 4, 6, 0, 72+i*8, 4, 6);
                modeStatsCtx.drawImage(modeStatsDigits, 44, 0, 4, 6, 4, 72+i*8, 4, 6);
                modeStatsCtx.drawImage(modeStatsDigits, 44, 0, 4, 6, 8, 72+i*8, 4, 6);
            }
            break;
        case 3:
            document.getElementById("modeInfoImage").src = "img/style3.png";
            document.getElementById("modeInfo").innerHTML = "<b>Info:</b><br>Reminiscent of T.A. Death.<br>Scored like TGM (Best scores come from combos!)<br>Dragon style power is based on level reached and average section time.";
            modeStatsCtx.clearRect(0, 0, 130, 160);
            modeStatsCtx.fillStyle = "#eaeaff";
            modeStatsCtx.fillRect(0, 1, 129, 1);
            modeStatsCtx.fillStyle = "#000008";
            modeStatsCtx.fillRect(1, 2, 129, 1);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 0, 130, 8, 0, 8, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 8, 130, 8, 0, 16, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 24, 130, 16, 0, 24, 130, 16);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 40, 130, 8, 0, 40, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 40, 130, 8, 0, 48, 130, 8);
            modeStatsCtx.drawImage(modeStatsCanvasImage, 0, 64, 130, 8, 0, 64, 130, 8);
            for (let i = 0; i < 10; i++) {
                modeStatsCtx.drawImage(modeStatsDigits, 44, 0, 4, 6, 0, 72+i*8, 4, 6);
                modeStatsCtx.drawImage(modeStatsDigits, 44, 0, 4, 6, 4, 72+i*8, 4, 6);
                modeStatsCtx.drawImage(modeStatsDigits, 44, 0, 4, 6, 8, 72+i*8, 4, 6);
            }
            break;
        case 4:
            document.getElementById("modeInfoImage").src = "img/style4.png";
            document.getElementById("modeInfo").innerHTML = "The funny fishing minigame. Not yet implemented.";
            break;
    }
}