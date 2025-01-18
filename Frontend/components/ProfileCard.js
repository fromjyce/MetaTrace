export default function ProfileCard({ name, email, password }) {
    return (
      <div className="bg-[#fefefa] rounded-xl shadow-md p-6">
        <div className="space-y-4 poppins">
          <div className="flex items-center justify-between">
                <span className="text-[#5e5e5eff] font-semibold text-xl">Name</span>
            <span className="text-[#1c1c1cff] text-xl font-medium">{name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#5e5e5eff] font-semibold text-xl">Email</span>
            <span className="text-[#1c1c1cff] text-xl font-medium">{email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#5e5e5eff] font-semibold text-xl">Password</span>
            <span className="text-[#1c1c1cff] text-xl font-medium">{'*'.repeat(password.length)}</span>
          </div>
        </div>
        <button className="mt-4 bg-[#ef4d31ff] text-[#f7f7f7ff] px-4 py-2 rounded-lg shadow font-semibold hover:bg-[#bf3e27] poppins">
          Change Password
        </button>
      </div>
    );
  }
  