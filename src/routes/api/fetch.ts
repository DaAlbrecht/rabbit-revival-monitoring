import { env } from '$env/dynamic/private';
import { PUBLIC_RABBIT_MANAGEMENT_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const rabbitFetch = async (endpoint: string) => {
    const RABBIT_USERNAME = env.RABBIT_USERNAME;
    const RABBIT_PASSWORD = env.RABBIT_PASSWORD;
    const url = `${PUBLIC_RABBIT_MANAGEMENT_URL}/api/${endpoint}`;
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
