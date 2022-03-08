import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();

const clientRedis = async() => {
    // client.on('error', (err) => logger.info('Redis Client Error', err));

    // client.on('connect', () => {
    //     logger.info('Redis Connected Successfully!!!');
    // });
    try {
        await client.connect();
    }catch(error){
        console.log(error);
    }
}
export default clientRedis;