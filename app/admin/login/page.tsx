import LoginForm from './login-form'

export const metadata = { title: 'Admin Login — RideTo Learn' }

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        {/* Logo strip */}
        <div className="text-center mb-8">
          <span className="font-heading text-2xl uppercase tracking-widest text-[#2B2B2B]">
            RideTo
          </span>
          <span className="block text-xs text-gray-400 uppercase tracking-widest mt-1">
            Admin Panel
          </span>
        </div>

        <div
          className="bg-white rounded-2xl border border-gray-200 p-8"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <h1 className="font-heading text-lg uppercase text-[#2B2B2B] mb-6">
            Sign in
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
