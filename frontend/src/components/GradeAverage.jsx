import { useEffect, useState } from 'react';
import { getGradeAverage } from '../services/api';

/**
 * Component to display the current grade average of a user.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.userId - The ID of the user whose grade average is to be displayed.
 *
 * @returns {JSX.Element|null} A styled div displaying the grade average, or null if the average is not yet available.
 *
 * @example
 * <GradeAverage userId="12345" />
 *
 * @description
 * The component fetches the grade average for the given user ID using the `getGradeAverage` function.
 * It applies a background color based on the grade:
 * - Green for averages >= 90
 * - Yellow for averages >= 75 and < 90
 * - Red for averages < 75
 */
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
