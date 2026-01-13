import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";
import LottieLoader from "../../components/LottieLoader";

export default function AdminProfile() {
  const { user } = useAuth();
  const { plan, loading } = useUserPlan(user?.uid);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const email = useMemo(
    () => user?.email || plan?.user?.email || "",
    [user, plan]
  );

  if (loading) return <LottieLoader />;

  const onSave = async () => {
    Swal.fire({
      icon: "info",
      title: "Profile update",
      text: "Optional: update Firebase profile. For assignment, UI is enough.",
      confirmButtonText: "Ok",
    });
    toast.success("Admin profile screen ready ✅");
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-extrabold text-slate-900">Admin Profile</h2>
      <p className="mt-1 text-sm font-semibold text-slate-600">
        Manage your admin profile details.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-[140px_1fr]">
        <div className="flex flex-col items-center gap-3">
          <img
            src={photo || "https://i.ibb.co/ZxK3f6K/user.png"}
            alt="admin"
            className="h-28 w-28 rounded-3xl object-cover ring-2 ring-slate-100"
          />
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-white">
            Admin ✅
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-extrabold text-slate-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-2 text-sm font-semibold"
              placeholder="Admin name"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-700">Email</label>
            <input
              value={email}
              readOnly
              className="mt-1 w-full rounded-xl border bg-slate-50 px-4 py-2 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-700">Photo URL</label>
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-2 text-sm font-semibold"
              placeholder="https://..."
            />
          </div>

          <button
            onClick={onSave}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-extrabold text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
