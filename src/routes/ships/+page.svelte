<script lang="ts">
  import { Ship, ShipType } from "$lib/ship/ship";
  import { World } from "$lib/world";
  import { onMount } from "svelte";

  let target: HTMLElement;

  function createWorld() {
    const params = {
      fullscreen: true,
    };

    const world = new World(target, params);

    const fighter = Ship.make({
      type: ShipType.Fighter,
      mass: Math.random() * 100 + 10,
    });

    world.addShip(fighter, {
      x: 100,
      y: 100,
    });

    const bomber = Ship.make({
      type: ShipType.Bomber,
      mass: Math.random() * 100 + 10,
    });

    world.addShip(bomber, {
      x: 250,
      y: 100,
    });

    const transport = Ship.make({
      type: ShipType.Transport,
      mass: Math.random() * 100 + 10,
    });

    world.addShip(transport, {
      x: 400,
      y: 300,
    });

    const scout = Ship.make({
      type: ShipType.Scout,
      mass: Math.random() * 100 + 10,
    });

    world.addShip(scout, {
      x: 550,
      y: 100,
    });

    world.update();
  }

  onMount(() => {
    createWorld();
  });
</script>

<main bind:this={target} />

<style>
  main {
    width: 100%;
    height: 100%;
    background-color: #1e293b;
  }
</style>
