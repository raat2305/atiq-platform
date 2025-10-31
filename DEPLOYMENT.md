# دليل النشر على GitHub Pages

هذا الدليل يوضح كيفية نشر منصة عتيق للخدمات الرقمية على GitHub Pages مجاناً ودائماً.

## 📋 المتطلبات المسبقة

- حساب GitHub (إنشاء مجاني من https://github.com)
- مستودع GitHub جديد
- خط انترنت مستقر

## 🚀 خطوات النشر

### الخطوة 1: إنشاء مستودع جديد على GitHub

1. اذهب إلى https://github.com
2. اضغط على "New repository" (الزر الأخضر)
3. املأ المعلومات:
   - **Repository name**: `atiq-platform`
   - **Description**: "منصة عتيق للخدمات الرقمية - منصة لإدارة روابط الخدمات الحكومية الجزائرية"
   - **Visibility**: اختر "Public" (مطلوب للـ GitHub Pages المجاني)
   - **README**: اضغط "Add a README file" (اختياري)
   - **.gitignore**: اختر "Node"
   - **License**: MIT License (اختياري)

4. اضغط "Create repository"

### الخطوة 2: رفع ملفات المشروع

#### الخيار أ: باستخدام GitHub Desktop (الأسهل)

1. قم بتحميل GitHub Desktop من https://desktop.github.com
2. بعد تسجيل الدخول، اضغط "Clone repository"
3. اختر المستودع الذي أنشأته
4. اختر مكان حفظ الملفات على جهازك

5. انسخ جميع ملفات المشروع من `/workspace/atiq-platform/` إلى مجلد المستودع المحلي
6. في GitHub Desktop، ستظهر جميع الملفات المضافة في قائمة "Changes"
7. اكتب رسالة Commit: "Initial commit - منصة عتيق للخدمات الرقمية"
8. اضغط "Commit to main"
9. اضغط "Publish repository" في الأعلى

#### الخيار ب: باستخدام سطر الأوامر

```bash
# الذهاب لمجلد المشروع
cd /path/to/your/project

# إعداد git
git init
git add .
git commit -m "Initial commit - منصة عتيق للخدمات الرقمية"

# ربط المستودع (استبدل username باسم مستخدم GitHub الخاص بك)
git remote add origin https://github.com/username/atiq-platform.git

# رفع الملفات
git branch -M main
git push -u origin main
```

### الخطوة 3: تفعيل GitHub Pages

1. اذهب إلى المستودع على GitHub
2. اضغط على تبويب "Settings"
3. في القائمة الجانبية، اضغط على "Pages"
4. في قسم "Source", اختر:
   - Source: "Deploy from a branch"
   - Branch: "main" / "/ (root)" أو "/docs" أو "/dist" (حسب ترتيبك)
5. احفظ الإعدادات

**للحصول على أفضل النتائج، اختر source من "/ (root)" إذا كانت ملفات `dist` في الجذر الرئيسي، أو "/dist" إذا كانت في مجلد dist**

### الخطوة 4: الانتظار والاختبار

- انتظر 5-10 دقائق حتى يعمل GitHub Pages
- رابط موقعك سيكون: `https://username.github.io/atiq-platform/`
- اختبر جميع الصفحات والوظائف

## 🔧 إعداد النشر التلقائي

### إعداد GitHub Actions (اختياري لكن موصى به)

أنشئ ملف `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### التحديث التلقائي بدون Actions

يمكنك تحديث الموقع يدوياً عبر:
1. تعديل الكود محلياً
2. تشغيل `npm run build`
3. رفع ملفات `dist` إلى GitHub

## 🛠️ استكشاف الأخطاء وحلها

### خطأ 404 - الصفحة غير موجودة
- تأكد من أن `base` في `vite.config.ts` مضبوط على `/atiq-platform/`
- تأكد من رفع ملفات `dist` إلى الفرع الصحيح

### خطأ في routing
- اضبط الـ `base` في `vite.config.ts` ليتطابق مع اسم المستودع
- استخدم BrowserRouter في التطبيق

### CSS/JS لا تحمل بشكل صحيح
- تأكد من أن `base` مضبوط بشكل صحيح
- تأكد من رفع جميع ملفات `assets` من مجلد `dist`

## 📊 نصائح للوظائف المتقدمة

### استخدام اسم مستخدم منفرد
إذا أردت رابط مثل `https://username.github.io` بدلاً من `https://username.github.io/atiq-platform`:
1. أنشئ مستودع باسم `username.github.io`
2. ضع الملفات في `main` branch مباشرة (بدون مجلد فرعي)

### استخدام نطاق مخصص
- اشتر نطاق خاص (مثال: example.com)
- اعدّه في إعدادات GitHub Pages
- سيتم تحميل الملفات من المستودع

### النسخ الاحتياطية
- احتفظ بنسخة من الملفات محلياً دائماً
- استخدم GitHub كنسخة احتياطية للبيانات
- فكر في استنساخ المستودع بانتظام

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من إعدادات المستودع في GitHub
2. راجع رسائل الأخطاء في تبويب "Actions"
3. ابحث عن الحلول في GitHub Docs
4. اطلب المساعدة من مجتمع GitHub

---

**بمجرد اكتمال هذه الخطوات، سيكون موقعك متاحاً عالمياً ومجانياً إلى الأبد! 🎉**