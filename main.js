import { PointInterface } from '../types/point';
import { Actor } from '../src/actors/actor';
import { FPSViewer } from '../actors/fps_viewer';



window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasSize: PointInterface = { x: canvas.width, y: canvas.height };
    const fps = new FPSViewer();

    let actors = [FPSViewer];

    actors.forEach((actor) => {
        actor.draw(ctx);
    });

    let lastFrame = 0;
    const render = (time: number) => {
        // Cálculo entre frames
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

    document.body.addEventListener('keydown', (event) => {
        let keyDirections = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

        if (keyDirections.find((keyDirection) => keyDirection === event.key)) {
            actors.forEach((actor) => actor.keyboardEventDown(event.key));
        }    });

    document.body.addEventListener('keyup', (event) => {
        actors.forEach((actor) => actor.keyboardEventUp(event.key));
    });
};