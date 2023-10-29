import { RABBIT_MANAGEMENT_URL, RABBIT_PASSWORD, RABBIT_USERNAME } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const rabbitFetch = async (endpoint: string) => {
  const url = `${RABBIT_MANAGEMENT_URL}/api/${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${btoa(`${RABBIT_USERNAME}:${RABBIT_PASSWORD}`)}`
      }
    });
    const json = await res.json();
    return json;
  } catch (e) {
    throw error(500, 'RabbitMQ API error');
  }
};
