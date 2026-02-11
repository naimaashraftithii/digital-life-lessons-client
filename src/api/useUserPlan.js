//useuseresplan
import { useCallback, useEffect, useState } from "react";
import { getUserPlan } from "../api/usersPlan";

const FREE = { isPremium: false, role: "user", user: null };

export default function useUserPlan(uid) {
  const [plan, setPlan] = useState(FREE);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserPlan(uid);
      setPlan(data || FREE);
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { plan, loading, refetch };
}



// import { useCallback, useEffect, useState } from "react";
// import { getUserPlan } from "../api/usersPlan";

// export default function useUserPlan(uid) {
//   const [plan, setPlan] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [tick, setTick] = useState(0);

//   const refetch = useCallback(() => setTick((x) => x + 1), []);

//   useEffect(() => {
//     let ignore = false;

//     (async () => {
//       try {
//         setLoading(true);

//         if (!uid) {
//           if (!ignore) setPlan({ isPremium: false, role: "user", user: null });
//           return;
//         }

//         const data = await getUserPlan(uid);
//         if (!ignore) setPlan(data);
//       } catch {
//         if (!ignore) setPlan({ isPremium: false, role: "user", user: null });
//       } finally {
//         if (!ignore) setLoading(false);
//       }
//     })();

//     return () => {
//       ignore = true;
//     };
//   }, [uid, tick]);

//   return { plan, loading, refetch };
// }
