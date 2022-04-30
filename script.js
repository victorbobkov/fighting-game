const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
   constructor({ position, velocity }) {
      this.position = position
      this.velocity = velocity
   }

   draw() {
      context.fillStyle = 'red'
      context.fillRect(this.position.x, this.position.y, 50, 150)
   }
}

const player = new Sprite({
   position: {
      x: 0,
      y: 0
   },
   velocity: {
      x: 0,
      y: 0
   }
})

player.draw()

const enemy = new Sprite({
   position: {
      x: 400,
      y: 100
   },
   velocity: {
      x: 400,
      y: 100
   }
})

enemy.draw()

console.log(player)

const animate = () => {
   window.requestAnimationFrame(animate)
}

animate()
