import { isAuthenticated } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata = { title: 'Admin — RideTo Learn' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <nav className="bg-[#2B2B2B] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-heading text-sm uppercase tracking-widest text-[#2CCEAC]">
            RideTo Admin
          </Link>
          <Link href="/" target="_blank" className="text-xs text-gray-400 hover:text-white transition-colors">
            ↗ View site
          </Link>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </form>
      </nav>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
