import { Bag } from "./bag";
import { Can } from "./can";
import { Garbage } from "./garbage";
import { SizeInterface } from "../../types/size";

export class GarbageGenerator {
  public garbageItems: Garbage[] = [];

  constructor(private canvasSize: SizeInterface) {
    this.generateGarbage(2);
  }

  public generateGarbage(numItems: number) {
    setInterval(() => {
      for (let i = 0; i < numItems; i++) {
        const randomX = Math.random() * (this.canvasSize.w - 1000) + 1000;
        const randomY = Math.random() * this.canvasSize.h;
        const randomSize = this.getRandomSize();
        const randomGarbageType = this.getRandomGarbageType();
        const garbage = new randomGarbageType(
          { x: randomX, y: randomY },
          randomSize,
          0,
          60
        );
        this.garbageItems.push(garbage);
      }
    }, 1500);
  }

  private getRandomSize(): SizeInterface {
    let garbageWidth = 0;
    let garbageHeight = 0;

    const randomGarbageType = this.getRandomGarbageType();
    if (randomGarbageType === Bag) {
      garbageWidth = 20;
      garbageHeight = 20;
    }
    if (randomGarbageType === Can) {
      garbageWidth = 20;
      garbageHeight = 15;
    }

    return { w: garbageWidth, h: garbageHeight };
  }

  public getRandomGarbageType(): typeof Garbage {
    const garbageTypes: (typeof Garbage)[] = [Bag, Can];
    const randomIndex = Math.floor(Math.random() * garbageTypes.length);
    return garbageTypes[randomIndex];
  }

  getGarbageItems(): Garbage[] {
    return this.garbageItems;
  }
  restart() {
    this.garbageItems = [];
  }
}
