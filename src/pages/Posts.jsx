import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

const tabs = [
  { id: 'tradelearn1', label: 'Trade Learning', file: '/md_files/trade_stock1.md' },
  { id: 'notes', label: 'Single Pixel Camera', file: '/md_files/spi_study.md' },
  // { id: 'extras', label: 'Extras', file: '/md_files/extras.md' },
]

export default function Posts() {
  const [activeTab, setActiveTab] = useState('tradelearn1')
  const [markdown, setMarkdown] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const loadMarkdown = async () => {
      const currentTab = tabs.find((tab) => tab.id === activeTab)
      if (!currentTab?.file) {
        setMarkdown('')
        return
      }

      setIsLoading(true)
      setLoadError('')

      try {
        const response = await fetch(currentTab.file)
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.status}`)
        }
        const text = await response.text()
        setMarkdown(text)
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Failed to load markdown')
      } finally {
        setIsLoading(false)
      }
    }

    loadMarkdown()
  }, [activeTab])

  return (
    <section className="min-h-screen bg-white text-slate-900 flex">
      <aside className="sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 p-4 basis-1/4">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                activeTab === tab.id
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-700 bg-white hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 px-4 py-8 basis-3/4">
        <div className="max-w-none">
          <section className=" p-6 text-left">
            {isLoading && (
              <p className="text-slate-500">正在加载 Markdown 内容...</p>
            )}
            {loadError && (
              <p className="text-red-500">加载失败：{loadError}</p>
            )}
            {!isLoading && !loadError && markdown && (
              <div className="markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            )}
            {!isLoading && !loadError && !markdown && (
              <p className="text-slate-500">暂无内容。</p>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}
