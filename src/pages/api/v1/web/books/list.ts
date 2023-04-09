import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, books } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  status: string;
  data: books[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const books = await prisma.books.findMany();

  const result: books[] =
    await prisma.$queryRaw`SELECT id, title, year, available FROM books`;

  console.log(result);

  res.status(200).json({
    status: "success",
    data: result,
  });
}
