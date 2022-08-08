const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Settings
const tileSize = {
    width: 150,
    height: canvas.height * 0.03
}
const ballSize = 10

// Classes
class PlayerTile {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    update() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Ball {
    constructor(x, y, radius, color, playerTile) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = {
            x: 7,
            y: 7
        }
        this.playerTile = playerTile
    }

    update() {
        // Rendering the ball
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(
            this.x, this.y,
            this.radius, 0, Math.PI * 2
        )
        ctx.fill()

        // Moving the ball
        this.x += this.velocity.x
        this.y += this.velocity.y
        
        // Checking the wall for collision
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width)
            this.velocity.x = -this.velocity.x
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height)
            this.velocity.y = -this.velocity.y
            
        // Checking the playerTile for collision
        const p = this.playerTile
        if (this.x + this.radius >= p.x && this.x - this.radius <= p.x + p.width)
            if (this.y + this.radius >= p.y && this.y - this.radius <= p.y + p.height) {
                if (this.y <= p.y || this.y >= p.y + p.height)
                    this.velocity.y = -this.velocity.y
                if (this.x <= p.x || this.x >= p.x + p.width)
                    this.velocity.x = -this.velocity.x
            }
    }
}

// Initializations
const player = new PlayerTile(
    (canvas.width/2) - (tileSize.width/2),
    canvas.height - 100,
    tileSize.width, tileSize.height,
    'white'
)
const ball = new Ball(
    canvas.width / 2, canvas.height / 2,
    ballSize, 'white', player
)

// Animation Loop
function animate() {
    requestAnimationFrame(animate)

    // Clear the screen
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Updating sprits
    ball.update()
    player.update()
}

animate()

addEventListener("mousemove", event => {
    player.x = event.clientX - player.width / 2
})
