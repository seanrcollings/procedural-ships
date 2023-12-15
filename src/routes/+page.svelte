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
  starCount={0}
  shipCount={{
    [ShipType.Scout]: 1,
    [ShipType.Fighter]: 1,
    [ShipType.Bomber]: 1,
    [ShipType.Transport]: 1,
  }}
/>
