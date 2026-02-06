// src/hooks/useUserPlan.js
import { useEffect, useState } from "react";
import { getUserPlan } from "../api/usersPlan";


const FREE = { isPremium: false, role: "user", user: null };

export default function useUserPlan(uid) {
  const [plan, setPlan] = useState(FREE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!uid) {
      setPlan(FREE);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const data = await getUserPlan(uid);
        if (!cancelled) setPlan(data ?? FREE);
      } catch {
        if (!cancelled) setPlan(FREE);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  return { plan, loading };
}

// export default function useUserPlan(uid) {
//   const [plan, setPlan] = useState({ isPremium: false, role: "user", user: null });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let ignore = false;

//     if (!uid) {
//       setPlan({ isPremium: false, role: "user", user: null });
//       setLoading(false);
//       return;
//     }

//     (async () => {
//       try {
//         setLoading(true);
//         const data = await getUserPlan(uid);
//         if (!ignore) setPlan(data ?? { isPremium: false, role: "user", user: null });
//       } catch {
//         if (!ignore) setPlan({ isPremium: false, role: "user", user: null });
//       } finally {
//         if (!ignore) setLoading(false);
//       }
//     })();

//     return () => {
//       ignore = true;
//     };
//   }, [uid]);

//   return { plan, loading };
// }
