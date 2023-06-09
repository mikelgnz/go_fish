import { SizeInterface } from "../types/size";
import { checkLimits } from "../utils/checkLimits";
import { converAngleToRad } from "../utils/convertAngleToRad";
import { PointInterface } from "./../types/point.d";
import { Actor } from "./actor";

export class Fish extends Actor {
  public angle: number;
  public rotationSpeed: number;
  public initialPosition: PointInterface;
  public image: HTMLImageElement;
  public buttons: { up: boolean; down: boolean };

  constructor(
    public position: PointInterface,
    public size: SizeInterface,
    public acceleration: number,
    public speed: number
  ) {
    super(position);
    this.angle = 0;
    this.rotationSpeed = 0;
    this.buttons = {
      up: false,
      down: false,
    };
    this.initialPosition = position;
    this.image = new Image();
    this.image.src = "images/fish.svg";
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

  update(delta: number, size: SizeInterface) {
    this.acceleration = this.acceleration * 1;
    this.speed = (this.speed + this.acceleration) * 0.95;
    const gravity = 5;
    this.speed += gravity;
    // Nueva posición
    const newPosition: PointInterface = {
      x: this.position.x + 0,
      y: this.position.y + this.speed * delta,
    };

    // Verificación si está dentro del canvas
    if (checkLimits({ x: size.w, y: size.h }, newPosition)) {
      this.position = newPosition;
    } else {
      this.speed = 0;
    }
  }

  keyboardEventDown(key: string) {
    if (key === "ArrowLeft") {
    } else if (key === "ArrowRight") {
    } else if (key === "ArrowUp") {
      this.acceleration -= 10;
      this.angle = -10;
    } else if (key === "ArrowDown") {
      this.acceleration += 10;
      this.angle = 10;
    }
  }

  keyboardEventUp(key: string) {
    switch (key) {
      case "ArrowUp":
        this.acceleration = 0;
        this.angle = -0;
        break;
      case "ArrowDown":
        this.acceleration = 0;
        this.angle = -0;
        break;
    }
  }

  restart() {
    this.position = this.initialPosition;
    this.angle = 0;
    this.rotationSpeed = 0;
    this.speed = 0;
    this.acceleration = 0;
  }
}
