<script>
  import Messages from '$lib/components/Messages/Messages.svelte';
  import Stats from './Stats.svelte';
  import { derived, writable } from 'svelte/store';
  import { createQuery } from '@tanstack/svelte-query';

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
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="h-full text-neutral-300 dark:text-neutral-200">
  <div class="flex h-full flex-col text-white transition duration-200 dark:text-neutral-200">
    <div class="flex h-[52px]">
      <p>RabbitRevival - Monitoring / V1.0</p>
    </div>
    <div class="mt-4 grow overflow-x-auto">
      <div class="h-full overflow-hidden">
        <div class="flex h-full flex-col gap-4">
          <div class="grid h-[250px] grid-cols-3 grid-rows-2 gap-4">
            <Stats
              data={$query.isSuccess ? $query.data : null}
              error={$query.isError ? $query.error.message : null}
              loading={$query.isLoading}
            />
          </div>
          <Messages />
        </div>
      </div>
    </div>
  </div>
</section>
