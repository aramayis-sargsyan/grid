import { Graphics } from "pixi.js";

export class Footer extends Graphics {
  constructor(width, height) {
    super();
    this.build(width, height);
  }

  build(width, height) {
    this.beginFill(0x537f7e);
    this.drawRect(0, 0, width, height);
    this.endFill();

    this.pivot.set(this.width / 2, this.height / 2);
  }
}
