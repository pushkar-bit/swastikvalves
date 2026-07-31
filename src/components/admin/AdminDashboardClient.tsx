"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LogOut,
  RefreshCw,
  Search,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Loader2,
  Download,
} from "lucide-react";
import Link from "next/link";
import { RFQRecord } from "@/lib/sheets";
import { appConfig, formatINR } from "@/config/appConfig";

type DisplayRecord = RFQRecord & { displayStatus: string };

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  ORDER_PLACED: "bg-green-100 text-green-800 border-green-200",
  GRANTED: "bg-green-100 text-green-800 border-green-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
  EXPIRED: "bg-gray-200 text-gray-700 border-gray-300",
  IN_PRODUCTION: "bg-blue-100 text-blue-800 border-blue-200",
  COMPLETED: "bg-brand-navy/10 text-brand-navy border-brand-navy/20",
};

function computeDisplayStatus(order: RFQRecord): DisplayRecord {
  const isOverdue =
    order.status === "PENDING" &&
    order.responseDeadline &&
    new Date(order.responseDeadline).getTime() < Date.now();
  return { ...order, displayStatus: isOverdue ? "EXPIRED" : order.status };
}

interface Props {
  adminEmail: string;
  initialOrders: RFQRecord[];
}

type Tab = "recent" | "history" | "bills";

export default function AdminDashboardClient({ adminEmail, initialOrders }: Props) {
  const router = useRouter();
  const [orders, setOrders] = useState<DisplayRecord[]>(
    initialOrders.map(computeDisplayStatus)
  );
  const [tab, setTab] = useState<Tab>("recent");
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.displayStatus === "PENDING").length;
    const placed = orders.filter(
      (o) => o.displayStatus === "ORDER_PLACED" || o.displayStatus === "GRANTED"
    ).length;
    const rejected = orders.filter((o) => o.displayStatus === "REJECTED").length;
    const confirmedValue = orders
      .filter((o) => o.displayStatus === "ORDER_PLACED" || o.displayStatus === "GRANTED")
      .reduce((sum, o) => sum + (o.estimatedValue || 0), 0);
    return { total, pending, placed, rejected, confirmedValue };
  }, [orders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = orders;
    if (tab === "recent") {
      list = [...orders].slice(0, 10);
    } else if (tab === "bills") {
      list = orders.filter(
        (o) => o.displayStatus === "ORDER_PLACED" || o.displayStatus === "GRANTED"
      );
    }
    if (!q) return list;
    return list.filter(
      (o) =>
        o.orderId.toLowerCase().includes(q) ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.firmName.toLowerCase().includes(q) ||
        o.contactName.toLowerCase().includes(q) ||
        o.gstNumber.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.state.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
    );
  }, [orders, tab, query]);

  const refresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setOrders(data.orders);
    } finally {
      setRefreshing(false);
    }
  };

  const markAdvance = async (orderId: string, status: string) => {
    setSavingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/advance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advancePaymentStatus: status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === orderId
              ? { ...o, advancePaymentStatus: status as RFQRecord["advancePaymentStatus"] }
              : o
          )
        );
      }
    } finally {
      setSavingId(null);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-brand-offwhite">
      {/* Top bar */}
      <header className="bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-orange/15 border border-brand-orange/25 rounded-lg flex items-center justify-center text-brand-orange">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-lg leading-none">Swastik Valves — Admin</h1>
              <p className="text-brand-steel text-xs font-semibold mt-1">{adminEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 text-xs font-bold bg-brand-orange hover:bg-orange-600 px-3.5 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total RFQs", value: stats.total, icon: Package, color: "text-brand-navy" },
            { label: "Pending Decision", value: stats.pending, icon: Clock, color: "text-amber-600" },
            { label: "Orders Placed", value: stats.placed, icon: CheckCircle2, color: "text-green-600" },
            { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-600" },
            {
              label: "Confirmed Value",
              value: formatINR(stats.confirmedValue),
              icon: IndianRupee,
              color: "text-brand-orange",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs">
              <Icon className={`w-4 h-4 ${color} mb-2`} />
              <div className="text-xl font-black text-brand-navy">{value}</div>
              <div className="text-[10px] font-bold text-brand-steel uppercase tracking-wider mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + search */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {(
              [
                ["recent", "Recent Orders"],
                ["history", "Order History"],
                ["bills", "Bills"],
              ] as [Tab, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  tab === key
                    ? "bg-brand-navy text-white"
                    : "bg-white text-brand-steel border border-gray-200 hover:border-brand-orange"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-brand-steel absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search firm, GST, order ref..."
              className="border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange bg-white w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[1000px]">
              <thead>
                <tr className="bg-brand-offwhite text-brand-navy text-[10px] font-bold uppercase tracking-wider">
                  <th className="p-3">Order / Date</th>
                  <th className="p-3">Firm / GST</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Order Details</th>
                  <th className="p-3 text-right">Value</th>
                  <th className="p-3">Purchase / Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Advance</th>
                  {tab === "bills" && <th className="p-3">Bill</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={tab === "bills" ? 10 : 9} className="p-8 text-center text-brand-steel font-semibold">
                      No orders match this view yet.
                    </td>
                  </tr>
                )}
                {filtered.map((order) => (
                  <tr key={order.orderId} className="align-top hover:bg-brand-offwhite/40">
                    <td className="p-3">
                      <Link
                        href={`/admin/orders/${order.orderId}`}
                        className="font-mono text-[10px] text-brand-orange hover:underline font-bold"
                      >
                        {order.orderNumber || order.orderId.slice(0, 8)}
                      </Link>
                      <div className="text-brand-navy font-semibold mt-1">
                        {order.timestamp ? new Date(order.timestamp).toLocaleDateString("en-IN") : "—"}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-brand-navy">{order.firmName}</div>
                      <div className="font-mono text-[10px] text-brand-steel mt-1">{order.gstNumber}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-brand-navy">{order.contactName}</div>
                      <div className="text-brand-steel">{order.phoneNumber}</div>
                      <div className="text-brand-steel">{order.email}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-brand-navy font-semibold">{order.city}</div>
                      <div className="text-brand-steel">{order.state}</div>
                      <div className="text-brand-steel font-mono text-[10px]">{order.pincode}</div>
                    </td>
                    <td className="p-3 max-w-[220px]">
                      <ul className="space-y-0.5">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="text-brand-navy font-medium truncate">
                            {item.partName} × {item.quantity}
                          </li>
                        ))}
                        {order.items.length > 3 && (
                          <li className="text-brand-steel">+{order.items.length - 3} more</li>
                        )}
                      </ul>
                    </td>
                    <td className="p-3 text-right font-bold text-brand-navy whitespace-nowrap">
                      {formatINR(order.estimatedValue)}
                    </td>
                    <td className="p-3 text-brand-steel">
                      <div>{appConfig.purchaseModes[order.purchaseMode] || order.purchaseMode}</div>
                      <div className="mt-1">{appConfig.paymentModes[order.paymentMode] || order.paymentMode}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold border ${
                          STATUS_STYLES[order.displayStatus] || "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {order.displayStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      {order.advanceOptIn ? (
                        <div className="space-y-1.5">
                          <div className="text-brand-navy font-bold">
                            {formatINR(order.advanceAmount)}{" "}
                            <span className="text-brand-steel font-semibold">({order.advancePercentage}%)</span>
                          </div>
                          <select
                            value={order.advancePaymentStatus}
                            disabled={savingId === order.orderId}
                            onChange={(e) => markAdvance(order.orderId, e.target.value)}
                            className="text-[10px] font-bold border border-gray-200 rounded px-1.5 py-1 outline-none focus:ring-1 focus:ring-brand-orange bg-white"
                          >
                            {Object.keys(appConfig.advanceStatusEnums).map((key) => (
                              <option key={key} value={key}>
                                {key.replace(/_/g, " ")}
                              </option>
                            ))}
                          </select>
                          {savingId === order.orderId && (
                            <Loader2 className="w-3 h-3 animate-spin text-brand-orange" />
                          )}
                        </div>
                      ) : (
                        <span className="text-brand-steel text-[10px] font-bold">Not Applicable</span>
                      )}
                    </td>
                    {tab === "bills" && (
                      <td className="p-3">
                        <a
                          href={`/api/admin/orders/${order.orderId}/bill`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-brand-orange hover:bg-orange-600 text-white px-2.5 py-1.5 rounded-md text-[10px] font-bold transition-colors whitespace-nowrap"
                        >
                          <Download className="w-3 h-3" />
                          PDF
                        </a>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
