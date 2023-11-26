import Two from "two.js";
import type { Ship } from "./entities";

export class World {
  ships: Ship[];
  two: Two;

  constructor(element: HTMLElement, params = {}) {
    this.ships = [];
    this.two = new Two(params);
    this.two.appendTo(element);
  }

  public addShip(ship: Ship) {
    // Keep track of the ships in the world
    this.ships.push(ship);

    // Make two aware of them so it can render them
    this.two.add(ship.shape);
  }
}
