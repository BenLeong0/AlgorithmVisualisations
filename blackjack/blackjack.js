const suits = ['H', 'S', 'C', 'D'];
const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const hitstick = "<span onclick='hit();'>Hit</span> / <span onclick='stick();'>Stick</span>"
const restart = "<span onclick='init();'>Play again?</span>"
const ask = "Would you like to stick or hit?"


function draw(player) {
  while (true) {
    card = numbers[Math.floor(13*Math.random())] + suits[Math.floor(4*Math.random())]
    if ($("#"+card).length == 0) {
      $("#"+player).append("<img src='cards/" + card + ".png' class='card' id='" + card + "'>");
      return card
    }
  }
}


function hideCard(id) {
  $("#"+id).attr("src", "cards/back.png");
}


function showCard(id) {
  $("#"+id).attr("src", "cards/" + id + ".png");
}


function value(card) {
    number = card.slice(0,-1);
    if (['J', 'Q', 'K'].includes(number)) {
        return 10
    } else if (number == 'A') {
        return 1
    } else {
        return parseInt(number)
    }
}


function score(player) {
  hand = document.getElementById(player).getElementsByClassName("card");
  var currentScore = 0;
  var ace = false;
  for (let i=0;i<hand.length;i++) {
    var card = hand[i].getAttribute("id")
    currentScore += value(card);
    if (card[0] == 'A') {
      ace = true
    }
  }
  if (ace && currentScore < 12) {
    currentScore += 10
  }
  return currentScore
}


function checkStart() {
  if (score("dealer") == 21 && score("player") == 21) {
    // Double blackjack
    showCard(hiddenCard)
    $("#instructions").html("Push...")
    $("#actions").html(restart)
  } else if (score("dealer") == 21) {
    // Dealer blackjack
    showCard(hiddenCard)
    $("#instructions").html("Dealer Blackjack!")
    $("#actions").html(restart)
  } else if (score("player") == 21) {
    // Player blackjack
    showCard(hiddenCard)
    $("#instructions").html("BLACKJACK!")
    $("#actions").html(restart)
  } else {
    // Normal play
    $("#instructions").html(ask)
  }
}


function hit() {
  draw('player');
  if (score('player') > 21) {
    showCard(hiddenCard)
    $("#instructions").html("Bust!")
    $("#actions").html(restart)
  } else if (score('player') == 21) {
    // Dealer plays
    stick()
  }
}


function stick() {
  $("#actions").html(restart)
  $("#instructions").html(" ")
  showCard(hiddenCard)
  dealerDraw()
}


function dealerDraw() {
  if (score('dealer') > 17) {
    if (score('dealer') < score('player') || score('dealer') > 21) {
      $("#instructions").html("You win!")
    } else if (score('dealer') == score('player')) {
      $("#instructions").html("Push...")
    } else {
      $("#instructions").html("You lose...")
    }
  } else {
    setTimeout(function() {
      draw('dealer')
      dealerDraw()
    }, 1000)
  }
}


function reset() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}


function init() {
  reset()
  $("#dealer").empty();
  $("#player").empty();

  $("#actions").html(hitstick)
  draw("dealer")
  hiddenCard = draw("dealer")
  draw("player")
  draw("player")
  hideCard(hiddenCard)

  checkStart()
}
