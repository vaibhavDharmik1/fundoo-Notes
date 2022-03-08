import HttpStatus from 'http-status-codes';
import { client } from '../config/redis';

export const allNotes = async (req, res, next) => {
    const data = await client.get('getAllNotes');
    if(data == null){
        next();
    }else {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: JSON.parse(data),
            message: 'All notes fetched successfully by redis '
        });
    }
}