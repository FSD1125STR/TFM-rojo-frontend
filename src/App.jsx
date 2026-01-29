import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          TFM Rojo Frontend
        </h1>
        <p className="text-gray-600 mb-6">
          React + Vite + TailwindCSS
        </p>
        <div className="space-y-4">
          <p className="text-2xl font-semibold text-blue-600">
            Count: {count}
          </p>
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
