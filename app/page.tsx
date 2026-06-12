import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-4xl mx-auto mt-4 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">سامانه مدیریت کارها</h1>
        <p className="mb-4">
          {session
            ? `خوش آمدی، ${session.user?.name || session.user?.email}`
            : "برای استفاده از سامانه، لطفاً وارد شوید یا ثبت‌نام کنید."}
        </p>
        {session ? (
          <a
            href="/tasks"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            مشاهده کارها
          </a>
        ) : (
          <div className="space-x-2 space-x-reverse">
            <a
              href="/login"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ml-2"
            >
              ورود
            </a>
            <a
              href="/register"
              className="inline-block bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              ثبت‌نام
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
