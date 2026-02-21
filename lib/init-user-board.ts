import connectDB from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
  {
    name: "Wish List",
    order: 0,
  },
  {
    name: "Applied",
    order: 1,
  },
  {
    name: "Interviewing",
    order: 2,
  },
  {
    name: "Offer",
    order: 3,
  },
  {
    name: "Rejected",
    order: 4,
  },
];
export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();

    // check if the board already exists
    const existingBoard = await Board.findOne({
      userId: userId,
      name: "Job Hunt",
    });
    if (existingBoard) {
      return existingBoard;
    }
    // create a board
    const board = await Board.create({
      name: "Job Hunt",
      userId,
      columns: [],
    });

    // create a default columns
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobApplication: [],
        })
      )
    );
    // update the board with new column id's
    board.columns = columns.map((col) => col._id);
    await board.save();
    return board;
  } catch (error) {
    throw error;
  }
}
