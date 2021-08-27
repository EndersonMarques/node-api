import { Request, Response } from 'express';

import { Phrase } from '../models/Phrase'


export const ping = (req: Request, res: Response) =>{
    res.json({pong: true});
}

export const random = (req: Request, res: Response) => {
    let numero: number = Math.floor(Math.random() * 10)
    res.json({numero});
}

export const nome = (req: Request, res: Response) => {
    let name = req.params.nome;
    res.json({name});
}