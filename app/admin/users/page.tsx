
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function UserManagement() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">User Management</h2>
      <div className="flex justify-between items-center">
        <Input type="text" placeholder="Search users..." className="max-w-sm" />
        <Button>Export Users</Button>
      </div>
      {/* <UserList /> */}
    </div>
  )
}

