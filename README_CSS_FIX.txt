N1 CSS Module Fix

کێشەکە:
Next.js CSS Modules قبوڵ ناکات selector ـی global وەک:
code, table, th, td, h1, p, input

ئەم fix ـە هەموویان دەکاتە scoped selector وەک:
.tableWrap code
.tableWrap table
.card h1

دانان:
1. ZIP Extract بکە.
2. فۆڵدەری app copy بکە.
3. بیخە ناو:
   C:\Users\rama7\Documents\n1
4. Replace بکە.
5. Terminal دابگرە:
   Ctrl + C
6. دووبارە:
   npm run dev
