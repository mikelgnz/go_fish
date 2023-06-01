window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let actors = [fps, pacman, pacman2];

    actors.forEach((actor) => {
        actor.draw(ctx);
    });

    let lastFrame = 0;

    const render = (time) => {
        let delta = (time - lastFrame) / 1000;
        lastFrame = time;

        actors.forEach((actor) => {
            actor.update(delta);
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        actors.forEach((actor) => {
            actor.draw(ctx, delta);
        });
        window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render);

    document.body.addEventListener('keydown', (event) => {
        let keyDirections = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

        if (keyDirections.find((keyDirection) => keyDirection === event.key)) {
            actors.forEach((actor) => actor.keyboardEvent(event.key));
        }
    });
};