import { PUBLIC_RABBIT_REVIVAL_URL } from '$env/static/public';
import type { RequestHandler } from './$types';
//Get messages /list?queue=queue_name

//Replay single message /replay?transaction_id=transaction_id
//curl localhost:3000/replay -H 'Content-Type: application/json'  -d '{"queue":"replay", "header":{"name":"x-stream-transaction-id","value":"transaction_499"}}' | jq

//Replay multiple
//curl localhost:3000/replay -H 'Content-Type: application/json'  -d '{"queue":"replay", "from":"", "to", ""}' | jq
//TODO: IMPLEMENT THIS
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

export const POST: RequestHandler = async ({ url }) => {
  const queue = url.searchParams.get('queue') ?? 'bar';
  const messages = await revivalFetch(`list?queue=${queue}`);
  return new Response(JSON.stringify(messages.reverse()));
};
