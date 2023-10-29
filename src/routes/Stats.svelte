<script>
  import GridItem from '$lib/components/GridItem.svelte';
  import Number from '$lib/components/Number.svelte';
  export let loading;
  export let error;
  export let data;
  export let queue;
</script>

<div>
  <GridItem title="Queue" {loading} {error}>
    <div
      class="absolute inset-0 flex items-center justify-center pb-[25px] text-4xl font-semibold text-teal-500"
    >
      {queue.toUpperCase()}
    </div>
  </GridItem>
</div>
<div>
  <GridItem title="Incoming messages / s" {loading} {error}>
    {#if data && data.message_stats.publish_details}
      <Number number={data.message_stats.publish_details.rate} />
    {:else}
      <Number number={0} />
    {/if}
  </GridItem>
</div>
<div>
  <GridItem title="Producers" {loading} {error}>
    {#if data}
      <Number number={data.object_totals.connections - data.object_totals.consumers} />
    {/if}
  </GridItem>
</div>
<div>
  <GridItem title="Failed messages" {loading} {error}>
    <Number type="error" number={0} />
  </GridItem>
</div>
<div>
  <GridItem title="Success rate" {loading} {error}>
    <Number number={100} sign="%" />
  </GridItem>
</div>
<div>
  <GridItem title="Replayed messages" {loading} {error}>
    {#if data}
      <Number number={data.object_totals.consumers} />
    {/if}
  </GridItem>
</div>
