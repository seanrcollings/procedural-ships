import { Entity } from "$lib/entities";
import Two from "two.js";

const SHIP_COLOR = "gray";

interface ShipParams {
  mass: number;
}

export class Ship extends Entity {
  public static make(params: ShipParams) {
    const ship = new Two.Group();
    ship.scale = 0.2;

    const wing = new Two.Polygon(-25, 25, 30, 3);
    wing.fill = SHIP_COLOR;
    wing.stroke = SHIP_COLOR;
    ship.add(wing);

    const wing2 = new Two.Polygon(25, 25, 30, 3);
    wing2.fill = SHIP_COLOR;
    wing2.stroke = SHIP_COLOR;
    ship.add(wing2);

    const flame = new Two.Path([
      new Two.Anchor(-25, 50),
      new Two.Anchor(25, 50),
      new Two.Anchor(0, 100),
    ]);
    flame.fill = "orange";
    flame.stroke = "orange";
    ship.add(flame);

    const thruster = new Two.Path([
      new Two.Anchor(-25, 50),
      new Two.Anchor(25, 50),
      new Two.Anchor(35, 75),
      new Two.Anchor(-35, 75),
    ]);
    thruster.fill = SHIP_COLOR;
    thruster.stroke = SHIP_COLOR;
    ship.add(thruster);

    const nose = new Two.Polygon(0, -65, 29, 3);
    nose.fill = SHIP_COLOR;
    nose.stroke = SHIP_COLOR;
    ship.add(nose);

    // Rectangle x and y is the center of the rectangle
    const body = new Two.Rectangle(0, 0, 50, 100);
    body.fill = SHIP_COLOR;
    body.stroke = SHIP_COLOR;
    ship.add(body);

    const viewport = new Two.Circle(0, 0, 10);
    viewport.fill = "white";
    ship.add(viewport);

    return new Ship(ship, params.mass);
  }
}
