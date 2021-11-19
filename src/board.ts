import { pad } from "lodash";
import {
  Container,
  Graphics,
  Rectangle,
  Sprite,
  Texture,
  utils,
} from "pixi.js";
import { ContainerImg, ContainerFooter } from "./container";
import { ImgTextBold, ImgTextLigth } from "./text";
import { Footer } from "./footer";
import { getBoardGridConfig, getTextGridConfig } from "./grid-configs";

import { fit, fill, moveTop } from "./utils";

export class Board extends Container {
  private _cells: Map<string, Rectangle> = new Map();
  private _cellsPadding: Map<string, Rectangle> = new Map();
  private _debugGr: Graphics;
  private _debugGrPadding: Graphics;

  footerText: Container;
  kkhContainer: ContainerImg;
  tableContainer: ContainerImg;
  text: ImgTextBold;
  logo: Sprite;
  footer: Footer;
  kkh: Sprite;
  table: Sprite;
  hand: Sprite;
  count: number;
  bool: boolean;

  constructor() {
    super();

    this._debugGr = new Graphics();
    this.addChild(this._debugGr);
    this._debugGrPadding = new Graphics();
    this.addChild(this._debugGrPadding);
    this._build();
  }

  public rebuild(): void {
    const { cells, debug } = getBoardGridConfig();

    this._updateCells(cells);
    this._updateDebug(debug);
    this._fitChildren();
  }

  private _updateCells(cells): void {
    this._cells.clear();

    cells.forEach((cell) => {
      const { bounds, id, padding } = cell;
      const { x, y, width, height } = bounds;
      const { innerWidth: w, innerHeight: h } = window;

      this._cells.set(id, new Rectangle(x * w, y * h, width * w, height * h));
    });

    this._cellsPadding.clear();

    cells.forEach((cell) => {
      const { bounds, id, padding } = cell;
      const { x, y, width, height } = bounds;
      const { innerWidth: w, innerHeight: h } = window;

      this._cellsPadding.set(
        id,
        new Rectangle(
          (x + padding.x / 2) * w,
          (y + padding.y / 2) * h,
          (width - padding.x) * w,
          (height - padding.y) * h
        )
      );
    });
  }

  private _updateDebug(debug): void {
    this._debugGr.clear();
    this._debugGr.lineStyle(3, debug.color);

    this._cells.forEach((cell) => {
      this._debugGr.drawShape(cell);
      this._debugGr.endFill();
    });

    this._debugGrPadding.clear();
    this._debugGrPadding.lineStyle(3, debug.colorPadding);
    this._cellsPadding.forEach((cell) => {
      this._debugGrPadding.drawShape(cell);
      this._debugGrPadding.endFill();
    });
  }

  private _build(): void {
    this._buildLogo();
    this._buildKkh();
    this._buildTable();
    this._buildFooter();
  }

  buildContainerImg(
    sprite,
    imgText1,
    imgText2,
    posW,
    posH,
    posH1,
    color,
    size
  ) {
    const text = new ImgTextBold(`${imgText1}`, posW, posH, color, size);
    const text1 = new ImgTextLigth(`${imgText2}`, posH1, color, size);
    return new ContainerImg(sprite, text, text1);
  }

  buildContainerFooter(footer, imgText1, posW, posH, color, size) {
    this.text = new ImgTextBold(`${imgText1}`, posW, posH, color, size);
    return new ContainerFooter(footer, this.text);
  }

  private _buildLogo(): void {
    this.logo = Sprite.from("../assets/logo.png");
    this.logo.anchor.set(0.5);
    this.addChild(this.logo);
  }

  private _buildKkh(): void {
    const {
      kkh: {
        textConfig: { text1, text2, kkhColor, size },
        posW,
        posH,
        posH1,
      },
    } = getTextGridConfig();

    this.kkh = Sprite.from("../assets/kkh.png");

    this.kkh.anchor.set(0.5);
    this.kkhContainer = this.buildContainerImg(
      this.kkh,
      text1,
      text2,
      posW,
      posH,
      posH1,
      kkhColor,
      size
    );

    this.addChild(this.kkhContainer);
  }

  private _buildTable(): void {
    const {
      table: {
        textConfig: { text1, text2, tableColor, size },
        posW,
        posH,
        posH1,
      },
    } = getTextGridConfig();
    this.table = Sprite.from("../assets/table.png");

    this.table.anchor.set(0.5);
    this.tableContainer = this.buildContainerImg(
      this.table,
      text1,
      text2,
      posW,
      posH,
      posH1,
      tableColor,
      size
    );
    this.addChild(this.tableContainer);
  }

  private _buildFooter(): void {
    const {
      footer: {
        textConfig: { text, footerColor, size },
        posW,
        posH,
      },
    } = getTextGridConfig();
    this.footer = new Footer(window.innerWidth, window.innerHeight * 0.1);

    this.footerText = this.buildContainerFooter(
      this.footer,
      text,
      posW,
      posH,
      footerColor,
      size
    );

    this.addChild(this.footerText);
  }

  private _fitChildren(): void {
    const {
      kkh: {
        posH1,
        textConfig: { size },
      },
    } = getTextGridConfig();
    const l = utils.TextureCache[this.logo.texture.baseTexture.cacheId];
    const k = utils.TextureCache[this.kkh.texture.baseTexture.cacheId];
    const t = utils.TextureCache[this.table.texture.baseTexture.cacheId];

    fit(this._cellsPadding.get("logo"), this.logo, l.width, l.height);
    fit(
      this._cellsPadding.get("kkh"),
      this.kkhContainer,
      k.width,
      2 * posH1 + size
    );
    fit(
      this._cellsPadding.get("table"),
      this.tableContainer,
      t.width,
      2 * posH1 + size
    );
    fill(
      this._cellsPadding.get("footer"),
      this.footerText,
      this.text,
      this.footer.width,
      this.footer.height
    );
  }

  buildHand() {
    const { x, y, width, height } = this._cellsPadding.get("kkh");

    this.hand = Sprite.from("../assets/hand.png");

    this.hand.anchor.set(0.5);
    console.log(this.hand.height);

    this.hand.position.set(
      Math.floor(x + width / 2),
      window.innerHeight + this.hand.height / 2
    );
    this.count = 1.45;
    this.bool = true;
    this.hand.scale.set(1.5, 1.5);
    console.log(this.hand.height);

    if (window.innerWidth > window.innerHeight) {
      moveTop(Math.floor(x + width / 2), Math.floor(y + width / 2), this.hand);
      // } else {
      // this.moveHandY(window.innerWidth / 2, Math.floor(y + width / 2));
    }
    this.addChild(this.hand);
  }
}
