<script>
  import Constellation from './Constellation.svelte';
  import Star from './Star.svelte';
  export let rotation = 0;
  const max = 900;

  function generateRandomStar() {
    const x = Math.floor(Math.random() * (max - 0 + 1) + 0);
    const y = Math.floor(Math.random() * (max - 0 + 1) + 0);
    const dim = Math.random() < 0.5;
    const blur = Math.random() < 0.5;

    return [x, y, dim, blur].filter(Boolean);
  }

  const stars = Array.from({ length: 200 }, generateRandomStar);
  const constellations = [
    [
      [247, 13],
      [261, 6],
      [307, 14],
      [357, 0]
    ],
    [
      [733, 0],
      [803, 20],
      [879, 13],
      [823, 64],
      [803, 20]
    ]
  ];

  let blurId = `blur-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="absolute inset-0 overflow-hidden">
  <div class="p-8">
    <svg
      viewBox="0 0 900 900"
      fill="white"
      aria-hidden="true"
      class="pointer-events-none w-full origin-top-right overflow-visible opacity-80"
      style="rotate: {rotation}deg"
    >
      <defs>
        <filter id={blurId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation=".5" />
        </filter>
      </defs>
      {#each constellations as points, constellationIndex (constellationIndex)}
        <Constellation {points} {blurId} />
      {/each}
      {#each stars as [cx, cy, dim, blur], pointIndex (pointIndex)}
        <Star {cx} {cy} {dim} {blur} {blurId} />
      {/each}
    </svg>
  </div>
</div>
