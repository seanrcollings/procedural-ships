<script lang="ts">
  import { World } from "$lib/world";
  import { StarEntity } from "$lib/entities";
  import { onMount } from "svelte";
  import Two from "two.js";
  import type { Star } from "two.js/src/shapes/star";
  import { Ship, ShipType } from "$lib/ship/ship";
  import { paddedRandom } from "$lib/random";
  import type { Coordinates } from "$lib/types";

  export let mousePosition: Coordinates | null = null;
  export let starCount: number = 100;
  export let shipCount: Partial<{ [key in ShipType]: number }> = {
    [ShipType.Scout]: 1,
    [ShipType.Fighter]: 1,
    [ShipType.Bomber]: 1,
    [ShipType.Transport]: 1,
  };
  export let getShipStartingPosition: (
    world: World,
    ship: Ship,
    index: number
  ) => Coordinates;

  const SHIP_WRAP_AROUND = -50;

  let target: HTMLElement;

  function createWorld() {
    const params = {
      fullscreen: true,
      type: Two.Types.canvas,
    };

    const world = new World(target, params);

    for (let i = 0; i < starCount; i++) {
      const star = StarEntity.make({
        size: Math.random() * 4,
      });

      world.addStar(star, {
        x: Math.random() * world.width,
        y: Math.random() * world.height,
      });
    }

    Object.entries(shipCount).forEach(([type, count], idx) => {
      if (ShipType.hasOwnProperty(type) === false) return;

      for (let i = 0; i < count; i++) {
        const ship = Ship.make({
          type: type as ShipType,
        });

        world.addShip(ship, getShipStartingPosition(world, ship, idx));
      }
    });

    return world;
  }

  function runSimulation(world: World) {
    world.bind("update", (frame: number, frametime: number) => {
      if (frame % 10 === 0) {
        world.stars.forEach((star) => {
          // Make the stars twinkle
          if (Math.random() < 0.7) return;

          const opacity = Math.random() * 0.5 + 0.5;

          (star.shape as Star).fill = `rgba(255, 255, 255, ${opacity})`;
        });
      }

      world.ships.forEach((ship) => {
        if (mousePosition === null || true) {
          // Ships move from the left to the right
          ship.rotation = Math.PI / 2;
          ship.applyForce(new Two.Vector(0.1, 0));

          if (ship.translation.x > world.width + 100) {
            ship.translation.x = SHIP_WRAP_AROUND;
            ship.velocity.x = 0;
            ship.position.y = paddedRandom(world.height, 10);
          }
        } else {
          // Ships move towards the mouse
          const dx = mousePosition.x - ship.translation.x;
          const dy = mousePosition.y - ship.translation.y;
          const angle = Math.atan2(dy, dx);

          ship.rotation = angle + Math.PI / 2;

          ship.applyForce(
            new Two.Vector(Math.sign(dx) * 0.1, Math.sign(dy) * 0.1)
          );
        }

        ship.update();
      });
    });

    world.play();
  }

  onMount(() => {
    const world = createWorld();
    runSimulation(world);
  });
</script>

<div id="space" bind:this={target}></div>

<style>
  #space {
    width: 100%;
    height: 100%;
    background-color: #1e293b;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
