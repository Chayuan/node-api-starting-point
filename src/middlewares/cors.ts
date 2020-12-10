import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): any => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};