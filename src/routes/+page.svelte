<script lang="ts">
  import { page } from "$app/stores";
  import Space from "$lib/components/Space.svelte";
  import { ShipType } from "$lib/ship/ship";

  const starCount =
    parseInt($page.url.searchParams.get("starCount") || "", 10) || 0;
  const shipCount = {
    [ShipType.Scout]:
      parseInt($page.url.searchParams.get("scoutCount") || "", 10) || 0,
    [ShipType.Fighter]:
      parseInt($page.url.searchParams.get("fighterCount") || "", 10) || 0,
    [ShipType.Bomber]:
      parseInt($page.url.searchParams.get("bomberCount") || "", 10) || 0,
    [ShipType.Transport]:
      parseInt($page.url.searchParams.get("transportCount") || "", 10) || 0,
  };

  console.log($page.url.searchParams);

  let mousePosition: { x: number; y: number } | null = null;
</script>

<svelte:window
  on:mousemove={(e) => {
    mousePosition = { x: e.pageX, y: e.pageY };
  }}
/>

<Space {mousePosition} {starCount} {shipCount} />
