function switchToTab(x) {
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
    let containerCenter = document.getElementById('modeSelectContainer').offsetHeight / 2;
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
            break;
    }
}
selectMenuMode(1);