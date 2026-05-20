import { useState } from 'react'

const LANGUAGES: Record<string, { name: string; flag: string }> = {
  EN: { name: 'English', flag: '🇬🇧' },
  FR: { name: 'French', flag: '🇫🇷' },
}

export default function Translate() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [sourceLang, setSourceLang] = useState('EN')
  const [targetLang, setTargetLang] = useState('FR')

  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setInput(result ?? '')
    setResult(input || null)
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTranslate = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:8000/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, source_lang: sourceLang, target_lang: targetLang }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      setResult(data.translated_text)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Translate</h1>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-800">
          {LANGUAGES[sourceLang].flag} {LANGUAGES[sourceLang].name}
        </span>

        <button
          onClick={swapLanguages}
          className="text-gray-400 hover:text-gray-700 text-base"
          title="Swap languages"
        >
          ⇄
        </button>

        <span className="text-sm text-gray-800">
          {LANGUAGES[targetLang].flag} {LANGUAGES[targetLang].name}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">{LANGUAGES[sourceLang].name} text</label>
        <textarea
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 resize-none focus:outline-none focus:border-gray-400"
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to translate..."
        />
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading || !input.trim()}
        className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Translating…' : 'Translate'}
      </button>

      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}

      {result !== null && (
        <div className="mt-6">
          <label className="block text-sm text-gray-600 mb-1">{LANGUAGES[targetLang].name} translation</label>
          <div className="border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-800 bg-gray-50 min-h-16">
            {result}
          </div>
        </div>
      )}
    </div>
  )
}
