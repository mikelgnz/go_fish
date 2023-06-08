import { PointInterface } from "../types/point";
import { SizeInterface } from "../types/size";
import { Actor } from "./actor";

export class FPSViewer extends Actor {
  constructor(public position: PointInterface = { x: 8, y: 20 }) {
    super(position);
  }

  draw(ctx: CanvasRenderingContext2D, size: SizeInterface, delta: number) {
    const fps = (1 / delta).toFixed(0);
    ctx.font = "18px Darumadrop One";
    ctx.fillStyle = "#000";
    ctx.fillText(`FPS: ${fps}`, this.position.x, this.position.y);
  }
}
