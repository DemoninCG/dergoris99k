//Unresolved issues:
//DX's stupid alternate rotation point rotation
//DX uses NES font (should use its own font but no tff/woff exists afaik)

//To do:
//Make time display always on
//DX line piece rotation
//Write essay about SEMIPRO/TGM

function reset() {
    //Game settings
    settings = {
        startingLevel: 15,
        boardWidth: 10,
        boardHeight: 20,
        visuals: "nes",
        gameMechanics: "nes",
        segaDifficulty: "normal",
        randomizer: "nes",
        pieceColouring: "regular",
        softDrop: true,
        hardDrop: false,
        IRS: false,
        ARE: 10,
        ARELineClear: 30,
        overrideGameARE: false,
        softDropSpeed: 2,
        DASInitial: 16,
        DAS: 6,
        lockDelay: 0,
        lockReset: "step",
        timeDisplay: true,
    }
    //Game-specific variables
    board = []
    waitingForNextPiece = false
    currentPiece = 0 //I, O, T, S, Z, J, L
    nextPiece = 0
    pieceOrientation = 0
    pieceTopCorner = [0,0]
    piecePositions = []
    level = settings.startingLevel
    piecesDropped = [0,0,0,0,0,0,0]
    lastDroppedPieces = []
    score = 0
    lines = 0
    linesUntilNextLevel = 0
    time = 0
    softDropping = false
    currentPushdown = 0
    maxPushdown = 0
    currentDropTime = 0
    currentDASTime = 0
    currentLockTime = 0
    locking = false

    gamePlaying = false
    keysHeld = [false, false, false, false, false, false] //Left, Right, Up, Down, A, D
    timeOfLastUpdate = Date.now()
}

reset()

// Preload images
const images = {
	tiles: new Image(),
    hardDropTile: new Image(),
    board: new Image(),
    background: new Image(),
    sideInfo1: new Image(),
    sideInfo2: new Image(),
    sideInfo3: new Image(),
    sideInfo4: new Image(),
};

//Fetch the game canvas element and its 2D drawing context
const canvas = document.getElementById("game");
const ctx = canvas && canvas.getContext("2d");


if (ctx) ctx.imageSmoothingEnabled = false; //Disable image smoothing for pixelated look

function initialiseCanvasBoard() {
    if (settings.visuals === "gb") {
        canvas.height = Math.max(settings.boardHeight*8, 144)
        document.getElementById("textOverlay").style.height = Math.max(settings.boardHeight*8, 144) + "px"
        let leftSide = 120-settings.boardWidth*4;
        document.body.style.backgroundColor = "#84a563"
        images.tiles.src = "img/gb/tiles.png";
        images.hardDropTile.src = "img/gb/hardDropTile.png";
        images.board.src = "img/gb/boardSmall.png";
        //Draw the board
        for (let i=0;i<settings.boardHeight;i++) {
            ctx.drawImage(images.board, 0, (i*8)%24, 16, 8, leftSide, i*8, 16, 8)
            ctx.drawImage(images.board, 8, (i*8)%24, 8, 8, (8*settings.boardWidth)+leftSide+16, i*8, 8, 8)
        }
        ctx.fillStyle = "#c6de86"
        ctx.fillRect(leftSide+16, 0, (8*settings.boardWidth), (8*settings.boardHeight))
        //Draw the side info
        images.sideInfo1.src = "img/gb/sideInfo.png";
        ctx.drawImage(images.sideInfo1, (8*settings.boardWidth)+leftSide+24, 0, 56, 144)
        if (settings.boardHeight > 18) {
            for (let i=18;i<settings.boardHeight;i++) {
                ctx.drawImage(images.sideInfo1, 0, 35, 56, 8, (8*settings.boardWidth)+leftSide+24, i*8, 56, 8)
            }
        }

        //Add the text
        let scoreText = document.createElement("p")
        scoreText.classList = "GBText"
        scoreText.innerText = "0"
        scoreText.style.top = "22px"
        scoreText.style.right = (leftSide+6) + "px"
        scoreText.style.textAlign = "right"
        document.getElementById("textOverlay").appendChild(scoreText)
        let levelText = document.createElement("p")
        levelText.classList = "GBText"
        levelText.innerText = "0"
        levelText.style.top = "54px"
        levelText.style.right = (leftSide+15) + "px"
        scoreText.style.textAlign = "right"
        document.getElementById("textOverlay").appendChild(levelText)
        let linesText = document.createElement("p")
        linesText.classList = "GBText"
        linesText.innerText = "0"
        linesText.style.top = "78px"
        linesText.style.right = (leftSide+15) + "px"
        scoreText.style.textAlign = "right"
        document.getElementById("textOverlay").appendChild(linesText)
    }
    else if (settings.visuals === "nes") {
        canvas.height = Math.max(settings.boardHeight*8+40, 200)
        document.getElementById("textOverlay").style.height = Math.max(settings.boardHeight*8+40, 200) + "px"
        let leftSide = 160-settings.boardWidth*4;
        document.body.style.backgroundColor = "#747474"
        images.tiles.src = "img/nes/tiles.png";
        images.hardDropTile.src = "img/nes/hardDropTile.png";
        images.board.src = "img/nes/boardSmall.png";
        //Draw the corners
        ctx.drawImage(images.board, 0, 0, 8, 8, leftSide, 24, 8, 8);
        ctx.drawImage(images.board, 16, 0, 8, 8, 8*settings.boardWidth+leftSide+8, 24, 8, 8);
        ctx.drawImage(images.board, 0, 16, 8, 8, leftSide, 8*settings.boardHeight+32, 8, 8);
        ctx.drawImage(images.board, 16, 16, 8, 8, 8*settings.boardWidth+leftSide+8, 8*settings.boardHeight+32, 8, 8);
        ctx.drawImage(images.board, 8, 8, 8, 8, leftSide+8, 32, settings.boardWidth*8, settings.boardHeight*8);
        //Draw the sides
        for (let i=0;i<settings.boardWidth;i++) {
            ctx.drawImage(images.board, 8, 0, 8, 8, leftSide+8+i*8, 24, 8, 8);
            ctx.drawImage(images.board, 8, 16, 8, 8, leftSide+8+i*8, 8*settings.boardHeight+32, 8, 8);
        }
        for (let i=0;i<settings.boardHeight;i++) {
            ctx.drawImage(images.board, 0, 8, 8, 8, leftSide, 32+i*8, 8, 8);
            ctx.drawImage(images.board, 16, 8, 8, 8, leftSide+8*settings.boardWidth+8, 32+i*8, 8, 8);
        }
        //Draw the side info
        images.sideInfo1.src = "img/nes/sideInfo.png";
        ctx.drawImage(images.sideInfo1, 8*settings.boardWidth+leftSide+16, 0);
        if (!settings.timeDisplay) {
            ctx.fillStyle = "black"
            ctx.fillRect(8*settings.boardWidth+leftSide+24, 16, 32, 8)
        }

        images.sideInfo2.src = "img/nes/linesBoxSmall.png";
        ctx.drawImage(images.sideInfo2, 0, 0, 8, 24, leftSide, 0, 8, 24);
        ctx.drawImage(images.sideInfo2, 16, 0, 8, 24, 8*settings.boardWidth+leftSide+8, 0, 8, 24);
        for (let i=0;i<settings.boardWidth;i++) ctx.drawImage(images.sideInfo2, 8, 0, 8, 24, leftSide+8+i*8, 0, 8, 24);

        images.sideInfo3.src = "img/nes/statistics.png";
        ctx.drawImage(images.sideInfo3, 0, 0, 80, 152, leftSide-80, 48, 80, 152);

        images.sideInfo4.src = "img/nes/statPieces.png";
        ctx.drawImage(images.sideInfo4, (level%10)*24, 0, 24, 112, leftSide-64, 72, 24, 112);

        //Add the text
        let timeText = document.createElement("p")
        timeText.classList = "NESText"
        timeText.innerText = "0:00"
        timeText.style.top = "24px"
        timeText.style.left = (leftSide+104) + "px"
        document.getElementById("textOverlay").appendChild(timeText)
        let scoreText = document.createElement("p")
        scoreText.classList = "NESText"
        scoreText.innerText = "000000"
        scoreText.style.top = "48px"
        scoreText.style.left = (leftSide+104) + "px"
        document.getElementById("textOverlay").appendChild(scoreText)
        let levelText = document.createElement("p")
        levelText.classList = "NESText"
        levelText.innerText = "00"
        levelText.style.top = "152px"
        levelText.style.left = (leftSide+120) + "px"
        document.getElementById("textOverlay").appendChild(levelText)
        let linesText = document.createElement("p")
        linesText.classList = "NESText"
        linesText.innerText = "LINES-000"
        linesText.style.top = "8px"
        linesText.style.left = (leftSide+16) + "px"
        document.getElementById("textOverlay").appendChild(linesText)
        let statsText = document.createElement("p")
        statsText.classList = "NESText"
        statsText.style.color = "#b53121"
        statsText.innerHTML = "000<br><br>000<br><br>000<br><br>000<br><br>000<br><br>000<br><br>000"
        statsText.style.top = "80px"
        statsText.style.left = (leftSide-40) + "px"
        document.getElementById("textOverlay").appendChild(statsText)
    }
    if (settings.visuals === "dx") {
        if (settings.timeDisplay) {
            canvas.height = Math.max(settings.boardHeight*8, 160)
            document.getElementById("textOverlay").style.height = Math.max(settings.boardHeight*8, 160) + "px"
        }
        else {
            canvas.height = Math.max(settings.boardHeight*8, 144)
            document.getElementById("textOverlay").style.height = Math.max(settings.boardHeight*8, 144) + "px"
        }
        let leftSide = 120-settings.boardWidth*4;
        document.body.style.backgroundColor = "#28a078"
        images.tiles.src = "img/dx/tiles.png";
        images.hardDropTile.src = "img/dx/hardDropTile.png";
        images.board.src = "img/dx/boardSmall.png";
        //Draw the board
        for (let i=0;i<settings.boardHeight;i++) {
            ctx.drawImage(images.board, 0, (i*8)%48, 16, 8, leftSide, i*8, 16, 8)
            ctx.drawImage(images.board, 8, (i*8)%24, 8, 8, (8*settings.boardWidth)+leftSide+16, i*8, 8, 8)
        }
        let backgroundColor = Math.floor(Math.min(level,30)/5)
        ctx.fillStyle = dxBackgroundColours[backgroundColor]
        ctx.fillRect(leftSide+16, 0, (8*settings.boardWidth), (8*settings.boardHeight))
        //Draw the side info
        images.sideInfo1.src = "img/dx/sideInfo.png";
        ctx.drawImage(images.sideInfo1, 0, 0, 56, 144, (8*settings.boardWidth)+leftSide+24, 0, 56, 144)
        if (settings.boardHeight > 18) {
            for (let i=18;i<settings.boardHeight;i++) {
                ctx.drawImage(images.sideInfo1, 0, 160+(i*8)%16, 56, 8, (8*settings.boardWidth)+leftSide+24, i*8, 56, 8)
            }
        }

        //Add the text
        let scoreText = document.createElement("p")
        scoreText.classList = "DXText"
        scoreText.innerText = "0"
        scoreText.style.top = "78px"
        scoreText.style.right = (leftSide-1) + "px"
        scoreText.style.textAlign = "right"
        document.getElementById("textOverlay").appendChild(scoreText)
        let levelText = document.createElement("p")
        levelText.classList = "DXText"
        levelText.innerText = "0"
        levelText.style.top = "102px"
        levelText.style.right = (leftSide+7) + "px"
        scoreText.style.textAlign = "right"
        document.getElementById("textOverlay").appendChild(levelText)
        let linesText = document.createElement("p")
        linesText.classList = "DXText"
        linesText.innerText = "0"
        linesText.style.top = "126px"
        linesText.style.right = (leftSide+7) + "px"
        scoreText.style.textAlign = "right"
        document.getElementById("textOverlay").appendChild(linesText)
    }
    if (settings.visuals === "sega") {
        canvas.height = Math.max(settings.boardHeight*8+48, 225)
        document.getElementById("textOverlay").style.height = Math.max(settings.boardHeight*8+48, 225) + "px"
        let leftSide = 152-settings.boardWidth*4;
        document.body.style.backgroundColor = "#333"
        images.tiles.src = "img/sega/tiles.png";
        images.hardDropTile.src = "img/sega/hardDropTile.png";
        images.board.src = "img/sega/board.png";
        images.background.src = "img/sega/backgrounds.png";
        let currentBackground = segaBackgroundLevels[Math.min(level, 15)]
        ctx.drawImage(images.background, currentBackground*320, 0, 320, 225, 0, 0, 320, 225)
        //Draw the corners
        ctx.drawImage(images.board, 0, 0, 8, 8, leftSide, 24, 8, 8);
        ctx.drawImage(images.board, 88, 0, 8, 8, 8*settings.boardWidth+leftSide+8, 24, 8, 8);
        ctx.drawImage(images.board, 0, 168, 8, 16, leftSide, 8*settings.boardHeight+32, 8, 16);
        ctx.drawImage(images.board, 88, 168, 8, 16, 8*settings.boardWidth+leftSide+8, 8*settings.boardHeight+32, 8, 16);
        ctx.fillStyle = "black"
        ctx.fillRect(leftSide+8, 32, settings.boardWidth*8, settings.boardHeight*8);
        //Draw the sides
        for (let i=0;i<Math.min(settings.boardHeight,20);i++) {
            ctx.drawImage(images.board, 0, i*8+8, 8, 8, leftSide, i*8+32, 8, 8);
            ctx.drawImage(images.board, 88, i*8+8, 8, 8, 8*settings.boardWidth+leftSide+8, i*8+32, 8, 8);
        }
        if (settings.boardHeight > 20) {
            for (let i=20;i<settings.boardHeight;i++) {
                ctx.drawImage(images.board, 0, 160, 8, 8, leftSide, i*8+32, 8, 8);
                ctx.drawImage(images.board, 88, 160, 8, 8, 8*settings.boardWidth+leftSide+8, i*8+32, 8, 8);
            }
        
        }
        for (let i=0;i<settings.boardWidth/2;i++) {
            ctx.drawImage(images.board, 8+Math.min(i,5)*8, 0, 8, 8, leftSide+i*8+8, 24, 8, 8);
            ctx.drawImage(images.board, 80-Math.min(i,5)*8, 0, 8, 8, 8*settings.boardWidth+leftSide-i*8, 24, 8, 8);
            ctx.drawImage(images.board, 8+Math.min(i,5)*8, 168, 8, 16, leftSide+i*8+8, 8*settings.boardHeight+32, 8, 16);
            ctx.drawImage(images.board, 80-Math.min(i,5)*8, 168, 8, 16, 8*settings.boardWidth+leftSide-i*8, 8*settings.boardHeight+32, 8, 16);
        }
        //Draw the side info
        images.sideInfo1.src = "img/sega/sideInfo.png";
        ctx.drawImage(images.sideInfo1, leftSide-56, 16);
    }
}

function startGame() {
    document.getElementById("settings").style.display = "none"
    document.getElementById("game").style.display = "block"
    document.getElementById("textOverlay").style.display = "block"
    level = settings.startingLevel
    if (settings.gameMechanics == "gb") {
        linesUntilNextLevel = level*10+10
        currentDropTime = getDropInterval()
    }
    else if (settings.gameMechanics == "nes") {
        linesUntilNextLevel = nesLevelLinesLeft[level]
        currentDropTime = 90
    }
    else if (settings.gameMechanics == "dx") {
        linesUntilNextLevel = level*10+10
        currentDropTime = 32
    }
    else if (settings.gameMechanics == "sega") {
        linesUntilNextLevel = 4
        //currentDropTime = 32
    }
    gamePlaying = true
    initialiseCanvasBoard()
    for (let i=0;i<settings.boardHeight;i++) board.push(Array(settings.boardWidth).fill(0))
    placePiece(getRandomPiece())
    nextPiece = getRandomPiece()
    setNextPieceVisuals(nextPiece)
    updateVisuals()
}

function updateVariables() {
    if (!gamePlaying) {timeOfLastUpdate = Date.now(); return}
    let timeMultiplier = Math.max(Date.now() - timeOfLastUpdate, 1) / 1000
    time += timeMultiplier

    //Update DAS
    if (keysHeld[0]) {
        if (!checkCanMoveLeft()) {currentDASTime = 0}
        else {
            currentDASTime -= (timeMultiplier*60)
            if (currentDASTime <= 0) {
                moveLeft()
                currentDASTime = settings.DAS
            }
        }
    }
    else if (keysHeld[1]) {
        if (!checkCanMoveRight()) {currentDASTime = 0}
        else {
            currentDASTime -= (timeMultiplier*60)
            if (currentDASTime <= 0) {
                moveRight()
                currentDASTime = settings.DAS
            }
        }
    }

    //Update the lock time
    if (checkPieceLanded(piecePositions) && locking) {
        currentLockTime -= (timeMultiplier*60)
        updateVisuals()
    }
    //Update the drop time
    currentDropTime -= (timeMultiplier*60)
    while (currentDropTime <= 0.01) {
        if (waitingForNextPiece) {
            placePiece(nextPiece)
            nextPiece = getRandomPiece()
            setNextPieceVisuals(nextPiece)
            waitingForNextPiece = false
            updateVisuals()
            if (settings.gameMechanics == "dx") {currentDropTime = 32}
            else {currentDropTime = getDropInterval()}
            //Initial rotation system (IRS)
            if (settings.IRS && keysHeld[4]) {
                rotatePiece(true, true)
            }
            else if (settings.IRS && keysHeld[5]) {
                rotatePiece(false, true)
            }
        }
        else if (checkPieceLanded(piecePositions) && (locking || settings.lockDelay == 0) && (currentLockTime <= 0.01 || softDropping)) {
            landPiece()
        }
        else {
            if (!checkPieceLanded(piecePositions)) {
                if (settings.lockReset == "step") locking = false
                piecePositions[0][0]++
                piecePositions[1][0]++
                piecePositions[2][0]++
                piecePositions[3][0]++
                pieceTopCorner[0]++
            }
            //Holding the down key for softdrop
            if (settings.softDrop && softDropping) {
                currentDropTime += Math.min(getDropInterval(), settings.softDropSpeed)
                currentPushdown++
                if (settings.gameMechanics == "dx") score++
                if (currentPushdown > maxPushdown) maxPushdown = currentPushdown
            }
            else if (locking) {currentDropTime = 1}
            else {currentDropTime += getDropInterval()}
            updateVisuals()
            if (checkPieceLanded(piecePositions) && !locking && settings.lockDelay != 0) {locking = true; currentLockTime = settings.lockDelay}
        }
    }

    timeOfLastUpdate = Date.now()
}

setInterval(updateVariables, 1000/60)

function updateVisuals() {
    if (settings.visuals == "gb" || settings.visuals == "dx") {
        let leftSide = 120-settings.boardWidth*4;
        if (settings.visuals == "dx") {
            if (!gamePlaying) {ctx.fillStyle = "red"}
            else {ctx.fillStyle = dxBackgroundColours[Math.floor(Math.min(level,30)/5)]}
        }
        else {
            ctx.fillStyle = "#c6de86"
        }
        ctx.fillRect(leftSide+16, 0, (8*settings.boardWidth), (8*settings.boardHeight))
        if (!waitingForNextPiece) {
            //Draw the ghost piece if hard drop is enabled
            if (settings.hardDrop) {
                let tempPiecePositions = []
                for (let i=0;i<4;i++) tempPiecePositions.push([...piecePositions[i]])
                while (!checkPieceLanded(tempPiecePositions)) {
                    for (let i=0;i<4;i++) tempPiecePositions[i][0]++
                }
                for (let i=0;i<4;i++) {
                    if (tempPiecePositions[i][0] < 0) continue
                    ctx.drawImage(images.hardDropTile, tempPiecePositions[i][1]*8+leftSide+16, tempPiecePositions[i][0]*8, 8, 8)
                }
            }
            //Regular piece
            for (let i=0;i<piecePositions.length;i++) {
                if (piecePositions[i][0] < 0) continue
                if (currentPiece == 0) {
                    if (settings.visuals == "dx" && settings.pieceColouring == "monotoneAll") {
                        if (pieceOrientation % 2==0 && i==0) {ctx.drawImage(images.tiles, 8, 48, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==0 && (i==1 || i==2)) {ctx.drawImage(images.tiles, 8, 56, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==0 && i==3) {ctx.drawImage(images.tiles, 8, 64, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==1 && i==0) {ctx.drawImage(images.tiles, 8, 72, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==1 && (i==1 || i==2)) {ctx.drawImage(images.tiles, 8, 80, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==1 && i==3) {ctx.drawImage(images.tiles, 8, 88, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}     
                    }
                    else {
                        if (pieceOrientation % 2==0 && i==0) {ctx.drawImage(images.tiles, 0, 48, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==0 && (i==1 || i==2)) {ctx.drawImage(images.tiles, 0, 56, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==0 && i==3) {ctx.drawImage(images.tiles, 0, 64, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==1 && i==0) {ctx.drawImage(images.tiles, 0, 72, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==1 && (i==1 || i==2)) {ctx.drawImage(images.tiles, 0, 80, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                        else if (pieceOrientation % 2==1 && i==3) {ctx.drawImage(images.tiles, 0, 88, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}     
                    }
                }
                else {
                    if (settings.visuals == "dx" && settings.pieceColouring == "monotoneAll") {ctx.drawImage(images.tiles, 8, currentPiece*8-8, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                    else {ctx.drawImage(images.tiles, 0, currentPiece*8-8, 8, 8, piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)}
                }
                //Add white if the piece is locking
                if (locking && settings.visuals != "dx") {
                    if (settings.visuals == "gb") {ctx.fillStyle = "rgba(198, 222, 140, " + (0.5 - (currentLockTime / settings.lockDelay / 2)) + ")"}
                    else {ctx.fillStyle = "rgba(255, 255, 255, " + (0.5 - (currentLockTime / settings.lockDelay / 2)) + ")"}
                    ctx.fillRect(piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)
                }
                //White flash in DX
                if (settings.visuals != "dx" && waitingForNextPiece) {
                    ctx.fillStyle = "white"
                    ctx.fillRect(piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)
                }
            }
        }
        //Board pieces
        for (let i=0;i<settings.boardHeight;i++) {
            for (let j=0;j<settings.boardWidth;j++) {
                if (board[i][j] != 0) {
                    if (settings.visuals == "dx" && (settings.pieceColouring == "monotoneFixed" || settings.pieceColouring == "monotoneAll")) {ctx.drawImage(images.tiles, 8, board[i][j]*8-16, 8, 8, j*8+leftSide+16, i*8, 8, 8)}
                    else {ctx.drawImage(images.tiles, 0, board[i][j]*8-16, 8, 8, j*8+leftSide+16, i*8, 8, 8)}
                }
            }
        }
        //Text
        if (settings.visuals == "gb") {
            document.getElementsByClassName("GBText")[0].innerText = score.toString()
            document.getElementsByClassName("GBText")[1].innerText = level.toString()
            document.getElementsByClassName("GBText")[2].innerText = lines.toString()
        }
        else {
            document.getElementsByClassName("DXText")[0].innerText = score.toString()
            document.getElementsByClassName("DXText")[1].innerText = level.toString()
            document.getElementsByClassName("DXText")[2].innerText = lines.toString()
        }
    }
    else if (settings.visuals == "nes") {
        //Clear the canvas
        let leftSide = 160-settings.boardWidth*4;
        ctx.fillStyle = "black"
        ctx.fillRect(leftSide+8, 32, settings.boardWidth*8, settings.boardHeight*8);
        //Draw the board
        //ctx.drawImage(images.tiles, 0, 0, 8, 8, pieceTopCorner[1]*8+leftSide+8, pieceTopCorner[0]*8+32, 4, 4);
        if (!waitingForNextPiece) {
            //Draw the ghost piece if hard drop is enabled
            if (settings.hardDrop) {
                let tempPiecePositions = []
                for (let i=0;i<4;i++) tempPiecePositions.push([...piecePositions[i]])
                while (!checkPieceLanded(tempPiecePositions)) {
                    for (let i=0;i<4;i++) tempPiecePositions[i][0]++
                }
                for (let i=0;i<4;i++) {
                    if (tempPiecePositions[i][0] < 0) continue
                    ctx.drawImage(images.hardDropTile, tempPiecePositions[i][1]*8+leftSide+8, tempPiecePositions[i][0]*8+32, 8, 8)
                }
            }
            //Regular piece
            for (let i=0;i<piecePositions.length;i++) {
                if (piecePositions[i][0] < 0) continue
                if (settings.pieceColouring === "monotoneAll") {
                    ctx.drawImage(images.tiles, nesPieceTiles[currentPiece]*8, 80, 8, 8, piecePositions[i][1]*8+leftSide+8, piecePositions[i][0]*8+32, 8, 8);
                }
                else {
                    ctx.drawImage(images.tiles, nesPieceTiles[currentPiece]*8, (level%10)*8, 8, 8, piecePositions[i][1]*8+leftSide+8, piecePositions[i][0]*8+32, 8, 8);
                }
                //Add white if the piece is locking
                if (locking) {
                    ctx.fillStyle = "rgba(255, 255, 255, " + (0.5 - (currentLockTime / settings.lockDelay / 2)) + ")"
                    ctx.fillRect(piecePositions[i][1]*8+leftSide+8, piecePositions[i][0]*8+32, 8, 8)
                }
            }
        }
        //Board pieces
        if (settings.pieceColouring === "monotoneFixed" || settings.pieceColouring === "monotoneAll") {
            for (let i=0;i<settings.boardHeight;i++) {
                for (let j=0;j<settings.boardWidth;j++) {
                    if (board[i][j] != 0) {
                        ctx.drawImage(images.tiles, nesPieceTiles[board[i][j]-1]*8, 80, 8, 8, j*8+leftSide+8, i*8+32, 8, 8);
                    }
                }
            }
        }
        else {
            for (let i=0;i<settings.boardHeight;i++) {
                for (let j=0;j<settings.boardWidth;j++) {
                    if (board[i][j] != 0) {
                        ctx.drawImage(images.tiles, nesPieceTiles[board[i][j]-1]*8, (level%10)*8, 8, 8, j*8+leftSide+8, i*8+32, 8, 8);
                    }
                }
            }
        }

        //Text
        document.getElementsByClassName("NESText")[0].innerText = Math.floor(time/60) + ":" + Math.floor(time%60).toString().padStart(2, "0")
        document.getElementsByClassName("NESText")[1].innerText = score.toString().padStart(6, "0")
        document.getElementsByClassName("NESText")[2].innerText = level.toString().padStart(2, "0")
        document.getElementsByClassName("NESText")[3].innerText = "LINES-" + lines.toString().padStart(3, "0")
    }
    else if (settings.visuals == "sega") {
        //Clear the canvas
        let leftSide = 160-settings.boardWidth*4;
        ctx.fillStyle = "black"
        ctx.fillRect(leftSide, 32, settings.boardWidth*8, settings.boardHeight*8);
        //Draw the board
        //ctx.drawImage(images.tiles, 0, 0, 8, 8, pieceTopCorner[1]*8+leftSide+8, pieceTopCorner[0]*8+32, 4, 4);
        if (!waitingForNextPiece) {
            //Draw the ghost piece if hard drop is enabled
            if (settings.hardDrop) {
                let tempPiecePositions = []
                for (let i=0;i<4;i++) tempPiecePositions.push([...piecePositions[i]])
                while (!checkPieceLanded(tempPiecePositions)) {
                    for (let i=0;i<4;i++) tempPiecePositions[i][0]++
                }
                for (let i=0;i<4;i++) {
                    if (tempPiecePositions[i][0] < 0) continue
                    ctx.drawImage(images.hardDropTile, tempPiecePositions[i][1]*8+leftSide, tempPiecePositions[i][0]*8+32, 8, 8)
                }
            }
            //Regular piece
            for (let i=0;i<piecePositions.length;i++) {
                if (piecePositions[i][0] < 0) continue
                if (settings.pieceColouring === "monotoneAll") {
                    ctx.drawImage(images.tiles, 0, 64, 8, 8, piecePositions[i][1]*8+leftSide, piecePositions[i][0]*8+32, 8, 8);
                }
                else {
                    ctx.drawImage(images.tiles, 0, currentPiece*8, 8, 8, piecePositions[i][1]*8+leftSide, piecePositions[i][0]*8+32, 8, 8);
                }
            }
        }
        //Board pieces
        if (settings.pieceColouring === "monotoneFixed" || settings.pieceColouring === "monotoneAll") {
            for (let i=0;i<settings.boardHeight;i++) {
                for (let j=0;j<settings.boardWidth;j++) {
                    if (board[i][j] != 0) {
                        ctx.drawImage(images.tiles, 0, 64, 8, 8, j*8+leftSide, i*8+32, 8, 8);
                    }
                }
            }
        }
        else {
            for (let i=0;i<settings.boardHeight;i++) {
                for (let j=0;j<settings.boardWidth;j++) {
                    if (board[i][j] != 0) {
                        ctx.drawImage(images.tiles, 0, (board[i][j]-1)*8, 8, 8, j*8+leftSide, i*8+32, 8, 8);
                    }
                }
            }
        }

        //Text
        //document.getElementsByClassName("NESText")[0].innerText = score.toString().padStart(6, "0")
        //document.getElementsByClassName("NESText")[1].innerText = level.toString().padStart(2, "0")
        //document.getElementsByClassName("NESText")[2].innerText = "LINES-" + lines.toString().padStart(3, "0")
    }
}

function getDropInterval() {
    if (settings.gameMechanics == "gb") return gameboyDropIntervals[Math.min(level, 20)]
    else if (settings.gameMechanics == "nes") return nesDropIntervals[Math.min(level, 29)]
    else if (settings.gameMechanics == "dx") return dxDropIntervals[Math.min(level, 30)]
}

function landPiece() {
    locking = false
    currentLockTime = 0
    if (settings.visuals == "gb" || settings.visuals == "dx") {
        if (currentPiece == 0 && pieceOrientation % 2 == 0) {
            board[piecePositions[0][0]][piecePositions[0][1]] = 8
            board[piecePositions[1][0]][piecePositions[1][1]] = 9
            board[piecePositions[2][0]][piecePositions[2][1]] = 9
            board[piecePositions[3][0]][piecePositions[3][1]] = 10
        }
        else if (currentPiece == 0 && pieceOrientation % 2 == 1) {
            board[piecePositions[0][0]][piecePositions[0][1]] = 11
            board[piecePositions[1][0]][piecePositions[1][1]] = 12
            board[piecePositions[2][0]][piecePositions[2][1]] = 12
            board[piecePositions[3][0]][piecePositions[3][1]] = 13
        }
        else {
        for (let i=0;i<piecePositions.length;i++) board[piecePositions[i][0]][piecePositions[i][1]] = currentPiece+1
    }
    }
    else if (settings.visuals == "nes") {
        for (let i=0;i<piecePositions.length;i++) {
            if (board[piecePositions[i][0]]) board[piecePositions[i][0]][piecePositions[i][1]] = currentPiece+1
        }
    }
    else if (settings.visuals == "sega") {
        for (let i=0;i<piecePositions.length;i++) {
            if (board[piecePositions[i][0]]) board[piecePositions[i][0]][piecePositions[i][1]] = currentPiece+1
        }
    }
    
    if (settings.overrideGameARE && checkFullLines().length > 0) {currentDropTime = settings.ARELineClear} //ARE line clear override
    else if (settings.overrideGameARE) {currentDropTime = settings.ARE} //ARE override
    else if (settings.gameMechanics == "gb" && checkFullLines().length > 0) {currentDropTime = 93} //Game boy line clear ARE
    else if (settings.gameMechanics == "gb") {currentDropTime = 2} //Game boy ARE
    else if (settings.gameMechanics == "nes" && checkFullLines().length > 0) {currentDropTime = ((settings.boardWidth+1)*2)} //NES line clear ARE
    else if (settings.gameMechanics == "nes") {currentDropTime = calculateNESARELevel(Math.max(pieceTopCorner[0], 0))} //NES ARE, 10 frames of ARE if piece lands in bottom row, going up to 18 at top
    else if (settings.gameMechanics == "dx" && checkFullLines().length > 0) {currentDropTime = 50} //DX line clear ARE
    else if (settings.gameMechanics == "dx") {currentDropTime = 2} //DX ARE
    else {currentDropTime = 60} //Backup
    waitingForNextPiece = true
    lastDroppedPieces.unshift(currentPiece)
    if (lastDroppedPieces.length > 7) lastDroppedPieces.pop()
    updateVisuals()
    clearLines()
    //Disable softdrop until key is pressed again
    softDropping = false
    //Add pushdown points
    if (settings.gameMechanics != "dx") score += maxPushdown
    maxPushdown = 0
    currentPushdown = 0

    //White flash in DX
    if (settings.visuals == "dx" && waitingForNextPiece && checkFullLines().length == 0) {
        let leftSide = 120-settings.boardWidth*4;
        for (let i=0;i<piecePositions.length;i++) {
            ctx.fillStyle = "white"
            ctx.fillRect(piecePositions[i][1]*8+leftSide+16, piecePositions[i][0]*8, 8, 8)
        }
    }
}

function placePiece(x) {
    switch (settings.gameMechanics) {
        case "dx":
        case "gb":
            for (let i=0;i<4;i++) {
                piecePositions[i] = [...nesPiecePlacements[x][i]]
                if (x=="gb") piecePositions[i][0]++
                piecePositions[i][1] += settings.boardWidth/2-3
            }
            if (x==0) {pieceTopCorner = [-1,0]}
            else if (x==1) {pieceTopCorner = [1,1]}
            else {pieceTopCorner = [0,1]}
            pieceTopCorner[1] += settings.boardWidth/2-3
            break
        case "nes":
            for (let i=0;i<4;i++) {
                piecePositions[i] = [...nesPiecePlacements[x][i]]
                piecePositions[i][1] += settings.boardWidth/2-2
            }
            if (x==0) {pieceTopCorner = [-2,0]}
            else if (x==1) {pieceTopCorner = [0,1]}
            else {pieceTopCorner = [-1,1]}
            pieceTopCorner[1] += settings.boardWidth/2-2
            break
    }
    currentPiece = x
    pieceOrientation = 0
    piecesDropped[x]++

    //Cancel the visual line clears if the piece is placed before the animation is finished
    if (visualInterval) {
        clearInterval(visualInterval) 
        //Move all lines above the cleared line down
        let fullLines = checkFullLines()
        for (let i=0;i<fullLines.length;i++) {
            for (let j=0;j<settings.boardWidth;j++) {
                board[fullLines[i]][j] = 0
            }
            for (let j=fullLines[i];j>0;j--) {
                for (let k=0;k<settings.boardWidth;k++) {
                    board[j][k] = board[j-1][k]
                }
            }
        }
        updateVisuals()
    }

    //Update dropped piece statistics
    if (settings.visuals == "nes") {
        document.getElementsByClassName("NESText")[3].innerHTML = ""
        for (let i=0; i<7; i++) {
            document.getElementsByClassName("NESText")[3].innerHTML += piecesDropped[i].toString().padStart(3, "0") + "<br><br>"
        }
    }

    //Check for game over
    if (checkPieceOverlap(piecePositions)) {
        endGame()
    }

    
}

function setNextPieceVisuals(x) {
    //Draw the piece in the next box
    if (settings.visuals == "gb") {
        let leftSide = 120-settings.boardWidth*4
        ctx.fillStyle = "#c6de86"
        ctx.fillRect(leftSide+(settings.boardWidth*8)+40, 104, 32, 32)
        switch (x) {
            case 0:
                ctx.drawImage(images.tiles, 0, 48, 8, 8, 8*settings.boardWidth+leftSide+40, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 56, 8, 8, 8*settings.boardWidth+leftSide+48, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 56, 8, 8, 8*settings.boardWidth+leftSide+56, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 64, 8, 8, 8*settings.boardWidth+leftSide+64, 112, 8, 8);
                break
            case 1:
                ctx.drawImage(images.tiles, 0, 0, 8, 8, 8*settings.boardWidth+leftSide+48, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 0, 8, 8, 8*settings.boardWidth+leftSide+56, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 0, 8, 8, 8*settings.boardWidth+leftSide+48, 120, 8, 8);
                ctx.drawImage(images.tiles, 0, 0, 8, 8, 8*settings.boardWidth+leftSide+56, 120, 8, 8);
                break
            case 2:
                ctx.drawImage(images.tiles, 0, 8, 8, 8, 8*settings.boardWidth+leftSide+40, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 8, 8, 8, 8*settings.boardWidth+leftSide+48, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 8, 8, 8, 8*settings.boardWidth+leftSide+56, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 8, 8, 8, 8*settings.boardWidth+leftSide+48, 120, 8, 8);
                break
            case 3:
                ctx.drawImage(images.tiles, 0, 16, 8, 8, 8*settings.boardWidth+leftSide+48, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 16, 8, 8, 8*settings.boardWidth+leftSide+56, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 16, 8, 8, 8*settings.boardWidth+leftSide+40, 120, 8, 8);
                ctx.drawImage(images.tiles, 0, 16, 8, 8, 8*settings.boardWidth+leftSide+48, 120, 8, 8);
                break
            case 4:
                ctx.drawImage(images.tiles, 0, 24, 8, 8, 8*settings.boardWidth+leftSide+40, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 24, 8, 8, 8*settings.boardWidth+leftSide+48, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 24, 8, 8, 8*settings.boardWidth+leftSide+48, 120, 8, 8);
                ctx.drawImage(images.tiles, 0, 24, 8, 8, 8*settings.boardWidth+leftSide+56, 120, 8, 8);
                break
            case 5:
                ctx.drawImage(images.tiles, 0, 32, 8, 8, 8*settings.boardWidth+leftSide+40, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 32, 8, 8, 8*settings.boardWidth+leftSide+48, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 32, 8, 8, 8*settings.boardWidth+leftSide+56, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 32, 8, 8, 8*settings.boardWidth+leftSide+56, 120, 8, 8);
                break
            case 6:
                ctx.drawImage(images.tiles, 0, 40, 8, 8, 8*settings.boardWidth+leftSide+40, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 40, 8, 8, 8*settings.boardWidth+leftSide+48, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 40, 8, 8, 8*settings.boardWidth+leftSide+56, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, 40, 8, 8, 8*settings.boardWidth+leftSide+40, 120, 8, 8);
                break
        }
    }
    else if (settings.visuals == "nes") {
        let leftSide = 160-settings.boardWidth*4
        ctx.fillStyle = "black"
        ctx.fillRect(leftSide+(settings.boardWidth*8)+24, 96, 32, 32)
        let tileTemp
        if (settings.pieceColouring === "monotoneAll") {tileTemp = 80}
        else {tileTemp = (level%10)*8}
        //This could be simplified with a lookup table
        switch (x) {
            case 0:
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+24, 108, 8, 8);
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+32, 108, 8, 8);
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+40, 108, 8, 8);
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+48, 108, 8, 8);
                break
            case 1:
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+32, 104, 8, 8);
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+40, 104, 8, 8);
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+32, 112, 8, 8);
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+40, 112, 8, 8);
                break
            case 2:
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+28, 104, 8, 8);
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+36, 104, 8, 8);
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+44, 104, 8, 8);
                ctx.drawImage(images.tiles, 0, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+36, 112, 8, 8);
                break
            case 3:
                ctx.drawImage(images.tiles, 16, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+36, 104, 8, 8);
                ctx.drawImage(images.tiles, 16, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+44, 104, 8, 8);
                ctx.drawImage(images.tiles, 16, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+28, 112, 8, 8);
                ctx.drawImage(images.tiles, 16, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+36, 112, 8, 8);
                break
            case 4:
                ctx.drawImage(images.tiles, 8, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+28, 104, 8, 8);
                ctx.drawImage(images.tiles, 8, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+36, 104, 8, 8);
                ctx.drawImage(images.tiles, 8, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+36, 112, 8, 8);
                ctx.drawImage(images.tiles, 8, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+44, 112, 8, 8);
                break
            case 5:
                ctx.drawImage(images.tiles, 16, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+28, 104, 8, 8);
                ctx.drawImage(images.tiles, 16, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+36, 104, 8, 8);
                ctx.drawImage(images.tiles, 16, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+44, 104, 8, 8);
                ctx.drawImage(images.tiles, 16, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+44, 112, 8, 8);
                break
            case 6:
                ctx.drawImage(images.tiles, 8, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+28, 104, 8, 8);
                ctx.drawImage(images.tiles, 8, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+36, 104, 8, 8);
                ctx.drawImage(images.tiles, 8, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+44, 104, 8, 8);
                ctx.drawImage(images.tiles, 8, tileTemp, 8, 8, 8*settings.boardWidth+leftSide+28, 112, 8, 8);
                break
        }
    }
    else if (settings.visuals == "dx") {
        let leftSide = 120-settings.boardWidth*4
        ctx.fillStyle = "white"
        ctx.fillRect(leftSide+(settings.boardWidth*8)+40, 24, 32, 32)
        switch (x) {
            case 0:
                ctx.drawImage(images.tiles, 0, 48, 8, 8, 8*settings.boardWidth+leftSide+40, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 56, 8, 8, 8*settings.boardWidth+leftSide+48, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 56, 8, 8, 8*settings.boardWidth+leftSide+56, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 64, 8, 8, 8*settings.boardWidth+leftSide+64, 32, 8, 8);
                break
            case 1:
                ctx.drawImage(images.tiles, 0, 0, 8, 8, 8*settings.boardWidth+leftSide+48, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 0, 8, 8, 8*settings.boardWidth+leftSide+56, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 0, 8, 8, 8*settings.boardWidth+leftSide+48, 40, 8, 8);
                ctx.drawImage(images.tiles, 0, 0, 8, 8, 8*settings.boardWidth+leftSide+56, 40, 8, 8);
                break
            case 2:
                ctx.drawImage(images.tiles, 0, 8, 8, 8, 8*settings.boardWidth+leftSide+40, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 8, 8, 8, 8*settings.boardWidth+leftSide+48, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 8, 8, 8, 8*settings.boardWidth+leftSide+56, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 8, 8, 8, 8*settings.boardWidth+leftSide+48, 40, 8, 8);
                break
            case 3:
                ctx.drawImage(images.tiles, 0, 16, 8, 8, 8*settings.boardWidth+leftSide+48, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 16, 8, 8, 8*settings.boardWidth+leftSide+56, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 16, 8, 8, 8*settings.boardWidth+leftSide+40, 40, 8, 8);
                ctx.drawImage(images.tiles, 0, 16, 8, 8, 8*settings.boardWidth+leftSide+48, 40, 8, 8);
                break
            case 4:
                ctx.drawImage(images.tiles, 0, 24, 8, 8, 8*settings.boardWidth+leftSide+40, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 24, 8, 8, 8*settings.boardWidth+leftSide+48, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 24, 8, 8, 8*settings.boardWidth+leftSide+48, 40, 8, 8);
                ctx.drawImage(images.tiles, 0, 24, 8, 8, 8*settings.boardWidth+leftSide+56, 40, 8, 8);
                break
            case 5:
                ctx.drawImage(images.tiles, 0, 32, 8, 8, 8*settings.boardWidth+leftSide+40, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 32, 8, 8, 8*settings.boardWidth+leftSide+48, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 32, 8, 8, 8*settings.boardWidth+leftSide+56, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 32, 8, 8, 8*settings.boardWidth+leftSide+56, 40, 8, 8);
                break
            case 6:
                ctx.drawImage(images.tiles, 0, 40, 8, 8, 8*settings.boardWidth+leftSide+40, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 40, 8, 8, 8*settings.boardWidth+leftSide+48, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 40, 8, 8, 8*settings.boardWidth+leftSide+56, 32, 8, 8);
                ctx.drawImage(images.tiles, 0, 40, 8, 8, 8*settings.boardWidth+leftSide+40, 40, 8, 8);
                break
        }
    }
}

function getRandomPiece() {
    let chosenPiece
    switch (settings.randomizer) {
        case "random":
            return Math.floor(Math.random()*7)
        case "gb":
            //Game boy tetris randomizer is slightly weighted away towards certain pieces due to a bug
            chosenPiece = Math.floor(Math.random()*7)
            if (chosenPiece | lastDroppedPieces[0] | lastDroppedPieces[1] == lastDroppedPieces[1]) chosenPiece = Math.floor(Math.random()*7)
            if (chosenPiece | lastDroppedPieces[0] | lastDroppedPieces[1] == lastDroppedPieces[1]) chosenPiece = Math.floor(Math.random()*7)
            return chosenPiece
        case "nes":
            chosenPiece =  Math.floor(Math.random()*8)
            if (chosenPiece == 7 || chosenPiece == lastDroppedPieces[0]) {return Math.floor(Math.random()*7)}
            else {return chosenPiece}
        case "dx":
            //Tetris DX randomizer is heavily weighted towards T due to a bug, this approximates that
            chosenPiece =  Math.floor(Math.random()*8)
            if (chosenPiece == 7 || chosenPiece == lastDroppedPieces[0]) {
                if (Math.random() < 0.65) {return 2}
                else if (Math.random() < 0.65) {return 4}
                else if (Math.random() < 0.65) {return 3}
                else if (Math.random() < 0.65) {return 5}
                else if (Math.random() < 0.65) {return 6}
                else if (Math.random() < 0.65) {return 1}
                else {return 0}
            }
            else {return chosenPiece}
        default:
            return Math.floor(Math.random()*7)
    }
}

function checkPieceLanded(x=piecePositions) {
    for (let i=0;i<x.length;i++) {
        if (x[i][0] >= settings.boardHeight-1) return true
        if (board[x[i][0]+1] && board[x[i][0]+1][x[i][1]] != 0) return true
    }
    return false
}

function checkPieceOverlap(x=piecePositions) {
    for (let i=0;i<x.length;i++) {
        if (x[i][0] >= settings.boardHeight) return true
        if (x[i][1] < 0) return true
        if (x[i][1] >= settings.boardWidth) return true
        if (board[x[i][0]] && board[x[i][0]][x[i][1]] != 0) return true
    }
    return false

}

function checkCanMoveLeft() {
    if (waitingForNextPiece) return false
    for (let i=0;i<piecePositions.length;i++) {
        if (piecePositions[i][1] == 0) return false
        if (board[piecePositions[i][0]] && board[piecePositions[i][0]][piecePositions[i][1]-1] != 0) return false
    }
    return true
}

function checkCanMoveRight() { 
    if (waitingForNextPiece) return false
    for (let i=0;i<piecePositions.length;i++) {
        if (piecePositions[i][1] == settings.boardWidth-1) return false
        if (board[piecePositions[i][0]] && board[piecePositions[i][0]][piecePositions[i][1]+1] != 0) return false
    }
    return true
}

function moveLeft() {
    if (checkCanMoveLeft()) {
        for (let i=0;i<piecePositions.length;i++) {
            piecePositions[i][1]--
        }
        pieceTopCorner[1]--
        if (locking && settings.lockReset == "move") locking = false
        updateVisuals()
    }
}

function moveRight() {
    if (checkCanMoveRight()) {
        for (let i=0;i<piecePositions.length;i++) {
            piecePositions[i][1]++
        }
        pieceTopCorner[1]++
        if (locking && settings.lockReset == "move") locking = false
        updateVisuals()
    }
}

function rotatePiece(clockwise=true, override=false) {
    if (clockwise && keysHeld[4] && !override) return
    if (!clockwise && keysHeld[5] && !override) return
    //This should really be simplified
    let tempPiecePositions = []
    let canRotate = true
    let tempY = pieceTopCorner[0]
    let tempX = pieceTopCorner[1]
    let rotatedOrientation
    if (clockwise) {rotatedOrientation = (pieceOrientation+1)%4}
    else {rotatedOrientation = (pieceOrientation+3)%4}
    switch (currentPiece) {
        case 0:
            if (waitingForNextPiece) canRotate = false
            for (let i=0;i<4;i++) tempPiecePositions.push([...piecePositions[i]])
            //Rotate each tile clockwise around the top corner
            if (settings.gameMechanics == "gb") {
                if (pieceOrientation == 0 || pieceOrientation == 2) {
                    tempPiecePositions = [[tempY,tempX+1],[tempY+1,tempX+1],[tempY+2,tempX+1],[tempY+3,tempX+1]]
                }
                else {
                    tempPiecePositions = [[tempY+2,tempX],[tempY+2,tempX+1],[tempY+2,tempX+2],[tempY+2,tempX+3]]
                }
                if (checkPieceOverlap(tempPiecePositions)) {canRotate = false}
                if (canRotate) {
                    for (let i=0;i<4;i++) piecePositions[i] = [...tempPiecePositions[i]]
                    pieceOrientation = rotatedOrientation
                    updateVisuals()
                }
            }
            else if (settings.gameMechanics == "nes") {
                if (pieceOrientation == 0 || pieceOrientation == 2) {
                    tempPiecePositions = [[tempY,tempX+2],[tempY+1,tempX+2],[tempY+2,tempX+2],[tempY+3,tempX+2]]
                }
                else {
                    tempPiecePositions = [[tempY+2,tempX],[tempY+2,tempX+1],[tempY+2,tempX+2],[tempY+2,tempX+3]]
                }
                if (checkPieceOverlap(tempPiecePositions)) {canRotate = false}
                if (canRotate) {
                    for (let i=0;i<4;i++) piecePositions[i] = [...tempPiecePositions[i]]
                    pieceOrientation = rotatedOrientation
                    updateVisuals()
                }
            }
            else if (settings.gameMechanics == "dx") {
                if (pieceOrientation == 0 || pieceOrientation == 2) {
                    tempPiecePositions = [[tempY,tempX+1],[tempY+1,tempX+1],[tempY+2,tempX+1],[tempY+3,tempX+1]]
                }
                else {
                    tempPiecePositions = [[tempY+2,tempX],[tempY+2,tempX+1],[tempY+2,tempX+2],[tempY+2,tempX+3]]
                }
                if (checkPieceOverlap(tempPiecePositions)) {canRotate = false}
                if (canRotate) {
                    for (let i=0;i<4;i++) piecePositions[i] = [...tempPiecePositions[i]]
                    pieceOrientation = rotatedOrientation
                    updateVisuals()
                }
            }
            break
        case 1:
            break
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            if (waitingForNextPiece) canRotate = false
            //Create the temporary piece based on nesPieceOrientations
            if (settings.gameMechanics == "gb") {
                for (let j=0;j<9;j++) {
                    if (gameboyPieceOrientations[currentPiece-2][rotatedOrientation][j] == 1) {
                        tempPiecePositions.push([tempY+Math.floor(j/3),tempX+j%3])
                    }
                }
                if (checkPieceOverlap(tempPiecePositions)) {canRotate = false}
                if (canRotate) {
                    for (let i=0;i<4;i++) piecePositions[i] = [...tempPiecePositions[i]]
                    pieceOrientation = rotatedOrientation
                    updateVisuals()
                }
            }
            else if (settings.gameMechanics == "nes") {
                for (let j=0;j<9;j++) {
                    if (nesPieceOrientations[currentPiece-2][rotatedOrientation][j] == 1) {
                        tempPiecePositions.push([tempY+Math.floor(j/3),tempX+j%3])
                    }
                }
                if (checkPieceOverlap(tempPiecePositions)) {canRotate = false}
                if (canRotate) {
                    for (let i=0;i<4;i++) piecePositions[i] = [...tempPiecePositions[i]]
                    pieceOrientation = rotatedOrientation
                    updateVisuals()
                }
            }
            else if (settings.gameMechanics == "dx") {
                for (let j=0;j<9;j++) {
                    if (dxPieceOrientations[currentPiece-2][rotatedOrientation][j] == 1) {
                        tempPiecePositions.push([tempY+Math.floor(j/3),tempX+j%3])
                    }
                }
                if (checkPieceOverlap(tempPiecePositions)) {canRotate = false}
                if (canRotate) {
                    for (let i=0;i<4;i++) piecePositions[i] = [...tempPiecePositions[i]]
                    pieceOrientation = rotatedOrientation
                    updateVisuals()
                }
                //Alternate rotation point
                //else {
                //    let alternateRotationPointX = tempX + dxAlternateCenters[currentPiece-2][rotatedOrientation][0]
                //    let alternateRotationPointY = tempY + dxAlternateCenters[currentPiece-2][rotatedOrientation][1]
                //    //Calculate the temp position by rotating each tile around the alternate rotation point
                //    tempPiecePositions = []
                //    //Set the temp positions to the regular piece position
                //    for (let i=0;i<4;i++) {
                //        tempPiecePositions[i] = [...piecePositions[i]]
                //        //Shift the positions so that the alternate rotation point is at 0,0
                //        tempPiecePositions[i][0] -= alternateRotationPointY
                //        tempPiecePositions[i][1] -= alternateRotationPointX
                //        if (clockwise) {
                //            //Rotate each tile clockwise around the alternate rotation point
                //            let temp = tempPiecePositions[i][0]
                //            tempPiecePositions[i][0] = -tempPiecePositions[i][1]
                //            tempPiecePositions[i][1] = temp
                //        }
                //        else {
                //            //Rotate each tile counterclockwise around the alternate rotation point
                //            let temp = tempPiecePositions[i][0]
                //            tempPiecePositions[i][0] = tempPiecePositions[i][1]
                //            tempPiecePositions[i][1] = -temp
                //        }
                //        //Shift the positions back so that the alternate rotation point is at the correct position
                //        tempPiecePositions[i][0] += alternateRotationPointY
                //        tempPiecePositions[i][1] += alternateRotationPointX
                //    }
                //    if (checkPieceOverlap(tempPiecePositions)) {canRotate = false}
                //    if (canRotate || true) {
                //        for (let i=0;i<4;i++) piecePositions[i] = [...tempPiecePositions[i]]
                //        pieceOrientation = rotatedOrientation
                //        updateVisuals()
                //        //Move the piece top corner to the correct position
                //        //Unclear how to do this
                //    }
                //}
            }
            break
        default:
            return false
    }
}

function softDrop() {
    if (gamePlaying && settings.softDrop && !keysHeld[3] && !softDropping && !waitingForNextPiece) {
        currentDropTime = 0
        currentPushdown = 1
        if (settings.gameMechanics == "dx") score++
        softDropping = true
        if (currentPushdown > maxPushdown) maxPushdown = currentPushdown
    }
}

function hardDrop() {
    if (gamePlaying && settings.hardDrop && !keysHeld[4] && !waitingForNextPiece) {
        let tempPiecePositions = []
        for (let i=0;i<4;i++) tempPiecePositions.push([...piecePositions[i]])
        while (!checkPieceLanded(tempPiecePositions)) {
            for (let i=0;i<4;i++) tempPiecePositions[i][0]++
        }
        for (let i=0;i<4;i++) piecePositions[i] = [...tempPiecePositions[i]]
        landPiece()
    }
}

function setInitialDAS(x) {
    if (gamePlaying && x==0 && !keysHeld[0] && !waitingForNextPiece) {
        currentDASTime = settings.DASInitial
        moveLeft()
    }
    else if (gamePlaying && x==1 && !keysHeld[1] && !waitingForNextPiece) {
        currentDASTime = settings.DASInitial
        moveRight()
    }
}

//Event listeners
document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case "ArrowLeft":
            setInitialDAS(0)
            keysHeld[0] = true
            break
        case "ArrowRight":
            setInitialDAS(1)
            keysHeld[1] = true
            break
        case "ArrowUp":
            hardDrop()
            keysHeld[2] = true
            break
        case "ArrowDown":
            softDrop()
            keysHeld[3] = true
            break
        case "s":
            rotatePiece(true) 
            keysHeld[4] = true
            break
        case "a":
            rotatePiece(false) 
            keysHeld[5] = true
            break
        case "Escape":
            if (!gamePlaying && document.getElementById("game").style.display == "block") returnToMenu()
            break
    }
})

document.addEventListener("keyup", function(event) {
    switch (event.key) {
        case "ArrowLeft":
            keysHeld[0] = false
            break
        case "ArrowRight":
            keysHeld[1] = false
            break
        case "ArrowUp":
            keysHeld[2] = false
            break
        case "ArrowDown":
            softDropping = false
            keysHeld[3] = false
            break
        case "s":
            keysHeld[4] = false
            break
        case "a":
            keysHeld[5] = false
            break
    }
})

function checkFullLines() {
    //Return an array of the full lines
    let fullLines = []
    for (let i=0;i<settings.boardHeight;i++) {
        let lineFull = true
        for (let j=0;j<settings.boardWidth;j++) {
            if (board[i][j] == 0) {lineFull = false; break}
        }
        if (lineFull) fullLines.push(i)
    }
    return fullLines
}

let visualInterval
function clearLines() {
    //Check for full lines
    let linesCleared = checkFullLines().length
    lines += linesCleared
    linesUntilNextLevel -= linesCleared
    if (linesUntilNextLevel <= 0) {
        level++
        //Game boy level 20 cap
        if (settings.gameMechanics == "gb" && level == 20) {linesUntilNextLevel = Infinity}
        //DX level 30 cap
        else if (settings.gameMechanics == "gb" && level == 30) {linesUntilNextLevel = Infinity}
        else {linesUntilNextLevel += 10}
        if (settings.visuals == "dx") {
           ctx.fillStyle = Math.floor(Math.min(level,30)/5)
            document.body.style.backgroundColor = dxBackgroundColours[backgroundColor]
        }
    }
    if (settings.ARELineClear == 0) {
        let fullLines = checkFullLines()
        for (let i = 0; i < fullLines.length; i++) {
                let line = fullLines[i]
            //Move all lines above the cleared line down
            for (let j = 0; j < settings.boardWidth; j++) {
                board[line][j] = 0
            }
            for (let j = line; j > 0; j--) {
                for (let k = 0; k < settings.boardWidth; k++) {
                    board[j][k] = board[j - 1][k]
                }
            }
        }
        updateVisuals()
    }
    else if (settings.visuals == "gb" && linesCleared > 0) {visualInterval = GBVisualClearLines(1)}
    else if (settings.visuals == "nes" && linesCleared > 0) {visualInterval = NESVisualClearLines(1)}
    else if (settings.visuals == "dx" && linesCleared > 0) {visualInterval = DXVisualClearLines(1)}
    //Update score
    switch (linesCleared) {
        case 1:
            score += 40*(level+1)
            break
        case 2:
            score += 100*(level+1)
            break
        case 3:
            score += 300*(level+1)
            break
        case 4:
            score += 1200*(level+1)
            break
    }
}

function calculateNESARELevel(x) {
    let tempX = settings.boardHeight-x
    return Math.min(Math.floor(tempX/4-0.5)*2+10, 18)
}

function GBVisualClearLines(stage) {
    let fullLines = checkFullLines()
    let leftSide = 120 - settings.boardWidth * 4
    if (stage == 1 || stage == 3 || stage == 5) {
        ctx.fillStyle = "#84a563"
        for (let i = 0; i < fullLines.length; i++) {
            ctx.fillRect(leftSide + 16, fullLines[i] * 8, settings.boardWidth * 8, 8)
        }
        visualInterval = setTimeout(function () { GBVisualClearLines(stage + 1) }, 1000 / 6)
    }
    else if (stage == 2 || stage == 4 || stage == 6) {
        for (let i = 0; i < fullLines.length; i++) {
            let line = fullLines[i]
            for (let j = 0; j < settings.boardWidth; j++) {
                ctx.drawImage(images.tiles, 0, board[line][j] * 8 - 16, 8, 8, j * 8 + leftSide + 16, line * 8, 8, 8);
            }
        }
        visualInterval = setTimeout(function () { GBVisualClearLines(stage + 1) }, 1000 / 6)
    }
    else {
        ctx.fillStyle = "#c6de86"
        for (let i = 0; i < fullLines.length; i++) {
            let line = fullLines[i]
            ctx.fillRect(leftSide + 16, line * 8, settings.boardWidth * 8, 8)
            //Move all lines above the cleared line down
            for (let j = 0; j < settings.boardWidth; j++) {
                board[line][j] = 0
            }
            for (let j = line; j > 0; j--) {
                for (let k = 0; k < settings.boardWidth; k++) {
                    board[j][k] = board[j - 1][k]
                }
            }
            setTimeout(updateVisuals, 1000/3)
        }
    }
}

function NESVisualClearLines(width) {
    let fullLines = checkFullLines()
    let leftSide = 160-settings.boardWidth*4;
    let roundedWidth = settings.boardWidth
    if (roundedWidth%2 == 1) roundedWidth--
    ctx.fillStyle = "black"
    for (let i=0;i<fullLines.length;i++) {
        let line = fullLines[i]
        ctx.fillRect(leftSide+(roundedWidth*4)-(width*8)+8, line*8+32, width*16, 8)
        if (width < roundedWidth/2) {
            visualInterval = setTimeout(function() {NESVisualClearLines(width+1)}, 1000/15)
        }
        else {
            //Move all lines above the cleared line down
            for (let j=0;j<settings.boardWidth;j++) {
                board[fullLines[i]][j] = 0
            }
            for (let j=fullLines[i];j>0;j--) {
                for (let k=0;k<settings.boardWidth;k++) {
                    board[j][k] = board[j-1][k]
                }
            }
            setTimeout(updateVisuals, 1000/15)
        }
    }
}

function DXVisualClearLines(stage) {
    let fullLines = checkFullLines()
    let leftSide = 120 - settings.boardWidth * 4
    if (stage == 1 || stage == 3) {
        ctx.fillStyle = "white"
        for (let i = 0; i < fullLines.length; i++) {
            ctx.fillRect(leftSide + 16, fullLines[i] * 8, settings.boardWidth * 8, 8)
        }
        visualInterval = setTimeout(function () { DXVisualClearLines(stage + 1) }, 1000 / 4)
    }
    else if (stage == 2) {
        for (let i = 0; i < fullLines.length; i++) {
            let line = fullLines[i]
            for (let j = 0; j < settings.boardWidth; j++) {
                if (settings.pieceColouring == "monotoneFixed" || settings.pieceColouring == "monotoneAll") {ctx.drawImage(images.tiles, 8, board[line][j] * 8 - 16, 8, 8, j * 8 + leftSide + 16, line * 8, 8, 8)}
                else {ctx.drawImage(images.tiles, 0, board[line][j] * 8 - 16, 8, 8, j * 8 + leftSide + 16, line * 8, 8, 8)}
            }
        }
        visualInterval = setTimeout(function () { DXVisualClearLines(stage + 1) }, 1000 / 4)
    }
    else {
        for (let i = 0; i < fullLines.length; i++) {
            let line = fullLines[i]
            //Move all lines above the cleared line down
            for (let j = 0; j < settings.boardWidth; j++) {
                board[line][j] = 0
            }
            for (let j = line; j > 0; j--) {
                for (let k = 0; k < settings.boardWidth; k++) {
                    board[j][k] = board[j - 1][k]
                }
            }
            
        }
        updateVisuals()
    }
}

function endGame() {
    gamePlaying = false
    if (settings.visuals == "gb") {displayEndingLine(0)}
    else if (settings.visuals == "nes") {setTimeout(function() {displayEndingLine(0)}, 1200)}
    else if (settings.visuals == "dx") {setTimeout(function() {displayEndingLine(0)}, 1000)}
}

function displayEndingLine(x) {
    if (document.getElementById("game").style.display == "none") return
    if (settings.visuals == "gb" || settings.visuals == "dx") {
        let leftSide = 120-settings.boardWidth*4
        for (let i=0;i<settings.boardWidth;i++) {
            ctx.drawImage(images.tiles, 0, 96, 8, 8, i*8+leftSide+16, (settings.boardHeight-x)*8, 8, 8)
        }
        if (x<settings.boardHeight) {
            setTimeout(function() {displayEndingLine(x+1)}, 1000/60)
        }
        else {
            setTimeout(returnToMenu, 1000)
        }
    }
    else if (settings.visuals == "nes") {
        let leftSide = 160-settings.boardWidth*4
        for (let i=0;i<settings.boardWidth;i++) {
            ctx.drawImage(images.tiles, 24, (level%10)*8, 8, 8, i*8+leftSide+8, x*8+32, 8, 8)
        }
        if (x<settings.boardHeight-1) {
            setTimeout(function() {displayEndingLine(x+1)}, 1000/16)
        }
        else {
            setTimeout(returnToMenu, 1000)
        }
    }
}

function returnToMenu() {
    board = []
    waitingForNextPiece = false
    piecesDropped = [0,0,0,0,0,0,0]
    lastDroppedPieces = []
    score = 0
    lines = 0
    linesUntilNextLevel = 0
    time = 0
    softDropping = false
    currentPushdown = 0
    maxPushdown = 0
    currentDropTime = 0
    currentDASTime = 0
    currentLockTime = 0
    locking = false
    document.getElementById("game").style.display = "none"
    document.getElementById("textOverlay").style.display = "none"
    document.getElementById("textOverlay").innerHTML = ""
    document.getElementById("settings").style.display = "block"
    document.body.style.backgroundColor = "#555"
}