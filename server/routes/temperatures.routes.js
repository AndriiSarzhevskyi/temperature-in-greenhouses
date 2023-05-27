import express from 'express';
import { PrismaClient } from '@prisma/client';
import { randommas } from '../functionrandom.js';
import pkg from 'body-parser';
import moment from 'moment';

const prisma = new PrismaClient();
const { json, urlencoded } = pkg;

export const temperaturerouter = express();

temperaturerouter.use(json())
temperaturerouter.use(urlencoded({ extended: true }))

temperaturerouter.get(
    '/:id',
    async (req, res) => {
        try {
            const id1 = parseInt(req.params.id);
            const data = await prisma.greenhouse.findFirst({
                where: {
                    id: id1
                },
                include: {
                    temperature: true
                }
            });

            const arrayvaluestr = data.temperature.value.split(',');
            let value = [];
            for (let i in arrayvaluestr) {
                value.push(parseFloat(arrayvaluestr[i]));
            }

            const updated = data.temperature.updated_at;
            let now = new Date();
            let x = new moment(updated, 'L');
            let y = new moment(now, 'L');
            let diffInDays = y.diff(x, 'days');

            if (diffInDays != 0) {
                const newmas = randommas(diffInDays, value[value.length - 1]);
                for (let i in newmas) {
                    value.push(newmas[i]);
                }
                const newdata = await prisma.temperature.update({
                    where: {
                        greenhouseId: id1
                    },
                    data: {
                        value: value.toString(),
                        updated_at: now
                    }
                });
            }

            res.status(201).json({ message: "Temperatures succesfully received", name: data.name, created: data.created_at, value: value });
        }
        catch (e) {
            res.status(500).json({ message: 'Something went wrong, try later' })
        }
    }
);
