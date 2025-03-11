export default function FileList({ files }) {
  return (
    <div className="bg-[#fefefa] rounded-xl shadow-md p-6">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">File Name</th>
            <th className="py-2 px-4 border-b">Upload Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file._id}>
              <td className="py-2 px-4 border-b">{file.filename}</td>
              <td className="py-2 px-4 border-b">
                {new Date(file.uploadDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline">View</button>{" "}
                <button className="text-red-500 hover:underline">Delete</button>{" "}
                <button className="text-green-500 hover:underline">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}