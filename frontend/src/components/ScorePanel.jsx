import { useEffect, useState } from 'react';
import { API_BASE } from '../services/api';

/**
 * ScorePanel component displays the user's score and streak.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.userId - The ID of the user whose score and streak are displayed.
 *
 * @returns {JSX.Element} A styled panel showing the user's score and streak.
 *
 * @example
 * <ScorePanel userId="12345" />
 *
 * @remarks
 * This component fetches the user's score and streak from the API when the component mounts
 * or when the `userId` prop changes. The fetched data is displayed in a styled panel.
 */
export default function ScorePanel({ userId }) {
  const [score, setScore] = useState({ points: 0, streak: 0 });

  useEffect(() => {
    fetch(`${API_BASE}/users/${userId}/score`)
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
