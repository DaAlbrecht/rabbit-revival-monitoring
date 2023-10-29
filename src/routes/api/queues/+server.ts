import type { RequestHandler } from './$types';
import { rabbitFetch } from '../fetch';

export const GET: RequestHandler = async () => {
  const general = await rabbitFetch('queues');

  return new Response(JSON.stringify(general));
};
