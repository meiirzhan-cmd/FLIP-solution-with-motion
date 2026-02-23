import KanbanBoard from "./components/KanbanBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            FLIP Kanban Board
          </h1>
          <p className="text-gray-500 mt-1">
            Click any card. Every element animates — parents, children, siblings
            — all via GPU compositor using motion's FLIP.
          </p>
        </div>

        <KanbanBoard />

        <div className="mt-10 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-3">
            Browser Rendering Pipeline
          </h3>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-medium text-red-600 mb-1">❌ Without FLIP</p>
              <div className="font-mono text-xs space-y-1 text-gray-600">
                <p>Every frame:</p>
                <p>
                  <span className="text-purple-600">Style</span> ██ →{" "}
                  <span className="text-red-600">Layout</span> ████████ →{" "}
                  <span className="text-green-600">Paint</span> ██████ →{" "}
                  <span className="text-blue-600">Composite</span> █
                </p>
                <p className="text-red-500">~10-16ms per frame</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-emerald-600 mb-1">
                ✅ With FLIP (this board)
              </p>
              <div className="font-mono text-xs space-y-1 text-gray-600">
                <p>Frame 1 only:</p>
                <p>
                  <span className="text-purple-600">Style</span> █ →{" "}
                  <span className="text-red-600">Layout</span> █ →{" "}
                  <span className="text-green-600">Paint</span> █ →{" "}
                  <span className="text-blue-600">Composite</span> █
                </p>
                <p>Frames 2-18:</p>
                <p>
                  <span className="text-blue-600">Composite</span> █ (GPU only)
                </p>
                <p className="text-emerald-500">~0.1ms per frame</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
