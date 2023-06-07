import { Actor } from "./src/actors/actor";
import { FPSViewer } from "./src/actors/fps_viewer";
import { PointInterface } from "./src/types/point.d";
import { Fish } from "./src/actors/fish";
import { Background } from "./src/actors/background";
import { Music } from "./src/actors/music";
import { Score } from "./src/actors/score";
import { Garbage } from "./src/actors/garbage";
import { Bag } from "./src/actors/bag";

export class GameManager extends Actor {
    constructor(
    public position: PointInterface,
    public size: SizeInterface,
    public acceleration: number,
    public speed: number
}