import { Container, Text, TextStyle } from "pixi.js";

export class ImgTextBold extends Container {
  style: TextStyle;
  constructor(str, posW, posH, color, textSize) {
    super();

    this.style = new TextStyle({
      fontFamily: "Arial",
      fontSize: textSize,
      fontWeight: "bold",
      fill: [color],
    });

    this.build(str, posH, posW);
  }

  build(str, posH, posW) {
    let text = new Text(`${str}`, this.style);
    text.pivot.x = text.width / 2;
    text.pivot.y = text.height / 2;

    text.position.set(posW, posH);
    this.addChild(text);
  }
}

export class ImgTextLigth extends Container {
  style: TextStyle;
  constructor(str, pos, color, textSize) {
    super();

    this.style = new TextStyle({
      fontFamily: "Arial",
      fontSize: textSize,
      fill: [color],
    });

    this.build(str, pos);
  }

  build(str, pos) {
    let text = new Text(`${str}`, this.style);
    text.pivot.x = text.width / 2;
    text.pivot.y = text.height / 2;
    text.position.set(0, pos);
    this.addChild(text);
  }
}
