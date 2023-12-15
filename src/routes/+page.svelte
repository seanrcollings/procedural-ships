<script lang="ts">
  import Space from "$lib/components/Space.svelte";
  import { ShipType } from "$lib/ship/ship";

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
    [ShipType.Scout]: 15,
    [ShipType.Fighter]: 10,
    // [ShipType.Bomber]: 10,
    [ShipType.Transport]: 10,
  }}
/>
