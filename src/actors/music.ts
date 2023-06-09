import { PointInterface } from "../types/point";
import { Actor } from "./actor";

export class Music extends Actor {
  public audio: HTMLAudioElement;

  constructor(public position: PointInterface = { x: 0, y: 0 }) {
    super(position);
    this.audio = new Audio();
    this.audio.src = "src/media/gotune.mp3";

    this.audio.autoplay = false;
    this.audio.loop = true;
    this.audio.volume = 0.03;
  }

  update() {
   this.audio.play();
  }
}
