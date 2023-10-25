<script>
  export let cx;
  export let cy;
  export let dim;
  export let blur;
  export let blurId;
</script>

<g class="">
  <circle
    {cx}
    {cy}
    r={1}
    style={`transform-origin: ${cx / 16}rem ${cy / 16}rem; opacity: ${
      dim ? 0.2 : 1
    }; transform: scale(${dim ? 1 : 1.2});`}
    filter={blur ? `url(#${blurId})` : undefined}
  />
</g>
