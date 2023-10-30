<script lang="ts">
  import Messages from '$lib/components/Messages/Messages.svelte';
  import Stats from './Stats.svelte';
  import { derived, writable } from 'svelte/store';
  import { createQuery } from '@tanstack/svelte-query';
  import type { PageData } from './$types';

  export let data: PageData;

  const intervalMs = writable(7000);
  const selectedQueue = writable(data.queue.name);

  const query = createQuery(
    derived(intervalMs, ($intervalMs) => ({
      queryKey: ['overview'],
      queryFn: async () => {
        const response = await fetch('/api/metrics');
        if (!response.ok) {
          throw new Error('Metrics failed');
        }
        return response.json();
      },
      refetchInterval: $intervalMs
    }))
  );

  const messagesQuery = createQuery(
    derived([intervalMs, selectedQueue], ([$intervalMs, $selectedQueue]) => ({
      queryKey: ['messages', $selectedQueue],
      queryFn: async () => {
        const response = await fetch(`/api/messages?queue=${$selectedQueue}`);
        if (!response.ok) {
          throw new Error('Metrics failed');
        }
        return response.json();
      },
      refetchInterval: $intervalMs
    }))
  );

  $: failedMessages = Math.round($messagesQuery.data?.length / 10);
  $: successRate = 100 - Math.round((failedMessages / $messagesQuery.data?.length) * 100);
  let replayedMessages = 0;
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
          bind:value={$selectedQueue}
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
              queue={$selectedQueue}
              {failedMessages}
              {successRate}
              {replayedMessages}
              error={$query.isError ? $query.error.message : null}
              loading={$query.isLoading}
            />
          </div>
          {#if $messagesQuery.isSuccess}
            <Messages
              messages={$messagesQuery.data}
              queue={$selectedQueue}
              on:replayed={() => (replayedMessages += 1)}
            />
          {:else}
            <div
              class="dark:highlight-white/5 relative h-[calc(100%-250px)] overflow-hidden rounded-lg border-2 border-rose-300"
            >
              <div class="flex h-full flex-col">
                <div class="flex items-center justify-between p-4">
                  <p
                    class="text-dashboards-xs mr-2 truncate font-medium leading-normal text-rose-500 transition-all group-hover:mr-2"
                  >
                    No messages data
                  </p>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
