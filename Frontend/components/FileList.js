export default function FileList({ files }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
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
              <tr key={file.id}>
                <td className="py-2 px-4 border-b">{file.name}</td>
                <td className="py-2 px-4 border-b">{file.date}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline">View</button>{' '}
                  <button className="text-red-500 hover:underline">Delete</button>{' '}
                  <button className="text-green-500 hover:underline">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  