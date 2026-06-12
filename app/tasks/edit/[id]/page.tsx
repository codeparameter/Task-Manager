"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    status: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (!res.ok) {
          if (res.status === 401) router.push("/login");
          else if (res.status === 404) router.push("/tasks");
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        if (isMounted) {
          setForm({
            title: data.title,
            description: data.description || "",
            date: data.date.split("T")[0],
            time: data.time,
            status: data.status,
          });
          setFetching(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("خطا در دریافت اطلاعات");
          setFetching(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "خطا در ویرایش کار");
      setLoading(false);
    } else {
      router.push("/tasks");
    }
  };

  if (fetching) {
    return (
      <div className="text-center py-10 text-gray-500">در حال بارگذاری...</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">ویرایش کار</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">عنوان</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">توضیحات</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">تاریخ</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">زمان</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">وضعیت</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="PENDING">در انتظار</option>
              <option value="CONFIRMED">تأیید شده</option>
              <option value="CANCELLED">لغو شده</option>
              <option value="COMPLETED">انجام شده</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/tasks")}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
