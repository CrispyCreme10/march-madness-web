export function calculateTimeRemaining(refreshRateMs: number) {
  const now = new Date().getTime();
  // Calculate how much time has passed since the last full interval start
  const timePassedInCurrentInterval = now % refreshRateMs;
  // The remaining time is the full duration minus the time passed
  const remainingMs = refreshRateMs - timePassedInCurrentInterval;
  const formattedTime = formatTime(remainingMs);
  return formattedTime;
}

export function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Simple format for demonstration (MM:SS)
  return `${pad(minutes)}:${pad(remainingSeconds)}`;
}

export function pad(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}
