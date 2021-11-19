import { DisplayObject, Rectangle, SCALE_MODES, Sprite, Ticker } from "pixi.js";
import { Footer } from "./footer";
import gsap from "gsap";
import { Circ } from "gsap/gsap-core";
import { PixiPlugin } from "gsap/PixiPlugin.js";

export const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const LP = (l, p) => {
  const { innerWidth: width, innerHeight: height } = window;

  return width / height > 1 ? l : p;
};

export const fit = (
  { x, y, width, height }: Rectangle,
  sprite: DisplayObject,
  imgWidth,
  imgHeight
) => {
  const posX = x + width / 2;
  const posY = y + height / 2;

  let l = Math.min(width / imgWidth, height / imgHeight);

  sprite.position.set(posX, posY);

  if (l <= 1) {
    sprite.scale.set(l, l);
  }
};

export const fill = (
  { x, y, width, height }: Rectangle,
  sprite: DisplayObject,
  text,
  imgWidth,
  imgHeight
) => {
  const posX = x + width / 2;
  const posY = y + height / 2;

  let l = Math.min(width / imgWidth, height / imgHeight);

  sprite.position.set(posX, posY);

  sprite.scale.set(width / imgWidth, height / imgHeight);
  text.scale.set(imgWidth / width, imgHeight / height);
  text.scale.set(l, l);
};

export const moveTop = (posX, posY, hand) => {
  gsap.to(hand, {
    x: posX,
    y: posY,
    duration: 1,
    rotation: -0.2,
    ease: Circ.easeOut,
    onComplete: () => {
      moveMinScale(posX, posY, "right", hand);
    },
  });
};

export const moveRight = (posX, posY, hand) => {
  gsap.to(hand, {
    x: posX,
    y: posY,
    duration: 1,
    ease: Circ.easeOut,
    onComplete: () => {
      moveMinScale(posX, posY, "bottom", hand);
    },
  });
};

export const moveBottom = (posX, posY, hand) => {
  gsap.to(hand, {
    x: posX,
    y: posY,
    duration: 1,
    rotation: 0.2,
    ease: Circ.easeOut,
    onComplete: () => {
      moveLeft(posX / 3, window.innerHeight + hand.height / 2, hand);
    },
  });
};

export const moveLeft = (posX, posY, hand) => {
  gsap.to(hand, {
    x: posX,
    y: posY,
    duration: 1,
    rotation: 0.2,
    ease: Circ.easeOut,
    onComplete: () => {},
  });
};

export const moveMinScale = (posX, posY, str, hand) => {
  gsap.to(hand.scale, {
    x: 0.8,
    y: 0.8,
    duration: 1,
    ease: Circ.easeOut,
    onComplete: () => {
      moveMaxScale(posX, posY, str, hand);
    },
  });
};

export const moveMaxScale = (posX, posY, str, hand) => {
  gsap.to(hand.scale, {
    x: 1.25,
    y: 1.25,
    duration: 1,
    outline: 0,
    ease: Circ.easeOut,
    onComplete: () => {
      if (str === "right") {
        moveRight(posX * 3, posY, hand);
      } else {
        moveBottom(posX, window.innerHeight + hand.height / 2, hand);
      }
    },
  });
};
