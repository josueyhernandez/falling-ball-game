let ball = document.getElementById("ball")
let game = document.getElementById("game")
let interval
let both = 0
let counter = 0
let currentBlocks = []

function moveLeft() {
    let left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"))
    if (left > 0) {
        ball.style.left = left - 2 + "px"
    }
}

function moveRight() {
    let left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"))
    if (left < 380) {
        ball.style.left = left + 2 + "px"
    }
}

document.addEventListener("keydown", event => {
    if(both === 0) {
        both++
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1)
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1)
        }
    }
})

document.addEventListener("keyup", event => {
    clearInterval(interval)
    both = 0
})

let blocks = setInterval(function() {
    let blockLast = document.getElementById("block"+(counter-1))
    let holeLast = document.getElementById("hole"+(counter-1))

    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"))
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"))
    }

    if (blockLastTop < 400 || counter === 0) {
        let block = document.createElement("div")
        let hole = document.createElement("div")
        block.setAttribute("class", "block")
        hole.setAttribute("class", "hole")
        block.setAttribute("id", "block"+counter)
        hole.setAttribute("id", "hole"+counter)
        block.style.top = blockLastTop + 100 + "px"
        hole.style.top = holeLastTop + 100 + "px"
        let random = Math.floor(Math.random() * 360)
        hole.style.left = random + "px"
        game.appendChild(block)
        game.appendChild(hole)
        currentBlocks.push(counter)
        counter++
    }
    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"))
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"))
    let drop  = 0
    if (ballTop <= 0) {
        alert("Game Over. Score: "+(counter-9))
        clearInterval(blocks)
        location.reload()
    }

    for (let i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i]
        let iBlock = document.getElementById("block"+current)
        let iHole = document.getElementById("hole"+current)
        let iBlockTop =  parseFloat(window.getComputedStyle(iBlock).getPropertyValue("top"))
        let iHoleLeft =  parseFloat(window.getComputedStyle(iHole).getPropertyValue("left"))
        iBlock.style.top = iBlockTop - 0.5 + "px"
        iHole.style.top = iBlockTop - 0.5 + "px"
        
        if (iBlockTop < -20) {
            currentBlocks.shift()
            iBlock.remove()
            iHole.remove()
        }
        if (iBlockTop-20 < ballTop && iBlockTop > ballTop) {
            drop++
            if (iHoleLeft <= ballLeft && iHoleLeft + 20 >= ballLeft) {
                drop = 0
            }
        }
    }

    if (drop === 0) {
        if (ballTop < 480) {
            ball.style.top = ballTop + 2 + "px"
        }
    } else {
        ball.style.top = ballTop - 0.5 + "px"
    }
}, 1)
