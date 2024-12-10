import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button>Logout</Button>
        </div>
      </div>
    </header>
  )
}

