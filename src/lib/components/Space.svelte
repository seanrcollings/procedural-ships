<script lang="ts">
  import { World } from "$lib/world";
  import { StartEntity } from "$lib/entities";
  import { onMount } from "svelte";
  import Two from "two.js";
  import type { Star } from "two.js/src/shapes/star";
  import { Ship } from "$lib/ship/ship";

  export let mousePosition: { x: number; y: number } | null = null;
  export let includeStars: boolean = true;

  let target: HTMLElement;

  onMount(() => {
    const params = {
      fullscreen: true,
    };
    const world = new World(target, params);

    if (includeStars) {
      for (let i = 0; i < 1000; i++) {
        const star = StartEntity.make({
          size: Math.random() * 4,
        });

        world.addStar(star, {
          x: Math.random() * world.width,
          y: Math.random() * world.height,
        });
      }
    }

    for (let i = 0; i < 10; i++) {
      const ship = Ship.make({
        mass: Math.random() * 100 + 10,
      });

      world.addShip(ship, {
        x: -50,
        y: Math.max(Math.random() * (world.height - 10), 10),
      });
    }

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
        if (mousePosition === null) {
          // Ships move from the left to the right
          ship.rotation = Math.PI / 2;
          ship.applyForce(new Two.Vector(0.1, 0));

          if (ship.translation.x > world.width) {
            ship.translation.x = 0;
            ship.velocity.x = 0;
            ship.position.set(
              -50,
              Math.max(Math.random() * (world.height - 10), 10)
            );
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
  });
</script>

<div id="space" bind:this={target}></div>

<style>
  #space {
    width: 100%;
    height: 100%;
    background-color: #1e293b;
  }
</style>
