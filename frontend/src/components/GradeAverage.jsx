import { useEffect, useState } from 'react';
import { getGradeAverage } from '../services/api';

export default function GradeAverage({ userId }) {
  const [average, setAverage] = useState(null);

  useEffect(() => {
    getGradeAverage(userId).then(data => setAverage(data.average));
  }, [userId]);

  if (average === null) return null;

  const color = average >= 90
    ? 'bg-green-500'
    : average >= 75
    ? 'bg-yellow-400'
    : 'bg-red-500';

  return (
    <div className={`p-4 text-white font-semibold rounded-xl shadow ${color}`}>
      Current Grade Average: {Math.round(average)}%
    </div>
  );
}

