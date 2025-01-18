export default function ProfileCard({ name, email, password }) {
    return (
      <div className="bg-[#EDEADE] rounded-xl shadow-md p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="text-gray-800 font-medium">{name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="text-gray-800 font-medium">{email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Password:</span>
            <span className="text-gray-800 font-medium">{'*'.repeat(password.length)}</span>
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Change Password
        </button>
      </div>
    );
  }
  