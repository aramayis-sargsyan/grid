import { Container } from "pixi.js";

export class ContainerImg extends Container {
  constructor(sprite, text1, text2) {
    super();
    this.build(sprite, text1, text2);
  }

  build(sprite, text1, text2) {
    this.addChild(sprite);
    this.addChild(text1);
    this.addChild(text2);
  }
}

export class ContainerFooter extends Container {
  constructor(footer, text) {
    super();
    this.build(footer, text);
  }

  build(footer, text) {
    this.addChild(footer);
    this.addChild(text);
  }
}
