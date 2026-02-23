import { KanbanBoard } from "@/components/kanban-board";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";

export default async function Dashboard() {
  const session = await getSession();
  await connectDB();
  const board = await Board.findOne({
    userId: session?.user.id,
    name: "Job Hunt",
  })
    .populate({
      path: "columns",
      populate: {
        path: "jobApplications",
        model: "JobApplication",
      },
    })
    .lean();
  const serializedBoard = board
    ? {
        ...board,
        _id: board._id.toString(),
        columns:
          board.columns?.map((col: any) => ({
            ...col,
            _id: col._id.toString(),
            boardId: col.boardId.toString(),
            jobApplications:
              col.jobApplications?.map((job: any) => ({
                ...job,
                _id: job._id.toString(),
                columnId: job.columnId.toString(),
                boardId: job.boardId.toString(),
              })) || [],
          })) || [],
      }
    : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">
            {board?.name ?? "Job Hunt"}
          </h1>
          <p className="text-gray-600">Track your general applications.</p>
        </div>
        <KanbanBoard board={serializedBoard} userId={session?.user.id} />
      </div>
    </div>
  );
}
