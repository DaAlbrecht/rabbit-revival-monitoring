import { PUBLIC_RABBIT_REVIVAL_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

const revivalFetch = async (endpoint: string) => {
  const url = `${PUBLIC_RABBIT_REVIVAL_URL}/${endpoint}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (e) {
    throw new Error(e);
  }
};

export const GET: RequestHandler = async ({ url }) => {
  const queue = url.searchParams.get('queue') ?? 'bar';
  const messages = await revivalFetch(`list?queue=${queue}`);
  return new Response(JSON.stringify(messages.reverse()));
};
