<script lang="ts">
  import { World } from "$lib/world";
  import { StarEntity } from "$lib/entities";
  import { onMount } from "svelte";
  import Two from "two.js";
  import type { Star } from "two.js/src/shapes/star";
  import { Ship, ShipType } from "$lib/ship/ship";
  import { paddedRandom } from "$lib/random";
  import { PathFindingState } from "$lib/controller";

  export let mousePosition: { x: number; y: number } | null = null;
  export let starCount: number = 100;
  export let shipCount: Partial<{ [key in ShipType]: number }> = {
    [ShipType.Scout]: 1,
    [ShipType.Fighter]: 1,
    [ShipType.Bomber]: 1,
    [ShipType.Transport]: 1,
  };

  const SHIP_STARTING_POSITION = -100;

  let target: HTMLElement;
  let mode: PathFindingState = PathFindingState.Wander;

  function createWorld() {
    const params = {
      fullscreen: true,
      type: Two.Types.webgl,
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

    Object.entries(shipCount).forEach(([type, count]) => {
      if (ShipType.hasOwnProperty(type) === false) return;

      for (let i = 0; i < count; i++) {
        const ship = Ship.make({
          type: type as ShipType,
        });

        world.addShip(ship, {
          x: SHIP_STARTING_POSITION,
          y: paddedRandom(world.height, 10),
        });
      }
    });

    return world;
  }

  function runSimulation(world: World) {
    world.bind("update", (frame: number, frametime: number) => {
      if (frame % 10 !== 0) {
        world.stars.forEach((star) => {
          // Make the stars twinkle
          if (Math.random() < 0.7) return;

          const opacity = Math.random() * 0.5 + 0.5;

          (star.shape as Star).fill = `rgba(255, 255, 255, ${opacity})`;
        });
      }

      if (mode == PathFindingState.Seek) {
        world.mousePosition = mousePosition;
      }

      world.controllers.forEach((controller) => {
        if (mode == PathFindingState.Seek && mousePosition !== null) {
          controller.pathFindingState = PathFindingState.Seek;
          controller.target = new Two.Vector(mousePosition.x, mousePosition.y);
        } else {
          controller.pathFindingState = PathFindingState.Wander;
        }
        controller.update(world);
      });
    });

    world.play();
  }

  onMount(() => {
    const world = createWorld();
    runSimulation(world);
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="space"
  bind:this={target}
  on:click={() => {
    mode =
      mode == PathFindingState.Seek
        ? PathFindingState.Wander
        : PathFindingState.Seek;
  }}
></div>

<style>
  #space {
    width: 100%;
    height: 100%;
    background-color: #1e293b;
  }
</style>
