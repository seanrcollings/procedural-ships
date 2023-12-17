<script lang="ts">
  import Space from "$lib/components/Space.svelte";
  import { paddedRandom } from "$lib/random";
  import { Ship, ShipType } from "$lib/ship/ship";

  let mousePosition: { x: number; y: number } | null = null;
</script>

<svelte:window
  on:mousemove={(e) => {
    mousePosition = { x: e.pageX, y: e.pageY };
  }}
/>

<Space
  {mousePosition}
  starCount={100}
  shipCount={{
    [ShipType.Fighter]: 10,
    [ShipType.Bomber]: 0,
    [ShipType.Transport]: 10,
    [ShipType.Scout]: 10,
  }}
  getShipStartingPosition={(world) => ({
    x: -50,
    y: paddedRandom(world.height, 50),
  })}
/>
