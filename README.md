# 📋 Task Manager - سامانه مدیریت کارها

یک پروژه فول استک ساده و کارآمد برای مدیریت کارها (Tasks) ساخته شده با **Next.js 16**، **Prisma**، **PostgreSQL**، **NextAuth** و **Tailwind CSS**. کاربران میتوانند پس از احراز هویت، کارها خود را ایجاد، مشاهده، ویرایش و حذف کنند.

## ✨ ویژگی‌ها

- احراز هویت ایمیل/رمز عبور با NextAuth (JWT)
- مدیریت کارها (Create, Read, Update, Delete) مختص هر کاربر
- رابط کاربری واکنش‌گرا (mobile-first) با Tailwind CSS
- دیتابیس PostgreSQL با Prisma ORM
- پشتیبانی از محیط‌های توسعه و تولید (dev/prod)
- کانتینریزیشن با Podman/Docker + docker-compose

## 🛠️ تکنولوژی‌ها

- **Frontend:** Next.js 16 (App Router), Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL, Prisma ORM
- **Auth:** NextAuth.js (Credentials Provider)
- **Container:** Podman / Docker, Docker Compose
- **Language:** TypeScript

## 📁 ساختار پروژه

```
task-manager/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── tasks/ (CRUD routes)
│   │   └── register/
│   ├── tasks/          (صفحات مدیریت کارها)
│   ├── login/
│   ├── register/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── Navbar.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
├── public/
├── styles/
├── .env.dev
├── .env.prod
├── compose.yml
├── package.json
└── README.md
```

## 🚀 نصب و راه‌اندازی (توسعه)

### پیش‌نیازها

- Node.js 20+
- Podman یا Docker
- Git

### 1. کلون مخزن

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. کپی فایل‌های محیطی

```bash
cp .env.example .env.dev   # برای توسعه
cp .env.example .env.prod  # برای تولید (اختیاری)
```

### 3. تنظیم متغیرهای محیطی `.env.dev`

```env
POSTGRES_DB=taskdb
POSTGRES_USER=taskuser
POSTGRES_PASSWORD=taskpass
POSTGRES_PORT=5432
DATABASE_URL="postgresql://taskuser:taskpass@localhost:5432/taskdb"
CONTAINER_NAME=task-postgres-dev
NEXTAUTH_SECRET="your-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"
```

> `NEXTAUTH_SECRET` را با یک مقدار امن (مثلاً `openssl rand -base64 32`) جایگزین کنید.

### 4. نصب وابستگی‌ها

```bash
npm install
```

### 5. راه‌اندازی دیتابیس با Podman

```bash
npm run up:dev
```

این دستور یک کانتینر PostgreSQL بر اساس `compose.yml` و متغیرهای `.env.dev` ایجاد می‌کند.

### 6. اجرای مهاجرت (Migration) و تولید Prisma Client

```bash
npm run migrate:dev
npm run generate
```

### 7. اجرای برنامه در حالت توسعه

```bash
npm run dev
```

اکنون برنامه در آدرس `http://localhost:3000` در دسترس است.

### 8. توقف و حذف کانتینر دیتابیس

```bash
npm run down:dev
```

## 🐳 راه‌اندازی با Docker Compose (تولید)

برای اجرا در محیط تولید، می‌توانید از `compose.yml` استفاده کنید. ابتدا فایل `.env.prod` را تنظیم کرده و سپس:

```bash
npm run up:prod
```

سپس برنامه را با:

```bash
npm run migrate:prod
npm run build
npm run start
```

اجرا کنید.

> توصیه می‌شود در تولید از پروکسی معکوس مانند Nginx و مدیریت فرآیند با PM2 استفاده کنید (به بخش استقرار مراجعه کنید).

## 📦 اسکریپت‌های کاربردی

| اسکریپت | توضیح |
|---------|-------|
| `npm run dev` | اجرا در حالت توسعه ( Turbopack) |
| `npm run build` | ساخت نسخه تولید (با استفاده از `.env.prod`) |
| `npm run start` | اجرای نسخه تولید |
| `npm run migrate:dev` | اجرای مهاجرت در دیتابیس توسعه |
| `npm run migrate:prod` | اجرای مهاجرت در دیتابیس تولید |
| `npm run generate` | بازسازی Prisma Client |
| `npm run studio` | باز کردن Prisma Studio (توسعه) |
| `npm run up:dev` | راه‌اندازی کانتینر PostgreSQL برای توسعه |
| `npm run down:dev` | توقف و حذف کانتینر توسعه |
| `npm run up:prod` | راه‌اندازی کانتینر PostgreSQL برای تولید |
| `npm run down:prod` | توقف و حذف کانتینر تولید |
| `npm run containers` | نمایش لیست کانتینرهای در حال اجرا |

## 🧪 نحوه استفاده

1. **ثبت‌نام:** به آدرس `/register` بروید و یک حساب کاربری ایجاد کنید. پس از ثبت‌نام، به طور خودکار وارد می‌شوید.
2. **ورود:** به آدرس `/login` بروید و با ایمیل و رمز عبور وارد شوید.
3. **مدیریت کارها:** پس از ورود، به صفحه `/tasks` هدایت می‌شوید. در اینجا می‌توانید:
   - کار جدید اضافه کنید (دکمه **+ کار جدید**)
   - عنوان، توضیحات، تاریخ و زمان را ثبت کنید
   - کارها خود را در لیست ببینید
   - وضعیت هر کار را (در انتظار، تأیید شده، لغو شده، انجام شده) تغییر دهید
   - کار را ویرایش یا حذف کنید
4. **خروج:** با کلیک روی دکمه **خروج** در منوی بالا، از حساب خود خارج شوید.

## 🚢 استقرار در تولید (پیشنهادی)

### استفاده از VPS (Ubuntu 22.04)

1. **نصب Node.js 20، Git، Nginx، PM2 و Podman**
2. **کلون پروژه و تنظیم `.env.prod`**
3. **اجرای دیتابیس با Podman:** `npm run up:prod`
4. **مهاجرت و ساخت:** `npm run migrate:prod && npm run build`
5. **اجرا با PM2:** `pm2 start npm --name "task-manager" -- start`
6. **تنظیم Nginx به عنوان پروکسی معکوس:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **اختیاری: نصب SSL با Certbot**

### استفاده از پلتفرم‌های ابری

- **Vercel + Supabase/Neon:** فرانت را روی Vercel و دیتابیس PostgreSQL روی سرویس ابری رایگان (مثل Neon) مستقر کنید. متغیرهای محیطی را در Vercel تنظیم کنید.

## 🤝 مشارکت

پیشنهادها و Pull Requestها خوش‌آمد هستند. لطفاً قبل از ایجاد تغییرات عمده، یک Issue باز کنید.

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## 🧑‍💻 توسعه‌دهنده

محمدجواد مبشری
mobasheri2001@gmail.com
https://github.com/codeparameter
---

> با ❤️ ساخته شده برای پروژه دانشگاهی – مدیریت کارها - ساده و کارآمد
