import { PointInterface } from '../types/point';
import { ActorInterface } from '../types/actor.d';

export class Actor implements ActorInterface {
    constructor(public position: PointInterface) {
        this.position = position;
    }

    update(delta: number, size?: PointInterface) {}
    draw(ctx: CanvasRenderingContext2D, size?: PointInterface, delta?: number) {}
    keyboardEventDown(key: string) {}
    keyboardEventUp(key: string) {}
    restart() {}
}