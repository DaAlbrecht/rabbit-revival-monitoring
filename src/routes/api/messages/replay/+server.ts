import { PUBLIC_RABBIT_REVIVAL_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

//Replay single message /replay?transaction_id=transaction_id
//curl localhost:3000/replay -H 'Content-Type: application/json'  -d '{"queue":"replay", "header":{"name":"x-stream-transaction-id","value":"transaction_499"}}' | jq

//Replay multiple
//curl localhost:3000/replay -H 'Content-Type: application/json'  -d '{"queue":"replay", "from":"", "to", ""}' | jq
//TODO: IMPLEMENT THIS
const replaySingle = async (queue, messageId) => {
  const url = `${PUBLIC_RABBIT_REVIVAL_URL}/replay`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        queue: queue,
        header: {
          name: 'x-stream-transaction-id',
          value: messageId
        }
      })
    });
    const json = await res.json();
    return json;
  } catch (e) {
    throw new Error(e);
  }
};
export const POST: RequestHandler = async ({ request }) => {
  const { queue, messageId } = await request.json();
  const response = await replaySingle(queue, messageId);
  return new Response(JSON.stringify(response));
};
