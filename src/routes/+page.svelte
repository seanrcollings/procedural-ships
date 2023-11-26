<script lang="ts">
  import Space from "$lib/components/Space.svelte";

  let mousePosition: { x: number; y: number } | null = null;
</script>

<svelte:window
  on:mousemove={(e) => {
    mousePosition = { x: e.pageX, y: e.pageY };
  }}
/>

<Space {mousePosition} includeStars={false} />
