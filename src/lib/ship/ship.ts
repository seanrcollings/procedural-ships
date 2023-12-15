import { Entity } from "$lib/entities";
import { rangeRandom } from "$lib/random";
import Two from "two.js";
import type { Shape } from "two.js/src/shape";

export enum ShipType {
  Fighter = "Fighter",
  Bomber = "Bomber",
  Transport = "Transport",
  Scout = "Scout",
}

interface ShipParams {
  type: ShipType;
}

export class Ship extends Entity {
  type: ShipType;

  constructor(shape: Shape, mass: number, type: ShipType) {
    super(shape, mass);
    this.type = type;
  }

  public static make(params: ShipParams): Ship {
    const builder = shipBuilders[params.type];

    const shape = builder.shape();
    const mass = builder.mass();
    const scale = builder.scale();
    shape.scale = scale;

    return new Ship(shape, mass, params.type);
  }
}

const shipBuilders = {
  [ShipType.Fighter]: {
    shape() {
      const ship = new Two.Group();

      const shipColor = this.colors;

      const wing = new Two.Polygon(-25, 25, 30, 3);
      wing.fill = shipColor.wing;
      wing.stroke = shipColor.wing;
      ship.add(wing);

      const wing2 = new Two.Polygon(25, 25, 30, 3);
      wing2.fill = shipColor.wing;
      wing2.stroke = shipColor.wing;
      ship.add(wing2);

      const flame = new Two.Path([
        new Two.Anchor(-25, 50),
        new Two.Anchor(25, 50),
        new Two.Anchor(0, 100),
      ]);
      flame.fill = shipColor.exhaust;
      flame.stroke = shipColor.exhaust;
      ship.add(flame);

      const thruster = new Two.Path([
        new Two.Anchor(-25, 50),
        new Two.Anchor(25, 50),
        new Two.Anchor(35, 75),
        new Two.Anchor(-35, 75),
      ]);
      thruster.fill = shipColor.thruster;
      thruster.stroke = shipColor.thruster;
      ship.add(thruster);

      const nose = new Two.Polygon(0, -65, 29, 3);
      nose.fill = shipColor.nose;
      nose.stroke = shipColor.nose;
      ship.add(nose);

      const body = new Two.Rectangle(0, 0, 50, 100);
      body.fill = shipColor.body;
      body.stroke = shipColor.body;
      ship.add(body);

      const viewport = new Two.Circle(0, 0, 10);
      viewport.fill = "white";
      ship.add(viewport);

      return ship;
    },
    mass() {
      return rangeRandom(20, 100);
    },
    scale() {
      return 0.2;
    },
    colors: {
      body: "#c63623",
      thruster: "#c63623",
      wing: "white",
      nose: "white",
      exhaust: "orange",
    },
  },
  [ShipType.Bomber]: {
    shape() {
      const ship = new Two.Group();

      // Bomber is made out of three circles and a rectangle

      const shipColor = this.colors;

      const body = new Two.Rectangle(0, 0, 70, 200);
      body.fill = shipColor.body;
      body.stroke = shipColor.body;

      const nose = new Two.Circle(0, -body.height / 2, body.width / 2);
      nose.fill = shipColor.nose;
      nose.stroke = shipColor.nose;

      const flame = new Two.Path([
        new Two.Anchor(-25, body.height / 2),
        new Two.Anchor(25, body.height / 2),
        new Two.Anchor(0, body.height / 2 + 50),
      ]);
      flame.fill = shipColor.exhaust;
      flame.stroke = shipColor.exhaust;
      ship.add(flame);

      const thruster = new Two.Path([
        new Two.Anchor(-25, body.height / 2),
        new Two.Anchor(25, body.height / 2),
        new Two.Anchor(35, body.height / 2 + 25),
        new Two.Anchor(-35, body.height / 2 + 25),
      ]);

      thruster.fill = shipColor.thruster;
      thruster.stroke = shipColor.thruster;

      const viewport = new Two.Circle(0, 0, 10);
      viewport.fill = "white";
      ship.add(viewport);

      ship.add(body);
      ship.add(nose);
      ship.add(flame);
      ship.add(thruster);

      return ship;
    },
    mass() {
      return rangeRandom(30, 200);
    },
    scale() {
      return 0.3;
    },
    colors: {
      body: "#211647",
      thruster: "#c63623",
      wing: "green",
      nose: "#c63623",
      exhaust: "yellow",
    },
  },
  [ShipType.Transport]: {
    shape() {
      const ship = new Two.Group();

      const shipColor = this.colors;

      const body = new Two.Rectangle(0, 0, 70, 200);
      body.fill = shipColor.body;
      body.stroke = shipColor.body;

      for (let i = 0; i < 5; i++) {
        const wing = new Two.Polygon(
          body.position.x - 25,
          body.position.y + 25 * i - 50,
          30,
          3
        );
        wing.fill = shipColor.wing;
        wing.stroke = shipColor.wing;
        ship.add(wing);
      }

      for (let i = 0; i < Math.floor(body.height / 60); i++) {
        const container = new Two.Rectangle(
          body.position.x + 25,
          body.position.y + body.height / 2 - 30 - 60 * i,
          50,
          50
        );

        container.fill = shipColor.container;
        container.stroke = shipColor.container;
        ship.add(container);
      }

      const flame = new Two.Path([
        new Two.Anchor(-25, body.height / 2),
        new Two.Anchor(25, body.height / 2),
        new Two.Anchor(0, body.height / 2 + 50),
      ]);
      flame.fill = shipColor.exhaust;
      flame.stroke = shipColor.exhaust;
      ship.add(flame);

      const thruster = new Two.Path([
        new Two.Anchor(-25, body.height / 2),
        new Two.Anchor(25, body.height / 2),
        new Two.Anchor(35, body.height / 2 + 25),
        new Two.Anchor(-35, body.height / 2 + 25),
      ]);
      thruster.fill = shipColor.thruster;
      thruster.stroke = shipColor.thruster;
      ship.add(thruster);

      const nose = new Two.Circle(
        0,
        body.position.y - body.height / 2,
        body.width / 2
      );
      nose.fill = shipColor.body;
      nose.stroke = shipColor.body;
      ship.add(nose);

      ship.add(body);

      const viewport = new Two.Circle(0, 0, 10);
      viewport.fill = "white";
      ship.add(viewport);

      return ship;
    },
    mass() {
      return rangeRandom(30, 100);
    },
    scale() {
      return 0.3;
    },
    colors: {
      body: "#2b6484",
      thruster: "#2b6484",
      wing: "#2b6484",
      nose: "#2b6484",
      exhaust: "orange",
      container: "gray",
    },
  },
  [ShipType.Scout]: {
    shape() {
      const ship = new Two.Group();

      const shipColors = this.colors;

      const params = {
        body: {
          width: 50,
          height: 100,
        },
        wings: {
          width: 20,
          height: 20,
        },
      };

      const body = new Two.Polygon(0, 0, params.body.width, 3);
      body.fill = shipColors.body;
      body.stroke = shipColors.body;

      const leftThruster = new Two.Rectangle(
        body.translation.x - params.body.width / 2,
        body.translation.y + 25,
        params.wings.width,
        params.wings.height
      );
      leftThruster.fill = shipColors.thruster;
      leftThruster.stroke = shipColors.thruster;

      const rightThruster = new Two.Rectangle(
        body.translation.x + params.body.width / 2,
        body.translation.y + 25,
        params.wings.width,
        params.wings.height
      );
      rightThruster.fill = shipColors.thruster;
      rightThruster.stroke = shipColors.thruster;

      const leftExhaust = new Two.Polygon(
        leftThruster.translation.x,
        leftThruster.translation.y + 13,
        10,
        3
      );
      leftExhaust.fill = shipColors.exhaust;
      leftExhaust.stroke = shipColors.exhaust;
      ship.add(leftExhaust);

      const rightExhaust = new Two.Polygon(
        rightThruster.translation.x,
        rightThruster.translation.y + 13,
        10,
        3
      );
      rightExhaust.fill = shipColors.exhaust;
      rightExhaust.stroke = shipColors.exhaust;
      ship.add(rightExhaust);

      ship.add(leftThruster);
      ship.add(rightThruster);

      ship.add(body);

      return ship;
    },
    mass() {
      return rangeRandom(10, 75);
    },
    scale() {
      return 0.2;
    },
    colors: {
      body: "#07423a",
      thruster: "gray",
      exhaust: "orange",
    },
  },
};
