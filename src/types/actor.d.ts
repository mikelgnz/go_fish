import { PointInterface } from './point.d';
import { SizeInterface } from './size';

export interface ActorInterface {
    position: Point;
    update: (delta: number, size?: SizeInterface) => void;
    draw: (ctx: CanvasRenderingContext2D, size?: SizeInterface, delta?: number) => void;
    keyboardEventDown: (key: string) => void;
    keyboardEventUp: (key: string) => void;
    restart: () => void;
}