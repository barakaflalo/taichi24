# טאיצ׳י 24 · AppNest — הוראות

## מבנה הקבצים (הכול שטוח בשורש, אותיות קטנות)
```
index.html
appnest-assistant.js
manifest.json
sw.js
privacy_policy.html
.nojekyll
icon-192.png
icon-512.png
frames/
  01_commencing/   f_1.webp ... f_8.webp   m_1.webp ... m_8.webp   ← כבר מלא (דוגמה)
  02_wildhorse/    f_1..f_8   m_1..m_8
  03_whitecrane/   ...
  ...
  24_closing/      ...
```

## איך מוסיפים את שאר התמונות
כל תנועה = תיקייה בשם `NN_slug` (המספר + שם), ובתוכה 16 קבצים:
`f_1..f_8` (מדריכה) ו-`m_1..m_8` (מדריך). פורמט WebP או PNG — האפליקציה מנסה קודם `.webp` ואז `.png`.
הסדר: 1=התחלה ... 8=סיום. האפליקציה מנגנת אותם הלוך-ושוב (loop חלק).

**רשימת ה-slugs המדויקת נמצאת בתוך index.html (מערך FORMS).** שמור על אותם שמות בדיוק.

## פרסום ל-GitHub Pages
העלה את כל הקבצים לשורש הריפו (barakaflalo.github.io/...). `.nojekyll` כבר כלול.
בכל עדכון — העלה את `VERSION` בתוך `sw.js` כדי שמשתמשים יקבלו את הגרסה החדשה.

## הערה
תנועה 1 (הפתיחה) כבר עובדת מלא כדוגמה. תנועות 2–24 יראו placeholder עד שתוסיף להן תיקיית frames.
