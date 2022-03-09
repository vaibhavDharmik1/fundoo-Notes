import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();

const clientRedis = async() => {
    try {
        await client.connect();
    }catch(error){
        console.log(error);
    }
}
export default clientRedis;