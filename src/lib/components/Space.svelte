<script lang="ts">
  import { World } from "$lib/world";
  import { Ship, StartEntity } from "$lib/entities";
  import { onMount } from "svelte";
  import Two from "two.js";
  import type { Star } from "two.js/src/shapes/star";

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
          x: Math.random() * world.width,
          y: Math.random() * world.height,
          size: Math.random() * 4 + 1,
        });

        world.addStar(star);
      }
    }

    for (let i = 0; i < 10; i++) {
      const ship = Ship.make({
        x: Math.random() * world.width,
        y: Math.random() * world.height,
      });
      world.addShip(ship);
    }

    world.bind("update", (frame: number, frametime: number) => {
      if (mousePosition === null) return;

      if (frame % 10 === 0) {
        world.stars.forEach((star) => {
          // Make the stars twinkle
          if (Math.random() < 0.7) return;

          const opacity = Math.random() * 0.5 + 0.5;

          (star.shape as Star).fill = `rgba(255, 255, 255, ${opacity})`;
        });
      }

      world.ships.forEach((ship) => {
        if (mousePosition === null) return;
        const dx = mousePosition.x - ship.translation.x;
        const dy = mousePosition.y - ship.translation.y;

        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
          return;
        }

        const angle = Math.atan2(dy, dx);

        ship.rotation = angle + Math.PI / 2;
        ship.applyForce(
          new Two.Vector(Math.sign(dx) * 0.1, Math.sign(dy) * 0.1)
        );

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
