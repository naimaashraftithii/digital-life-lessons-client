
import { useEffect, useState } from "react";
import { getUserPlan } from "../api/usersPlan";
import { getMyLessons } from "../api/lessons";
import { getFavorites } from "../api/favorites";

export default function useDashboardSummary(uid) {
  const [data, setData] = useState(null);     
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uid) {
      setData(null);
      setLoading(false);
      setError("");
      return;
    }

    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const [plan, myLessons, favs] = await Promise.all([
          getUserPlan(uid),
          getMyLessons(uid),
          getFavorites(uid),
        ]);

        const lessonsArr = Array.isArray(myLessons) ? myLessons : [];
        const favArr = Array.isArray(favs) ? favs : [];

        const likes = lessonsArr.reduce(
          (sum, l) => sum + (Number(l?.likesCount) || 0),
          0
        );

        const publicLessons = lessonsArr.filter(
          (l) => l?.visibility === "public"
        ).length;

        //  week analytics
        const days = Array.from({ length: 7 }).map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return d.toISOString().slice(0, 10);
        });

        const weekCounts = days.map((day) => {
          const count = lessonsArr.filter((l) => {
            const created = l?.createdAt ? new Date(l.createdAt) : null;
            if (!created) return false;
            return created.toISOString().slice(0, 10) === day;
          }).length;
          return { day, count };
        });

        const built = {
          user: {
            ...(plan?.user || {}),
            isPremium: !!plan?.isPremium,
            role: plan?.role || "user",
          },
          counts: {
            myLessons: lessonsArr.length,
            publicLessons,
            favorites: favArr.length,
            likes,
          },
          recentLessons: lessonsArr
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5),
          analytics: {
            weekCounts,
          },
        };

        if (!ignore) setData(built);
      } catch (e) {
        if (!ignore) setError(e?.message || "Failed to load dashboard summary");
        if (!ignore) setData(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [uid]);

  return { data, loading, error }; 
}
