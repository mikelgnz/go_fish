import { FPSViewer } from "./src/actors/fps_viewer";
import { PointInterface } from "./src/types/point.d";
import { Fish } from "./src/actors/fish";
import { Background } from "./src/actors/background";
import { Music } from "./src/actors/music";
import { Score } from "./src/actors/score";
import { Bag } from "./src/actors/bag";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const music = new Music();
  const canvasSize: PointInterface = { x: canvas.width, y: canvas.height };
  const background = new Background(
    { x: 0, y: canvas.height / 2 },
    { w: 1440, h: 360 },
    0,
    0
  );
  const fps = new FPSViewer();
  const score = new Score();
  const fish = new Fish(
    { x: 200, y: canvas.height / 2 },
    { w: 40, h: 20 },
    0,
    0
  );
  const bag = new Bag(
    { x: canvas.width - 200, y: canvas.height / 2 },
    { w: 40, h: 40 },
    0,
    0
  );

  let actors = [background, music, fps, score, fish, bag];

  let lastFrame = 0;
  const render = (time: number) => {
    let delta = (time - lastFrame) / 1000;
    lastFrame = time;

    actors.forEach((actor) => {
      actor.update(delta, canvasSize);
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const backgroundSpeed = 100;

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
