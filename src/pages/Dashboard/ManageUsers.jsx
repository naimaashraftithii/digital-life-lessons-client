import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import LottieLoader from "../../components/LottieLoader";
import { adminDeleteUser, adminGetUsers, adminSetUserRole } from "../../api/admin";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await adminGetUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const name = (u.name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      return name.includes(q) || email.includes(q) || (u.uid || "").includes(q);
    });
  }, [users, search]);

  const changeRole = async (uid, nextRole) => {
    const ok = await Swal.fire({
      icon: "question",
      title: "Change role?",
      text: `Set role to "${nextRole}"?`,
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });

    if (!ok.isConfirmed) return;

    try {
      await adminSetUserRole(uid, nextRole);
      toast.success("Role updated ✅");
      await load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const removeUser = async (uid) => {
    const ok = await Swal.fire({
      icon: "warning",
      title: "Delete user?",
      text: "This will delete user from MongoDB users collection.",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!ok.isConfirmed) return;

    try {
      await adminDeleteUser(uid);
      toast.success("User deleted ✅");
      await load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (loading) return <LottieLoader />;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Manage Users</h2>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            View all users, promote to admin, and delete .
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name/email/uid..."
          className="w-full max-w-sm rounded-xl border px-4 py-2 text-sm font-semibold"
        />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead>
            <tr className="border-b text-xs font-extrabold uppercase text-slate-600">
              <th className="py-3 pr-3">User</th>
              <th className="py-3 pr-3">Email</th>
              <th className="py-3 pr-3">Role</th>
              <th className="py-3 pr-3">Premium</th>
              <th className="py-3 pr-3">Lessons</th>
              <th className="py-3 pr-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u.uid} className="border-b last:border-0">
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
                      alt="user"
                      className="h-10 w-10 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-extrabold text-slate-900">{u.name || "Unnamed"}</p>
                      <p className="text-xs font-semibold text-slate-500">
                        {u.uid}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3 pr-3 font-semibold text-slate-700">{u.email}</td>

                <td className="py-3 pr-3">
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-extrabold",
                      u.role === "admin"
                        ? "bg-slate-900 text-white"
                        : "bg-indigo-100 text-indigo-700",
                    ].join(" ")}
                  >
                    {u.role || "user"}
                  </span>
                </td>

                <td className="py-3 pr-3">
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-extrabold",
                      u.isPremium ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700",
                    ].join(" ")}
                  >
                    {u.isPremium ? "Premium" : "Free"}
                  </span>
                </td>

                <td className="py-3 pr-3 font-extrabold text-slate-900">
                  {u.lessonsCreated ?? 0}
                </td>

                <td className="py-3 pr-3">
                  <div className="flex flex-wrap gap-2">
                    {u.role !== "admin" ? (
                      <button
                        onClick={() => changeRole(u.uid, "admin")}
                        className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-extrabold text-white"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => changeRole(u.uid, "user")}
                        className="rounded-xl bg-indigo-100 px-3 py-2 text-xs font-extrabold text-indigo-700"
                      >
                        Make User
                      </button>
                    )}

                    <button
                      onClick={() => removeUser(u.uid)}
                      className="rounded-xl bg-rose-100 px-3 py-2 text-xs font-extrabold text-rose-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="py-10 text-center font-semibold text-slate-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={load}
        className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white"
      >
        Refresh
      </button>
    </div>
  );
}
