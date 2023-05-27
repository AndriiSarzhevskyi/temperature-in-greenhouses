import express from 'express';
import { PrismaClient } from '@prisma/client';
import { randommas } from '../functionrandom.js';
import pkg from 'body-parser';

const prisma = new PrismaClient();
const { json, urlencoded } = pkg;

export const greenrouter = express();
greenrouter.use(json())
greenrouter.use(urlencoded({ extended: true }))

greenrouter.post(
    '/create',
    async (req, res) => {
        try {
            const { name, id } = req.body;
            const size = 30;
            const mas = randommas(size);
            let date = new Date();
            let now = new Date();
            date.setDate(date.getDate() - size);

            const candidate = await prisma.greenhouse.findFirst({
                where: {
                    name: name
                }
            });
            if (candidate != null) {
                res.status(400).json({ message: 'Name is already in use, try something new' })
            }
            else {
                const greenhose = await prisma.greenhouse.create({
                    data: {
                        name: name,
                        created_at: date,
                        updated_at: now,
                        temperature: {
                            create: {
                                value: mas.toString(),
                                created_at: date,
                                updated_at: now
                            }
                        }

                    },
                })
                res.status(201).json({ message: "Greenhouse succesfully created" });
            }
        }
        catch (e) {
            res.status(500).json({ message: 'Something went wrong, try later' })
        }
    }
);

greenrouter.get(
    '/getgreenhouses',
    async (req, res) => {
        try {
            const greenhouses = await prisma.greenhouse.findMany({
                select: {
                    name: true,
                    id: true,
                },
                orderBy: {
                    name: 'asc'
                }
            });
            res.status(201).json({ message: "Greenhouses succesfully received", data: greenhouses });
        }
        catch (e) {
            res.status(500).json({ message: 'Something went wrong, try later' })
        }
    }
);
