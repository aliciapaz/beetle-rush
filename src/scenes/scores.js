import Phaser from 'phaser';
import { Button } from '../objects/button';
import config from '../config/config';

const sortScores = (data) => {
  const sorted = data.sort((a, b) => b.score - a.score);
  return sorted;
};

const createTable = (scores) => {
  const table = document.createElement('table');
  table.className = 'scores-table';
  const headerRow = document.createElement('tr');
  const nameHeader = document.createElement('th');
  const scoreHeader = document.createElement('th');

  nameHeader.innerHTML = 'Name';
  scoreHeader.innerHTML = 'Score';

  headerRow.appendChild(nameHeader);
  headerRow.appendChild(scoreHeader);

  table.appendChild(headerRow);

  const topFive = sortScores(scores).slice(0, 5);

  topFive.forEach((object) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    const scoreCell = document.createElement('td');

    nameCell.innerHTML = object.user;
    scoreCell.innerHTML = object.score;

    row.appendChild(nameCell);
    row.appendChild(scoreCell);

    table.appendChild(row);
  });
  return table;
};

class ScoresScene extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  init(data) {
    this.scores = data;
  }

  create() {
    this.scoresText = this.add.text(0, 0, 'Top Scores', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 6,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(this.scoresText, this.zone);

    // Menu button

    this.menuButton = new Button(
      this,
      new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title'),
    );

    document.body.appendChild(createTable(this.scores));
  }
}

export { ScoresScene, sortScores, createTable };