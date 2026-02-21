import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";

export default async function Dashboard() {
  const session = await getSession();
  connectDB();
  const board = await Board.findOne({
    userId: session?.user.id,
    name: "Job Hunt",
  });
  console.log(board);

  return <div> Dashboard Page.</div>;
}
