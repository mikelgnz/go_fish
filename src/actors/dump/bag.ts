import { SizeInterface } from "../../types/size";
import { PointInterface } from "../../types/point";
import { Garbage } from "./garbage";

export class Bag extends Garbage {
  public angle: number;
  public rotationSpeed: number;
  public initialPosition: PointInterface;
  public image: HTMLImageElement;

  constructor(
    position: PointInterface,
    size: SizeInterface,
    acceleration: number,
    speed: number,
    imageSrc?: string
  ) {
    super(
      position,
      size,
      acceleration,
      speed,
      (imageSrc = "src/images/bag.svg")
    );
    this.angle = 2;
    this.rotationSpeed = 10;
    this.initialPosition = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  restart() {
    this.position = this.initialPosition;
    this.angle = 0;
    this.rotationSpeed = 0;
    this.speed = 0;
    this.acceleration = 0;
  }
}
