import { SizeInterface } from "../types/size";
import { checkLimits } from "../utils/checkLimits";
import { converAngleToRad } from "../utils/convertAngleToRad";
import { PointInterface } from "./../types/point";

export class Garbage {
  public angle: number;
  public rotationSpeed: number;
  public initialPosition: PointInterface;
  public image: HTMLImageElement;

  constructor(
    public position: PointInterface,
    public size: SizeInterface,
    public acceleration: number,
    public speed: number
  ) {
    this.angle = 2;
    this.rotationSpeed = 10;
    this.initialPosition = { ...position };
    this.image = new Image();
    this.image.src = "src/images/trina.svg";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(converAngleToRad(this.angle));

    ctx.drawImage(
      this.image,
      -this.size.w / 2,
      -this.size.h / 2,
      this.size.w,
      this.size.h
    );
  }

  update(delta: number, size: PointInterface) {
    // Update position based on speed and acceleration
    const newPosition: PointInterface = {
      x: this.position.x - this.speed * delta,
      y: this.position.y + this.acceleration * delta,
    };

    // Check if the new position is within the canvas limits
    if (checkLimits(size, newPosition)) {
      this.position = newPosition;
    } else {
      this.speed = 0;
    }
  }
  

  restart() {
    this.position = { ...this.initialPosition };
    this.angle = 1;
    this.rotationSpeed = 10;
    this.speed = 0;
    this.acceleration = 0;
    
  }
}
