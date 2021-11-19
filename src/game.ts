import { Application, Ticker } from "pixi.js";
import { Board } from "./board";

export class Game extends Application {
  _board: Board;
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xdddddd,
    });

    document.body.appendChild(this.view);

    this.ticker.add(this._update, this);
    this.ticker.start();
    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.load();
  }

  _onLoadComplete() {
    window.addEventListener("resize", this._resize.bind(this));

    this._build();

    setTimeout(() => {
      this._rebuild();
    }, Ticker.shared.deltaMS * 2);
  }

  _build() {
    this._buildBoard();
  }

  _rebuild() {
    this._board.rebuild();
    this._board.buildHand();
  }

  _resize() {
    const { innerWidth: width, innerHeight: height } = window;

    this._resizeCanvas(width, height);
    this._resizeRenderer(width, height);

    this._board.rebuild();
  }

  _resizeCanvas(width, height) {
    const { style } = this.renderer.view;

    style.width = width + "px";
    style.height = height + "px";
  }

  _resizeRenderer(width, height) {
    this.renderer.resize(width, height);
  }

  _buildBoard() {
    this._board = new Board();
    this.stage.addChild(this._board);
  }

  _update() {
    // this._board.buildHand();
  }
}
