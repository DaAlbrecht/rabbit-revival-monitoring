import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
  const { queryClient } = await parent();

  // You need to use the SvelteKit fetch function here
  await queryClient.prefetchQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      const response = await fetch('/api/metrics');
      if (response.ok) {
        return response.json();
      }
      throw new Error('Metrics failed');
    }
  });

  let queues;
  let queue;
  try {
    const resonse = await fetch('/api/queues');
    queues = await resonse.json();
    queue = queues[0];
  } catch (e) {
    error(500, 'Could not load messges and queues');
  }

  await queryClient.prefetchQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await fetch(`/api/messages?queue=${queue.name}`);
      if (response.ok) {
        return response.json();
      }
      throw new Error('Metrics failed');
    }
  });

  return {
    queues: queues,
    queue: queue
  };
};
