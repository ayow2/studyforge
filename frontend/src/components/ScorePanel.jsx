import { useEffect, useState } from 'react';

export default function ScorePanel({ userId }) {
  const [score, setScore] = useState({ points: 0, streak: 0 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}/score`)
      .then(res => res.json())
      .then(setScore)
      .catch(console.error);
  }, [userId]);

  return (
    <div className="bg-indigo-100 text-indigo-900 px-6 py-4 rounded-xl shadow font-semibold text-lg flex justify-between items-center">
      <div>
        🔢 Score: <span className="text-indigo-800">{score.points}</span>
      </div>
      <div>
        🔥 Streak: <span className="text-indigo-800">{score.streak}</span>
      </div>
    </div>
  );
}
