import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function PaymentCancel() {
  useEffect(() => {
    Swal.fire({
      icon: "info",
      title: "Payment Canceled",
      text: "No worries — you can try again anytime.",
    });
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="rounded-2xl bg-white p-6 shadow-sm text-center">
        <h2 className="text-xl font-extrabold text-slate-900">Payment canceled</h2>
        <p className="mt-2 text-sm text-slate-600">You are still on Free plan.</p>
        <Link to="/pricing" className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white font-bold">
          Back to Pricing
        </Link>
      </div>
    </div>
  );
}
