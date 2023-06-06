import { PointInterface } from "../types/point";
import { Actor } from "./actor";

export class Score extends Actor {
  public scorePoints: number = 0;

  constructor(public position: PointInterface = { x: 190, y: 20 }) {
    super(position);
  }

  draw(ctx: CanvasRenderingContext2D, size: PointInterface, delta: number) {
    this.scorePoints += delta;
    ctx.font = "18px American Typerwriter";
    ctx.fillStyle = "#000";
    ctx.fillText(
      `Score: ${this.scorePoints.toFixed(0)}`,
      this.position.x,
      this.position.y
    );
  }
}
