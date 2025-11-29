import { Submission } from "../data/mockData";

interface UserRowProps {
  submission: Submission;
  rank: number;
}

function getRankBadge(rank: number) {
  switch (rank) {
    case 1:
      return <span className="text-lg">🥇</span>;
    case 2:
      return <span className="text-lg">🥈</span>;
    case 3:
      return <span className="text-lg">🥉</span>;
    default:
      return <span className="text-sm text-zinc-500">{rank}</span>;
  }
}

export default function UserRow({ submission, rank }: UserRowProps) {
  return (
    <tr className="border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30">
      <td className="py-4 pl-4 text-center">{getRankBadge(rank)}</td>
      
      {/* User Info */}
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold uppercase"
            style={{
              backgroundColor:
                rank === 1
                  ? "#fbbf24"
                  : rank === 2
                  ? "#94a3b8"
                  : rank === 3
                  ? "#d97706"
                  : "#3b82f6",
              color: rank <= 3 ? "#000" : "#fff",
            }}
          >
            {submission.avatar || submission.displayName?.[0] || "?"}
          </div>
          <div>
            <div className="font-medium text-white">
              {submission.displayName || "Anonymous"}
            </div>
            <div className="text-xs text-zinc-500">
              {new Date(submission.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </td>

      {/* Favorite Model */}
      <td className="py-4">
        <span className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-cyan-300 ring-1 ring-inset ring-cyan-400/20">
          {submission.favoriteModel}
        </span>
      </td>

      {/* Plan */}
      <td className="py-4">
        <span className="text-sm text-zinc-300">{submission.cursorPlan}</span>
      </td>

      {/* Mode */}
      <td className="py-4">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            submission.favoriteMode === "Plan"
              ? "bg-purple-400/10 text-purple-400 ring-purple-400/30"
              : submission.favoriteMode === "Agent"
              ? "bg-emerald-400/10 text-emerald-400 ring-emerald-400/30"
              : "bg-blue-400/10 text-blue-400 ring-blue-400/30"
          } ring-1 ring-inset`}
        >
          {submission.favoriteMode}
        </span>
      </td>

      {/* Country */}
      <td className="py-4 pr-4 text-right">
        <span className="text-sm text-zinc-400">{submission.country}</span>
      </td>
    </tr>
  );
}
