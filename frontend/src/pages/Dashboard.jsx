import AssignmentForm from '../components/AssignmentForm.jsx';
import AssignmentList from '../components/AssignmentList.jsx';

export default function Dashboard() {
  const userId = 1; // placeholder

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">StudyForge Dashboard</h1>
      <AssignmentForm />
      <AssignmentList userId={userId} />
    </div>
  );
}
