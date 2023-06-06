import { SizeInterface } from "../types/size";
import { checkLimits } from "../utils/checkLimits";
import { converAngleToRad } from "../utils/convertAngleToRad";
import { PointInterface } from "./../types/point.d";
import { Actor } from "./actor";

export class Bag extends Actor {
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
    super(position);
    this.angle = 0;
    this.rotationSpeed = 0;
    this.initialPosition = position;
    this.image = new Image();
    this.image.src = "src/images/bag.svg";
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
    this.acceleration = this.acceleration * 1;
    this.speed = (this.speed + this.acceleration) * 0.95;

    // Nueva posición
    const newPosition: PointInterface = {
      x: this.position.x + 0,
      y: this.position.y + this.speed * delta,
    };

    // Verificación si está dentro del canvas
    if (checkLimits(size, newPosition)) {
      this.position = newPosition;
    } else {
      this.speed = 0;
    }
  }
  restart() {
    this.position = this.initialPosition;
    this.angle = 1;
    this.rotationSpeed = 1;
    this.speed = 1;
    this.acceleration = 1;
  }
}
