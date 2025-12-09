interface CompletionBadgeProps {
  isCompleted: boolean;
  score?: number;
}

export function CompletionBadge({ isCompleted, score }: CompletionBadgeProps) {
  if (!isCompleted) return null;

  return (
    <div className="absolute top-3 right-3 lg:top-4 lg:right-4 z-10">
      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
        ✓ Sudah Dikerjakan
      </div>
      {score !== undefined && (
        <div className="text-[10px] text-green-600 text-right mt-1 font-semibold">
          Skor Terbaik: {score}
        </div>
      )}
    </div>
  );
}
