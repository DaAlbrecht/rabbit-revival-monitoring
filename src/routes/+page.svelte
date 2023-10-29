<script lang="ts">
  import Messages from '$lib/components/Messages/Messages.svelte';
  import Stats from './Stats.svelte';
  import { derived, writable } from 'svelte/store';
  import { createQuery } from '@tanstack/svelte-query';
  import type { PageData } from './$types';

  export let data: PageData;
  let selectedQueue = data.queue.name;

  const intervalMs = writable(5000);

  const query = createQuery(
    derived(intervalMs, ($intervalMs) => ({
      queryKey: ['overview'],
      queryFn: async () => {
        const response = await fetch('/api/metrics');
        if (!response.ok) {
          intervalMs.set(10000);
          throw new Error('Metrics failed');
        }
        if ($intervalMs !== 5000) {
          intervalMs.set(5000);
        }
        return response.json();
      },
      refetchInterval: $intervalMs
    }))
  );

  const messagesQuery = createQuery(
    derived(intervalMs, ($intervalMs) => ({
      queryKey: ['messages'],
      queryFn: async () => {
        const response = await fetch(`/api/messages?queue=${data.queue.name}`);
        if (!response.ok) {
          throw new Error('Metrics failed');
        }
        return response.json();
      }
    }))
  );

  $: failedMessages = Math.round($messagesQuery.data?.length / 10);
  $: successRate = 100 - Math.round((failedMessages / $messagesQuery.data?.length) * 100);
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="h-full text-neutral-300 dark:text-neutral-200">
  <div class="flex h-full flex-col text-white transition duration-200 dark:text-neutral-200">
    <div class="flex h-[52px] justify-between">
      <!-- TODO: SELECT QUEUE -->
      <div>
        <p>RabbitRevival - Monitoring / V1.0</p>
      </div>
      <div class="flex items-center gap-2">
        <select
          id="queues"
          class="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          bind:value={selectedQueue}
        >
          {#each data.queues as queue}
            <option value={queue.name}>{queue.name.toUpperCase()}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="mt-4 grow overflow-x-auto">
      <div class="h-full overflow-hidden">
        <div class="flex h-full flex-col gap-4">
          <div class="grid h-[250px] grid-cols-3 grid-rows-2 gap-4">
            <Stats
              data={$query.isSuccess ? $query.data : null}
              queue={selectedQueue}
              {failedMessages}
              {successRate}
              error={$query.isError ? $query.error.message : null}
              loading={$query.isLoading}
            />
          </div>
          {#if $messagesQuery.isSuccess}
            <Messages messages={$messagesQuery.data} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
