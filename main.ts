import { FPSViewer } from "./src/actors/fps_viewer";
import { PointInterface } from "./src/types/point.d";
import { Fish } from "./src/actors/fish";
import { Background } from "./src/actors/background";
import { Music } from "./src/actors/music";
import { Score } from "./src/actors/score";
import { Garbage } from "./src/actors/garbage";
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
    5,
    60
  );
  const garbageItems: Garbage[] = [];
  const numGarbageItems = 10;
  for (let i = 0; i < numGarbageItems; i++) {
    const garbage = new Garbage(
      { x: Math.random() * canvas.width, y: Math.random() * canvas.height },
      { w: 20, h: 10 },
      5,
      60
    );
    garbageItems.push(garbage);
  }

  let actors = [background, music, fps, score, fish, ...garbageItems];
  let lastFrame = 0;
  const render = (time: number) => {
    let delta = (time - lastFrame) / 1000;
    lastFrame = time;

    actors.forEach((actor) => {
      actor.update(delta, canvasSize);
    });

    const collisionDetected = garbageItems.some((garbage) =>
      checkCollision(fish, garbage)
    );
    if (collisionDetected) {
      gameOver();
      return;
    }

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

  function checkCollision(fish: Fish, garbage: Garbage): boolean {
    const fishLeft = fish.position.x - fish.size.w / 2;
    const fishRight = fish.position.x + fish.size.w / 2;
    const fishTop = fish.position.y - fish.size.h / 2;
    const fishBottom = fish.position.y + fish.size.h / 2;

    const garbageLeft = garbage.position.x - garbage.size.w / 2;
    const garbageRight = garbage.position.x + garbage.size.w / 2;
    const garbageTop = garbage.position.y - garbage.size.h / 2;
    const garbageBottom = garbage.position.y + garbage.size.h / 2;

    return (
      fishLeft < garbageRight &&
      fishRight > garbageLeft &&
      fishTop < garbageBottom &&
      fishBottom > garbageTop
    );
  }

  function gameOver() {
    console.log("Game Over");
    actors = [];
  }
};
