const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
   position: {
      x: 0,
      y: 0
   },
   imageSrc: './img/background.png'
})

const shop = new Sprite({
   position: {
      x: 600,
      y: 128
   },
   imageSrc: './img/shop.png',
   scale: 2.75,
   framesMax: 6
})

const player = new Fighter({
   position: {
      x: 0,
      y: 0
   },
   velocity: {
      x: 0,
      y: 0
   },
   offset: {
      x: 0,
      y: 0
   }
})

const enemy = new Fighter({
   position: {
      x: 400,
      y: 100
   },
   velocity: {
      x: 0,
      y: 0
   },
   color: 'blue',
   offset: {
      x: -50,
      y: 0
   }
})

console.log(player)

const keys = {
   a: {
      pressed: false
   },
   d: {
      pressed: false
   },
   w: {
      pressed: false
   },
   ArrowRight: {
      pressed: false
   },
   ArrowLeft: {
      pressed: false
   }
}

decreaseTimer()

const animate = () => {
   window.requestAnimationFrame(animate)
   context.fillStyle = 'black'
   context.fillRect(0, 0, canvas.width, canvas.height)
   background.update()
   shop.update()
   player.update()
   enemy.update()

   player.velocity.x = 0
   enemy.velocity.x = 0

   // Player Movement
   if (keys.a.pressed && player.lastKey === 'a') {
      player.velocity.x = -5
   } else if (keys.d.pressed && player.lastKey === 'd') {
      player.velocity.x = 5
   }

   // Enemy Movement
   if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
      enemy.velocity.x = -5
   } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
      enemy.velocity.x = 5
   }

   // Detect for collision
   if (
      rectangularCollision({
         rectangle1: player,
         rectangle2: enemy
      }) &&
      player.isAttacking
   ) {
      player.isAttacking = false
      enemy.health -= 20
      document.querySelector('#enemy-health').style.width = enemy.health + '%'
   }

   if (
      rectangularCollision({
         rectangle1: enemy,
         rectangle2: player
      }) &&
      enemy.isAttacking
   ) {
      enemy.isAttacking = false
      player.health -= 20
      document.querySelector('#player-health').style.width = player.health + '%'
   }

   // End Game based on health
   if (enemy.health <= 0 || player.health <= 0) {
      determineWinner({ player, enemy, timerId })
   }
}

animate()

window.addEventListener('keydown', (event) => {
   switch (event.key) {
      case 'd':
         keys.d.pressed = true
         player.lastKey = 'd'
         break
      case 'a':
         keys.a.pressed = true
         player.lastKey = 'a'
         break
      case 'w':
         player.velocity.y = -20
         break
      case ' ':
         player.attack()
         console.log('Attack!')
         break

      case 'ArrowRight':
         keys.ArrowRight.pressed = true
         enemy.lastKey = 'ArrowRight'
         break
      case 'ArrowLeft':
         keys.ArrowLeft.pressed = true
         enemy.lastKey = 'ArrowLeft'
         break
      case 'ArrowUp':
         enemy.velocity.y = -20
         break
      case 'ArrowDown':
         enemy.isAttacking = true
         break
   }
})

window.addEventListener('keyup', (event) => {
   // Player Keys
   switch (event.key) {
      case 'd':
         keys.d.pressed = false
         break
      case 'a':
         keys.a.pressed = false
         break
   }

   // Enemy Keys
   switch (event.key) {
      case 'ArrowRight':
         keys.ArrowRight.pressed = false
         break
      case 'ArrowLeft':
         keys.ArrowLeft.pressed = false
         break
   }
})
