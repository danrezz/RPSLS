const colors = require("colors");
colors.setTheme({
  title: "white",
  text: "cyan",
  prompt: "yellow",
  resultP1: "red",
  resultP2: "blue",
});
const { Player, AI } = require("./player");

class Game {
  constructor(p1, p2) {
    this.playerOne = new Player(p1);
    this.playerTwo = p2 === "AI" ? new AI(p2) : new Player(p2);

    this.banner = `\nWelcome to Rock, Paper, Scissors, Lizard, Spock\n\tIt's ${this.playerOne.name} vs ${this.playerTwo.name}`;
    this.rules = [
      "First to win three rounds wins the game",
      "Rock beats Scissors & Lizard",
      "Paper beats Spock & Rock",
      "Scissors beats Paper & Lizard",
      "Lizard beats Spock & Paper",
      "Spock beats Scissors & Rock",
    ];

    this.gestures = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
  }

  runGame() {
    console.log(`${this.banner}`.title.bold);
    this.displayRules();

    while (this.playerOne.score < 3 && this.playerTwo.score < 3) {
      let playerGesture1 = this.getGesture(this.playerOne);
      console.clear();
      let playerGesture2 = this.getGesture(this.playerTwo);
      console.clear();
      let roundResult = this.getRoundVictor(playerGesture1, playerGesture2);
      console.log(roundResult === "It's a tie!" ? `\n${roundResult}\n`.bgRed.white.bold : "\nThe round goes to ".grey.bold + `${roundResult}\n`);
      this.updateScore(roundResult);
    }
    this.displayWinner();
  }

  displayWinner() {
    let winner = this.playerOne.score > this.playerTwo.score ? `${this.playerOne.name} wins!` : `${this.playerTwo.name} wins!`;
    console.log(`${winner}`.rainbow.bold);
  }
  displayRules() {
    console.log("\n");
    for (const rule of this.rules) {
      console.log(`\t${rule}`.text.italic.bold);
    }
    console.log("\n");
  }

  displayGestures(playerName) {
    console.log(`${playerName}, select an option:`.text.bold + "\n");
    for (let i = 0; i < this.gestures.length; i++) {
      const gesture = this.gestures[i];
      console.log(`\t(${i + 1}) : ${gesture}`.text.italic + "\n");
    }
  }
  getGesture(player, reprompt = false) {
    this.displayGestures(player.name);
    switch (player.name) {
      case "AI":
        return player.selectGesture(player.difficultyLvl, this.gestures);
      default:
        let playerGesture = player.selectGesture(reprompt);
        playerGesture = this.mapNumberToGesture(this.gestures, playerGesture);
        return this.gestures.includes(playerGesture) ? playerGesture : this.getGesture(player, true);
    }
  }
  getRoundVictor(g1, g2) {
    switch (g1) {
      case "Rock":
        return g2 === g1 ? "It's a tie!" : g2 === "Scissors" || g2 === "Lizard" ? "Player 1".bold.resultP1 : "Player 2".bold.resultP2;
      case "Paper":
        return g2 === g1 ? "It's a tie!" : g2 === "Spock" || g2 === "Rock" ? "Player 1".bold.resultP1 : "Player 2".bold.resultP2;
      case "Scissors":
        return g2 === g1 ? "It's a tie!" : g2 === "Paper" || g2 === "Lizard" ? "Player 1".bold.resultP1 : "Player 2".bold.resultP2;
      case "Lizard":
        return g2 === g1 ? "It's a tie!" : g2 === "Spock" || g2 === "Paper" ? "Player 1".bold.resultP1 : "Player 2".bold.resultP2;
      case "Spock":
        return g2 === g1 ? "It's a tie!" : g2 === "Scissors" || g2 === "Rock" ? "Player 1".bold.resultP1 : "Player 2".bold.resultP2;
    }
  }
  updateScore(result) {
    result === "It's a tie!" ? null : result === "Player 1".bold.resultP1 ? this.playerOne.score++ : this.playerTwo.score++;
  }

  mapNumberToGesture = (array, index) => array[index - 1];
}

module.exports = Game;
