import Two from "two.js";
import type { StarEntity } from "./entities";
import type { Position } from "./types";
import type { Ship } from "./ship/ship";
import { Controller } from "./controller";

export class World {
  private two: Two;
  controllers: Controller[];
  stars: StarEntity[];
  mousePosition: Position | null = null;
  killBorder = 100;

  constructor(element: HTMLElement, params = {}) {
    this.controllers = [];
    this.stars = [];
    this.two = new Two(params);
    this.two.appendTo(element);
  }

  get height() {
    return this.two.height;
  }

  get width() {
    return this.two.width;
  }

  public addShip(ship: Ship, position: Position) {
    const controller = new Controller(ship);
    this.controllers.push(controller);
    ship.translation.set(position.x, position.y);
    this.two.add(ship.shape);
  }

  public addStar(star: StarEntity, position: Position) {
    this.stars.push(star);
    star.position.set(position.x, position.y);
    this.two.add(star.shape);
  }

  public bind(
    event: string,
    callback: (frame: number, frametime: number) => void
  ) {
    this.two.bind(event, callback);
  }

  public play() {
    this.two.play();
  }

  public update() {
    this.two.update();
  }
}
