"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string;
  status: string;
}

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/login");
            return;
          }
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        if (isMounted) {
          setTasks(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("خطا در دریافت کارها");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این کار اطمینان دارید؟")) return;
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTasks(tasks.filter((a) => a.id !== id));
    } else {
      alert("خطا در حذف کار");
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "در انتظار";
      case "CONFIRMED":
        return "تأیید شده";
      case "CANCELLED":
        return "لغو شده";
      case "COMPLETED":
        return "انجام شده";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">در حال بارگذاری...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">کارهای من</h1>
        <button
          onClick={() => router.push("/tasks/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + کار جدید
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {tasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          هیچ کاری ندارید. برای ایجاد کار جدید، روی دکمه بالا کلیک کنید.
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  {task.description && (
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                    <span>
                      📅 {new Date(task.date).toLocaleDateString("fa-IR")}
                    </span>
                    <span>⏰ {task.time}</span>
                    <span
                      className={`px-2 py-0.5 rounded ${getStatusColor(
                        task.status,
                      )}`}
                    >
                      {getStatusText(task.status)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mr-4">
                  <button
                    onClick={() => router.push(`/tasks/edit/${task.id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✏️ ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️ حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
