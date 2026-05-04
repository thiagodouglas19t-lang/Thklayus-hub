import { useEffect, useMemo, useState } from "react";
import { PlayerStats } from "./types";

const initialStats: PlayerStats = {
  xp: 0,
  votes: 0,
  savedChampions: 0,
};

export function usePlayerStats() {
  const [stats, setStats] = useState<PlayerStats>(() => {
    const saved = localStorage.getItem("clashroom:stats");
    return saved ? JSON.parse(saved) : initialStats;
  });

  useEffect(() => {
    localStorage.setItem("clashroom:stats", JSON.stringify(stats));
  }, [stats]);

  const level = useMemo(() => Math.floor(stats.xp / 50) + 1, [stats.xp]);
  const nextLevelXp = level * 50;
  const progress = Math.min(100, Math.round((stats.xp / nextLevelXp) * 100));

  function addVoteXp() {
    setStats((current) => ({
      ...current,
      votes: current.votes + 1,
      xp: current.xp + 5,
    }));
  }

  function addChampionXp() {
    setStats((current) => ({
      ...current,
      savedChampions: current.savedChampions + 1,
      xp: current.xp + 20,
    }));
  }

  function resetStats() {
    setStats(initialStats);
  }

  return { stats, level, progress, addVoteXp, addChampionXp, resetStats };
}
