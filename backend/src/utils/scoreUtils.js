export const calculatePointsForCompletion = (dueDateStr) => {
    const due = new Date(dueDateStr);
    const now = new Date();
  
    due.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
  
    if (now < due) return 15;         // early
    if (now.getTime() === due.getTime()) return 10; // on time
    return 5;                          // late
  };
  
  export const calculatePointsForGrade = (grade) => {
    if (grade >= 90) return 10;
    if (grade >= 75) return 5;
    return 0;
  };
  
  /**
   * Updates the user's streak based on their last active date.
   *
   * @param {string} lastActive - The date the user was last active, in string format (e.g., "Mon Oct 09 2023").
   * @returns {Object} An object containing:
   *   - `updatedStreak` (number|string): The updated streak value. It can be:
   *       - `1` if the streak is reset or started.
   *       - `'increment'` if the streak is incremented.
   *       - `'same'` if the streak remains unchanged.
   *   - `newLastActive` (string): The updated last active date, in string format.
   */
  export const updateStreak = (lastActive) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
  
    if (!lastActive) return { updatedStreak: 1, newLastActive: today };
  
    if (lastActive === yesterday) {
      return { updatedStreak: 'increment', newLastActive: today };
    }
  
    if (lastActive === today) {
      return { updatedStreak: 'same', newLastActive: today };
    }
  
    return { updatedStreak: 1, newLastActive: today }; // reset
  };
  