import { PointInterface } from "../interfaces/point";
import { Actor } from "./actor";

export class Music extends Actor {
  public audio: HTMLAudioElement;

  constructor(public position: PointInterface = { x: 0, y: 0 }) {
    super(position);
    this.audio = new Audio();
    this.audio.src = "src/media/gotune.mp3";

    // Configuración de audio
    this.audio.autoplay = false;
    this.audio.loop = true;
    this.audio.volume = 0.03;
  }

  // update(delta: number) {
  //  this.audio.play();
  // }
}
