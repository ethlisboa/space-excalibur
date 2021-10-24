import { Scene } from "phaser";
import { testData } from "./testdata";

export class UiScene extends Scene {
  constructor() {
    super('ui-scene');
  }

  preload(): void {
    // Inventory Items
    this.load.image('BlackSteel', 'assets/sprites/BlackSteel.png');
    this.load.image('Charcoal', 'assets/sprites/Charcoal.png');
    this.load.image('EnergyCrystal', 'assets/sprites/EnergyCrystal.png');
    this.load.image('EpicOpal', 'assets/sprites/EpicOral.png');
    this.load.image('IronOre', 'assets/sprites/IronOre.png');
    this.load.image('PreciousDiamond', 'assets/sprites/PreciousDiamond.png');
    this.load.image('PureGraphite', 'assets/sprites/PureGraphite.png');
    this.load.image('RaccoonLeather', 'assets/sprites/RaccoonLeather.png');
    this.load.image('SaberHandle', 'assets/sprites/SaberHandle.png');
    this.load.image('SpaceRaccoon', 'assets/sprites/SpaceRaccoon.png');
    this.load.image('TerrestrialWood', 'assets/sprites/TerrestrialWood.png');
  }

  create(): void {
    const inventoryItems = this.add.group();

    // inventory position
    const xAnchor = 50;
    const yAnchor = 50;

    // x offset for icons
    const xOffset = -24;

    // y offset for heading
    const headOffset = -26;

    // inventory size (square)
    const inventorySize = 270;

    // inventory background (black)
    const background = this.add.rectangle(
      xAnchor + inventorySize / 2 + xOffset,
      yAnchor + inventorySize / 2 + headOffset,
      inventorySize,
      inventorySize,
      0x000000,
      0.6
    );
    inventoryItems.add(background);

    // font styles
    const headStyle = {
      font: "20px Arial bold", fill: "#ffffff", wordWrap: {
        width: inventorySize
      }
    };
    const fontStyle = {
      font: "18px Arial", fill: "#ffffff", wordWrap: {
        width: inventorySize
      }
    };

    // render all items with count > 0
    let yOffset = 0;
    let itemCount = 0;
    for (let i = 0; i < testData.length; i++) {

      // skip empty data
      if (testData[i].count <= 0) {
        continue;
      }
      itemCount++;

      // add line of text to inventory
      const text = this.add.text(
        xAnchor,
        yAnchor + yOffset,
        testData[i].name + ": " + testData[i].count,
        fontStyle
      );
      inventoryItems.add(text);

      // add icon to inventory
      const icon = this.add.sprite(xAnchor, yAnchor, testData[i].name);
      icon.setScale(0.42);
      icon.setPosition(
        xAnchor + icon.displayWidth / 2 + xOffset,
        yAnchor + icon.displayHeight / 2 + yOffset
      );
      inventoryItems.add(icon);
      yOffset += 22;
    }

    // inventory heading
    let headingText = "Inventory";
    if (itemCount <= 0) {
      headingText = "Inventory (empty)"
    }
    const head = this.add.text(
      xAnchor + xOffset,
      yAnchor + headOffset,
      headingText,
      headStyle
    );
    inventoryItems.add(head);

    this.add.existing(inventoryItems);
  }

  update(): void {
    // TODO update inventory
  }
}
