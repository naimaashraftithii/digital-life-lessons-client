import { toast } from "react-toastify";

const MOCK_MY_LESSONS = [
  {
    id: "1",
    title: "Small habits matter",
    access: "free",
    visibility: "public",
    createdAt: "2024-12-10",
    likes: 12,
    favorites: 5,
  },
];

const MyLessons = () => {
  const handleDelete = () => {
    toast.success("Lesson deleted");
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-xl font-extrabold text-slate-900">
        My Lessons
      </h1>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th>Title</th>
              <th>Access</th>
              <th>Created</th>
              <th>Stats</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_MY_LESSONS.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="py-3 font-semibold">{l.title}</td>
                <td>{l.access}</td>
                <td>{l.createdAt}</td>
                <td>
                  ❤️ {l.likes} | 🔖 {l.favorites}
                </td>
                <td>
                  <button
                    onClick={handleDelete}
                    className="text-xs font-bold text-rose-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLessons;
