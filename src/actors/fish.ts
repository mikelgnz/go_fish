import { SizeInterface } from '../types/size';
import { checkLimits } from '../utils/checkLimits';
import { converAngleToRad } from '../utils/convertAngleToRad';
import { PointInterface } from './../types/point.d';
import { Actor } from './actor';

export class Fish extends Actor {
    public angle: number;
    public rotationSpeed: number;
    public initialPosition: PointInterface;
    public image: HTMLImageElement;

    constructor(public position: PointInterface, public size: SizeInterface, public acceleration: number, public speed: number) {
        super(position);
        this.angle = 0;
        this.rotationSpeed = 0;
//         this.buttons = {
//         up: false,
//         down: false,
//   };
        this.initialPosition = position;
        this.image = new Image();
        this.image.src = 'src/images/fish.png';
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(converAngleToRad(this.angle));

        ctx.drawImage(this.image, -this.size.w / 2, -this.size.h / 2, this.size.w, this.size.h);

    }

    update(delta: number, size: PointInterface) {
        let accelerate = 0;
        // Calculate acceleration
        // if (this.buttons.up) {
        //   accelerate += 2;
        // }
        // if (this.buttons.down) {
        //   accelerate -= 2;
        // }
        // this.acceleration = accelerate;
    
        //this.acceleration = this.acceleration * 0.98;
        this.speed = (this.speed + this.acceleration) * 0.95;

        // Nueva posición
        const newPosition: PointInterface = {
            x: this.position.x + Math.cos(converAngleToRad(this.angle)) * this.speed * delta,
            y: this.position.y + Math.sin(converAngleToRad(this.angle)) * this.speed * delta,
        };

        // Verificación si está dentro del canvas
        if (checkLimits(size, newPosition)) {
            this.position = newPosition;
        } else {
            this.speed = 0;
        }
    }

    keyboardEventDown(key: string) {
        if (key === 'ArrowLeft') {
            this.rotationSpeed -= 2;
        } else if (key === 'ArrowRight') {
            this.rotationSpeed += 2;
        } else if (key === 'ArrowUp') {
            this.acceleration = 4;
        } else if (key === 'ArrowDown') {
            this.acceleration = -4;
        }
    }

    keyboardEventUp(key: string) {
        switch (key) {
            case 'ArrowUp':
                this.acceleration = 0;
                break;
            case 'ArrowDown':
                this.acceleration = 0;
                break;
        }
    }

    restart() {
        this.position = this.initialPosition;
        this.angle = 0;
        this.rotationSpeed = 0;
        this.speed = 0;
        this.acceleration = 0;
    }
}