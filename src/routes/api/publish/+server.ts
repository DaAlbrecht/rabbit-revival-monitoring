import { env } from '$env/dynamic/public';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const queue = url.searchParams.get('queue') ?? 'bar';
  const demoPublishUrl = `${env.PUBLIC_RABBIT_PUBLISH_URL}/publish?queue=${queue}`;
  try {
    const res = await fetch(demoPublishUrl, {
      method: 'POST'
    });
    return new Response(JSON.stringify(res));
  } catch (e) {
    throw new Error(e);
  }
};
