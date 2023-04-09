import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, books } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  status: string;
  data: books;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // const books = await prisma.books.findMany();
  const { id } = req.query;
  const book_id = parseInt(id);

  // console.log({ book_id }, typeof book_id);

  const result: books = await prisma.$queryRaw`
    SELECT id, title, year, available FROM books
    WHERE id=${book_id}
  `;

  console.log(result);

  res.status(200).json({
    status: "success",
    data: result,
  });
}
