import { SizeInterface } from "../types/size";
import { converAngleToRad } from "../utils/convertAngleToRad";
import { PointInterface } from "./../types/point.d";
import { Actor } from "./actor";

export class Background extends Actor {
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
    this.image.src = "images/background.svg";
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
}
