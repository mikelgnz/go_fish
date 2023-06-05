import { FPSViewer } from "./src/actors/fps_viewer";
import { PointInterface } from "./src/types/point.d";
import { Fish } from "./src/actors/fish";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const canvasSize: PointInterface = { x: canvas.width, y: canvas.height };
  const fps = new FPSViewer();
  const fish = new Fish(
    { x: 200, y: canvas.height / 2 },
    { w: 40, h: 20 },
    0,
    0
  );

  let actors = [fps, fish];

  let lastFrame = 0;
  const render = (time: number) => {
    let delta = (time - lastFrame) / 1000;
    lastFrame = time;

    actors.forEach((actor) => {
      actor.update(delta, canvasSize);
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actors.forEach((actor) => {
      ctx.save();
      actor.draw(ctx, canvasSize, delta);
      ctx.restore();
    });
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);

  document.body.addEventListener("keydown", (event) => {
    let keyDirections = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (keyDirections.find((keyDirection) => keyDirection === event.key)) {
      actors.forEach((actor) => actor.keyboardEventDown(event.key));
    }
  });

  document.body.addEventListener("keyup", (event) => {
    actors.forEach((actor) => actor.keyboardEventUp(event.key));
  });
};
