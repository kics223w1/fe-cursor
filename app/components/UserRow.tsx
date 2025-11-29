import { User } from "../data/mockData";

interface UserRowProps {
  user: User;
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

function formatLikes(likes: number): string {
  if (likes >= 1000) {
    return `${(likes / 1000).toFixed(1)}k`;
  }
  return likes.toLocaleString();
}

export default function UserRow({ user, rank }: UserRowProps) {
  return (
    <tr className="border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30">
      <td className="py-4 pl-4 text-center">{getRankBadge(rank)}</td>
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
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
            {user.avatar}
          </div>
          <div>
            <div className="font-medium text-white">{user.topTip}</div>
            <div className="text-xs text-zinc-500">{user.tipDescription}</div>
          </div>
        </div>
      </td>
      <td className="py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700 text-xs font-medium text-zinc-300">
            {user.avatar}
          </div>
          <span className="text-sm text-zinc-400">{user.username}</span>
        </div>
      </td>
      <td className="py-4 text-right">
        <span className="font-mono text-white">
          {formatLikes(user.likes)}
        </span>
        <span className="ml-1 text-zinc-500">♥</span>
      </td>
      <td className="py-4 pr-4 text-right">
        {user.growth === null ? (
          <span className="text-zinc-600">—</span>
        ) : user.growth > 0 ? (
          <span className="text-emerald-400">↑ {user.growth}%</span>
        ) : user.growth < 0 ? (
          <span className="text-red-400">↓ {Math.abs(user.growth)}%</span>
        ) : (
          <span className="text-zinc-500">0%</span>
        )}
      </td>
    </tr>
  );
}

