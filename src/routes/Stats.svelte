<script>
  import GridItem from '$lib/components/GridItem.svelte';
  import Number from '$lib/components/Number.svelte';
</script>

<div>
  <GridItem title="System State">
    <div
      class="absolute inset-0 flex items-center justify-center pb-[25px] text-4xl font-semibold text-green-500"
    >
      Online
    </div>
  </GridItem>
</div>
<div>
  <GridItem title="Incoming messages / s">
    <Number number={41.12} />
  </GridItem>
</div>
<div>
  <GridItem title="Publishers">
    <Number number={1} />
  </GridItem>
</div>
<div>
  <GridItem title="Unaknowledged messages">
    <Number type="error" number={10} />
  </GridItem>
</div>
<div>
  <GridItem title="Outgoing messages / s">
    <Number number={23.46} />
  </GridItem>
</div>
<div>
  <GridItem title="Consumers">
    <Number number={2} />
  </GridItem>
</div>
