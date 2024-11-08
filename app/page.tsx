import Quiz from "./components/quiz";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Knowledge Quiz</h1>
        <Quiz />
      </div>
    </main>
  );
}