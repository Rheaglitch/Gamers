const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d") 

const molesImage = new Image()
const hammerImage = new Image()
const moles = {
    x : 50,
    y : 50
} 
const cursor = {
    x : 0,
    y : 0,
    width : 50
}

const scoreText = document.getElementById("score")
const timer = document.getElementById("second")
const heartText = document.getElementById("heart")


let score = 0
let second = 30
let heart = 5
let timerInterval
let gameInterval

molesImage.src = "./moles.jpg"
hammerImage.src = "hammer.png"
canvas.width = "600"
canvas.height = "600"

function drawBackground(){
    ctx.beginPath()
    ctx.fillStyle = "lightblue"
    ctx.fillRect(0, 0, 600, 600)
    ctx.closePath()
}

function drawGrid(){
    ctx.beginPath()
    ctx.fillStyle = "red"

    //column 1
    ctx.fillRect(50, 50, 150, 150)
    ctx.fillRect(220, 50, 150, 150)
    ctx.fillRect(390, 50, 150, 150)
    
    //column 2
    ctx.fillRect(50, 220, 150, 150)
    ctx.fillRect(220, 220, 150, 150)
    ctx.fillRect(390, 220, 150, 150)

    //column 2
    ctx.fillRect(50, 390, 150, 150)
    ctx.fillRect(220, 390, 150, 150)
    ctx.fillRect(390, 390, 150, 150)
    ctx.closePath()

    ctx.closePath()
}

function drawMoles(){
    ctx.drawImage(molesImage, moles.x, moles.y , 150,150)
    
}

function drawHammer(){
    ctx.drawImage(hammerImage, cursor.x, cursor.y , 50,50)
}

function changeMolesPosition(){
    const position = [50, 220, 390]
    const randomX = Math.floor(Math.random() * 3)
    const randomY = Math.floor(Math.random() * 3)
    moles.x = position[randomX]
    moles.y = position[randomY]

    console.log(moles)
}

function checkHit(x, y){
    const rightSide = moles.x + 150
    const leftSide = moles.x
    const topSide = moles.y
    const bottomSide = moles.y + 150
    if (
        x < rightSide &&
        x > leftSide &&
        y < bottomSide &&
        y > topSide 
    ){
        return true
    } else {
        return false
    }
}

canvas.addEventListener("click", function (e) {
    if(checkHit(e.offsetX, e.offsetY)){
        score += 1
        scoreText.innerHTML = score
    }else {
        heart -= 1;
        heartText.innerHTML = heart;

        if (heart <= 0) {
            clearInterval(timerInterval);
            clearInterval(gameInterval);
            setScoreboard()
            alert("ohh no! nyawamu habis. Skor akhir : " + score);
        }
    }
})

canvas.addEventListener("mousemove", function(e){
    cursor.x = e.offsetX - cursor.width / 2
    cursor.y = e.offsetY - cursor.width / 2
})

function animation(){
    drawBackground()
    drawGrid()
    drawMoles()
    drawHammer()
    requestAnimationFrame(animation)
}

function start(){
    timerInterval = setInterval(function() {
        second -= 1
        timer.innerHTML = second
        if(second <= 0){
            clearInterval(timerInterval)
            clearInterval(gameInterval)
            setScoreboard()
            alert("waktu habis. Skor akhir : " + score)
        }
    }, 1500)

    gameInterval = setInterval( function () {
        changeMolesPosition()
        drawBackground()
        drawGrid()
        drawMoles()
    }, 1000)


    drawBackground()
    drawGrid()   
    molesImage.onload = drawMoles()
    hammerImage.onload = animation();
}

function setScoreboard(){
    let scoreboard = JSON.parse(localStorage.getItem("scoreboard"))

    if (scoreboard){
        let usernameHightScore = scoreboard.find(function(val){
            return val.name == usernameInput.value
        })

        if(!usernameHightScore){
            scoreboard.push({name : usernameInput.value, score : score })
        }else{
            usernameHightScore.score = Math.max(score, usernameHightScore.score)
        }
    }else{
        localStorage.setItem("scoreboard", JSON.stringify([{name : usernameInput.value, score : score}]))
        return 
    }

    localStorage.setItem("scoreboard", JSON.stringify(scoreboard))
}
