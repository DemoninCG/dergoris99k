function switchToTab(x) {
    switch(x) {
        case 1:
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