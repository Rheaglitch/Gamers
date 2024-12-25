const startBtn = document.getElementById("btn-start")
const game = document.getElementById("game")
const menu = document.getElementById("menu")
const usernameText = document.getElementById("username")
const usernameInput = document.getElementById("inpt-username")
const scoreboardBtn = document.getElementById("btn-scoreBoard")
const scoreboard = document.getElementById("scoreboard")
const scoreTable = document.getElementById("scoreTable")

startBtn.addEventListener("click", function (){
    game.style.display = "block"
    menu.style.display = "none"
    usernameText.innerHTML = usernameInput.value
    start()
})

scoreboardBtn.addEventListener("click", function () {
    menu.style.display = "none"
    scoreboard.style.display = "block"
})

let scoreBoardLocal = JSON.parse(localStorage.getItem("scoreboard")) || [];
scoreBoardLocal = scoreBoardLocal.sort((a, b) => {
    return b.score - a.score
})

scoreBoardLocal.forEach((val, index) => {
    const row = document.createElement("tr")
    row.innerHTML = `<td>${index + 1}</td><td>${val.name}</td><td>${val.score}</td>`
    scoreTable.appendChild(row)
    return
})