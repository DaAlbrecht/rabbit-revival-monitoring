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
    }
  });
};
