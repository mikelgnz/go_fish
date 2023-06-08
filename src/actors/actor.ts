import { PointInterface } from '../types/point';
import { ActorInterface } from '../types/actor.d';
import { SizeInterface } from '../types/size';

export class Actor implements ActorInterface {
    constructor(public position: PointInterface) {
        this.position = position;
    }

    update(delta: number, size?: SizeInterface) {}
    draw(ctx: CanvasRenderingContext2D, size?: SizeInterface, delta?: number) {}
    keyboardEventDown(key: string) {}
    keyboardEventUp(key: string) {}
    restart() {}
}