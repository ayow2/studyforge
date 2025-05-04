import AssignmentForm from '../components/AssignmentForm';

export default function Dashboard() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">StudyForge Dashboard</h1>
      <AssignmentForm />
    </div>
  );
}
