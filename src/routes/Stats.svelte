<script>
  import GridItem from '$lib/components/GridItem.svelte';
  import Number from '$lib/components/Number.svelte';
  export let loading;
  export let error;
  export let data;
</script>

<div>
  <GridItem title="Queues" {loading} {error}>
    {#if data}
      <Number number={data.message_stats.publish_details.rate} />
    {/if}
  </GridItem>
</div>
<div>
  <GridItem title="Incoming messages / s" {loading} {error}>
    {#if data}
      <Number number={data.message_stats.publish_details.rate} />
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
  <GridItem title="Unaknowledged messages" {loading} {error}>
    {#if data}
      <Number
        type={data.queue_totals.messages_unacknowledged > 0 ? 'error' : 'success'}
        number={data.queue_totals.messages_unacknowledged}
      />
    {/if}
  </GridItem>
</div>
<div>
  <GridItem title="Outgoing messages / s" {loading} {error}>
    {#if data}
      <Number number={data.message_stats.confirm_details.rate} />
    {/if}
  </GridItem>
</div>
<div>
  <GridItem title="Consumers" {loading} {error}>
    {#if data}
      <Number number={data.object_totals.consumers} />
    {/if}
  </GridItem>
</div>
