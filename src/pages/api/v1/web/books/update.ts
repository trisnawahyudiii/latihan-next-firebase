import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, books } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  status: string;
  data?: books;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { title, year, available } = req.body;
  console.log(title, year, available);

  const { id } = req.query;
  const book_id = parseInt(id);

  const target_book = await prisma.$queryRaw`
    SELECT id, title, year, available FROM books
    WHERE id=${book_id}
  `;

  // check target
  if (!target_book) {
    res.status(404).json({
      status: "FAIL",
      message: "Book not found!",
    });
    return;
  }

  /**
   * MANUAL STRING METHOD!
   */

  const result: books = await prisma.$queryRaw`
    UPDATE books
    SET title=${title}, year=${year}, available=${available}
    WHERE id=${book_id}
    RETURNING *`;

  /**
   * UNSAVE METHOD!
   */

  // let query = `UPDATE books SET `;
  // if (title) query += `title='${title}', `;
  // if (year) query += `year=${year}, `;
  // if (available) query += `available=${available} `;
  // query += `WHERE id=${book_id} RETURNING *`;

  // console.log(query);

  // const result: books = await prisma.$queryRawUnsafe(query);

  /**
   * SAVE METHOD ERR!
   */

  // let query = `UPDATE books SET ${title && `title=${title},`} ${year && `year=${year},`} ${
  //   available && `available=${available},`
  // }`;

  // const result: books = await prisma.$queryRaw(`${query}`);

  // console.log(result);

  res.status(201).json({
    status: "success",
    data: result,
  });
}
