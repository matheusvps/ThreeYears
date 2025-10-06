interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (seconds: number) => string;
}

export function ProgressBar({ currentTime, duration, onSeek, formatTime }: ProgressBarProps) {
  const percent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
  
  return (
    <div className="px-6 mb-6">
      <div className="flex items-center space-x-3">
        <span className="text-gray-400 text-xs w-10 text-right">
          {formatTime(currentTime)}
        </span>
        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={onSeek}
            className="slider w-full h-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Progresso da faixa"
            style={{
              background: `linear-gradient(to right, #1db954 0%, #1db954 ${percent}%, #4a4a4a ${percent}%, #4a4a4a 100%)`,
            }}
          />
        </div>
        <span className="text-gray-400 text-xs w-10">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}


