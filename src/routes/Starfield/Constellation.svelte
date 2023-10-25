<script>
  import Star from './Star.svelte';
  export let points;
  export let blurId;
  let uniquePoints = points.filter(
    (point, pointIndex) => points.findIndex((p) => p.toString() === point.toString()) === pointIndex
  );
</script>

<path
  stroke="white"
  stroke-opacity="0.2"
  stroke-dasharray="1"
  stroke-dashoffset="0"
  pathLength="1"
  fill="rgba(255, 255, 255, 0.02)"
  d={`M ${points.join('L')}`}
/>
{#each uniquePoints as point, pointIndex (pointIndex)}
  <Star {...point} {blurId} key={pointIndex} />
{/each}
