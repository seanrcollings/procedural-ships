import type { Vector } from "two.js/src/vector";
import type { Entity } from "./entities";
import type { World } from "./world";
import Two from "two.js";
import { paddedRandom } from "./random";

export enum PathFindingState {
  Wander,
  Seek,
  Line,
}

export class Controller {
  private entity: Entity;
  pathFindingState: PathFindingState = PathFindingState.Line;
  target: Vector | null = null;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  update(world: World) {
    switch (this.pathFindingState) {
      case PathFindingState.Wander:
        this.wander(world);
        break;
      case PathFindingState.Seek:
        this.seek(world);
        break;
      case PathFindingState.Line:
        this.line(world);
        break;
    }

    this.entity.update();
  }

  teleport(vector: Vector) {
    this.entity.translation.set(vector.x, vector.y);
  }

  wander(world: World) {
    if (this.target === null) {
      this.target = this.selectTarget(world);
    }

    // If we're far away from the world center, teleport and pick a new target
    if (
      this.entity.translation.x > world.width + world.killBorder ||
      this.entity.translation.x < -world.width - world.killBorder ||
      this.entity.translation.y > world.height + world.killBorder ||
      this.entity.translation.y < -world.height - world.killBorder
    ) {
      this.teleport(this.selectStartLocation(world));

      this.entity.velocity.set(0, 0);
      this.target = null;
      return;
    }

    const dx = this.target.x - this.entity.translation.x;
    const dy = this.target.y - this.entity.translation.y;

    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      this.target = null;
      return;
    }

    const angle = Math.atan2(dy, dx);

    this.entity.rotation = angle + Math.PI / 2;

    this.entity.applyForce(
      new Two.Vector(Math.sign(dx) * 0.1, Math.sign(dy) * 0.1)
    );
  }

  seek(world: World) {
    const target = this.target as Vector;
    const dx = target.x - this.entity.translation.x;
    const dy = target.y - this.entity.translation.y;

    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      this.target = null;
      return;
    }

    const angle = Math.atan2(dy, dx);

    this.entity.rotation = angle + Math.PI / 2;

    this.entity.applyForce(
      new Two.Vector(Math.sign(dx) * 0.1, Math.sign(dy) * 0.1)
    );
  }

  line(world: World) {
    if (this.target === null) {
      this.target = new Two.Vector(
        world.width + 200,
        this.entity.translation.y
      );
    }

    if (this.entity.translation.x > world.width + world.killBorder) {
      this.teleport(new Two.Vector(-100, paddedRandom(world.height, 10)));
      this.entity.velocity.set(0, 0);
      this.target = null;
      return;
    }

    const target = this.target as Vector;
    const dx = target.x - this.entity.translation.x;
    const dy = target.y - this.entity.translation.y;

    const angle = Math.atan2(dy, dx);

    this.entity.rotation = angle + Math.PI / 2;

    this.entity.applyForce(new Two.Vector(0.1, 0));
  }

  selectTarget(world: World) {
    let x: number;
    let y: number;

    const exclude = { x: 0, y: 0, width: world.width, height: world.height };

    do {
      x = Math.random() * (world.width * 2) - world.width / 2;
      y = Math.random() * (world.height * 2) - world.height / 2;
    } while (
      x >= exclude.x &&
      x <= exclude.x + exclude.width &&
      y >= exclude.y &&
      y <= exclude.y + exclude.height
    );

    return new Two.Vector(x, y);
  }

  selectStartLocation(world: World) {
    let x: number;
    let y: number;

    const exclude = { x: 0, y: 0, width: world.width, height: world.height };

    do {
      x = Math.random() * world.width + 100;
      y = Math.random() * world.height + 100;
    } while (
      x >= exclude.x &&
      x <= exclude.x + exclude.width &&
      y >= exclude.y &&
      y <= exclude.y + exclude.height
    );

    return new Two.Vector(x, y);
  }
}
