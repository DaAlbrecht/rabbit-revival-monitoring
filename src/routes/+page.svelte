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

  async function publishMore() {
    await fetch(`/api/publish?queue=${$selectedQueue}`);
  }

  $: failedMessages = Math.round($messagesQuery.data?.length / 10);
  $: successRate = 100 - Math.round((failedMessages / $messagesQuery.data?.length) * 100);
  let replayedMessages = new Map();
  $: replayed = replayedMessages.get($selectedQueue) || 0;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="h-full text-neutral-300">
  <div class="flex h-full flex-col text-neutral-200 transition duration-200">
    <div class="flex h-[52px] justify-between">
      <!-- TODO: SELECT QUEUE -->
      <div>
        <p>RabbitRevival - Monitoring / V1.0</p>
      </div>
      <div class="flex items-center gap-2">
        <button
          on:click={publishMore}
          type="button"
          class="mr-2 rounded-lg border-gray-700 bg-gray-800 px-5 py-2.5 text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
          >Publish More</button
        >
        <select
          id="queues"
          class="block rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
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
              replayedMessages={replayed}
              error={$query.isError ? $query.error.message : null}
              loading={$query.isLoading}
            />
          </div>
          {#if $messagesQuery.isSuccess}
            <Messages
              messages={$messagesQuery.data}
              queue={$selectedQueue}
              on:replayed={() =>
                (replayedMessages = replayedMessages.set(
                  $selectedQueue,
                  (replayedMessages.get($selectedQueue) || 0) + 1
                ))}
            />
          {:else}
            <div
              class="highlight-white/5 relative h-[calc(100%-250px)] overflow-hidden rounded-lg border-2 border-rose-300"
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
