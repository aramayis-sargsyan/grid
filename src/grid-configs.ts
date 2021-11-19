import { LP } from "./utils";

// BOARD
export const getBoardGridConfig = () => {
  return LP(getBoardLandscapeGridConfig(), getBoardPortraitGridConfig());
};

export const getBoardLandscapeGridConfig = () => {
  return {
    debug: {
      color: 0xff0000,
      colorPadding: 0x00ff00,
    },

    cells: [
      {
        id: "logo",
        bounds: { width: 1, height: 0.3, x: 0, y: 0 },
        padding: { x: 0.2, y: 0.12 },
      },
      {
        id: "footer",
        bounds: { width: 1, height: 0.1, x: 0, y: 0.9 },
        padding: { x: 0, y: 0 },
      },
      {
        id: "kkh",
        bounds: { width: 0.5, height: 0.6, x: 0, y: 0.3 },
        padding: { x: 0.05, y: 0.05 },
      },
      {
        id: "table",
        bounds: { width: 0.5, height: 0.6, x: 0.5, y: 0.3 },
        padding: { x: 0.05, y: 0.05 },
      },
    ],
  };
};

export const getBoardPortraitGridConfig = () => {
  return {
    debug: {
      color: 0xff0000,
      colorPadding: 0x00ff00,
    },

    cells: [
      {
        id: "logo",
        bounds: { width: 1, height: 0.2, x: 0, y: 0 },
        padding: { x: 0.2, y: 0.08 },
      },
      {
        id: "footer",
        bounds: { width: 1, height: 0.1, x: 0, y: 0.2 },
        padding: { x: 0, y: 0 },
      },
      {
        id: "kkh",
        bounds: { width: 1, height: 0.35, x: 0, y: 0.3 },
        padding: { x: 0.05, y: 0.05 },
      },
      {
        id: "table",
        bounds: { width: 1, height: 0.35, x: 0, y: 0.65 },
        padding: { x: 0.05, y: 0.05 },
      },
    ],
  };
};

export const getTextGridConfig = () => {
  return LP(getLandscapeGridTextConfig(), getPortraitGridTextConfig());
};

export const getLandscapeGridTextConfig = () => {
  return {
    kkh: {
      id: "../assets/kkh.png",
      textConfig: {
        text1: "KKH",
        text2: "13171",
        kkhColor: "#555555",
        size: 35,
      },
      posW: 0,
      posH: 200,
      posH1: 240,
    },
    table: {
      id: "../assets/table.png",
      textConfig: {
        text1: "Worlds Away",
        text2: "Jenny S",
        tableColor: "#555555",
        size: 35,
      },
      posW: 0,
      posH: 200,
      posH1: 240,
    },
    footer: {
      textConfig: {
        text: "Tap on the piece you love!",
        footerColor: "#ffffff",
        size: 50,
      },
      posW: 0,
      posH: 0,
    },
  };
};

export const getPortraitGridTextConfig = () => {
  return {
    kkh: {
      id: "../assets/kkh.png",
      textConfig: {
        text1: "KKH",
        text2: "13171",
        kkhColor: "#555555",
        size: 35,
      },
      posH: 200,
      posH1: 240,
    },
    table: {
      id: "../assets/table.png",
      textConfig: {
        text1: "Worlds Away",
        text2: "Jenny S",
        tableColor: "#555555",
        size: 35,
      },
      posH: 200,
      posH1: 240,
    },
    footer: {
      textConfig: {
        text: "Tap on the piece you love!",
        footerColor: "#ffffff",
        size: 50,
      },
      posW: 0,
      posH: 0,
    },
  };
};
// CTA
