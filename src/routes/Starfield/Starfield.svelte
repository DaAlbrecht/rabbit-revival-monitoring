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
      [247, 103],
      [261, 86],
      [307, 104],
      [357, 36]
    ],
    [
      [733, 100],
      [803, 120],
      [879, 113],
      [823, 164],
      [803, 120]
    ],
    [
      [120, 230],
      [120, 280],
      [120, 330],
      [100, 360],
      [160, 390],
      [120, 330]
    ]
  ];

  let blurId = `blur-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="absolute inset-0 overflow-hidden">
  <div class="p-20">
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
