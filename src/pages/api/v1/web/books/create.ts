import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, books } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  status: string;
  data: books;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { title, year, available } = req.body;

  console.log("method:", req.method);
  console.log("body:", req.body);

  const result: books = await prisma.$queryRaw`
      INSERT INTO books (title,year,available) 
      VALUES (${title},${year},${available}) RETURNING *
  `;

  console.log(result);

  res.status(201).json({
    status: "created",
    data: result,
  });
}
