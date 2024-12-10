import Link from "next/link"
import { Home, Users, FileText, BookOpen, BarChart2 } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/admin" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/users" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <Users className="h-5 w-5" />
          <span>User Management</span>
        </Link>
        <Link href="/admin/questions" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <FileText className="h-5 w-5" />
          <span>Paper Management</span>
        </Link>
        <Link href="/admin/exams" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <BookOpen className="h-5 w-5" />
          <span>Exam Management</span>
        </Link>
        <Link href="/admin/analytics" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <BarChart2 className="h-5 w-5" />
          <span>Content Analytics</span>
        </Link>
        <Link href="/admin/question-sets" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <FileText className="h-5 w-5" />
          <span>Question Sets Management</span>
        </Link>
        <Link href="/admin/pdfs" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <FileText className="h-5 w-5" />
          <span>Create Question Set</span>
        </Link>
      
      </nav>
    </div>
  )
}

