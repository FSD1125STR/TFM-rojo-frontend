import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme')
    document.documentElement.setAttribute('data-theme', 'light')

    return () => {
      if (prev) {
        document.documentElement.setAttribute('data-theme', prev)
      }
    }
  }, [])

  return <div test-id="el-p1u2b3l4"><Outlet /></div>
}
