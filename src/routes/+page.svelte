<script lang="ts">
  import { World } from "$lib/World";
  import { Ship } from "$lib/entities";
  import { onMount } from "svelte";
  import Two from "two.js";

  let mousePosition: { x: number; y: number } = { x: 0, y: 0 };

  let target: HTMLElement;

  onMount(() => {
    const params = {
      fullscreen: true,
    };
    const world = new World(target, params);

    for (let i = 0; i < 10; i++) {
      const ship = Ship.make({
        x: Math.random() * world.two.width,
        y: Math.random() * world.two.height,
      });
      world.addShip(ship);
    }

    world.two.bind("update", (frame: number, frametime: number) => {
      if (mousePosition.x === 0 && mousePosition.y === 0) {
        return;
      }

      world.ships.forEach((ship) => {
        const dx = mousePosition.x - ship.translation.x;
        const dy = mousePosition.y - ship.translation.y;

        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
          return;
        }

        const angle = Math.atan2(dy, dx);

        ship.rotation = angle + Math.PI / 2;
        ship.applyForce(
          new Two.Vector(Math.sign(dx) * 0.01, Math.sign(dy) * 0.01)
        );

        ship.update();
      });
    });

    world.two.play();
  });
</script>

<svelte:window
  on:mousemove={(e) => {
    mousePosition = { x: e.pageX, y: e.pageY };
  }}
/>

<main bind:this={target}></main>

<style>
  main {
    width: 100%;
    height: 100%;
    background-color: #1e293b;
  }
</style>
