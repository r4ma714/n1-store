N1 UDID Page Like SeeYouIOS

ئەم update ـە:
- دوگمەی سەرەکی Home دەکاتە UDID و دەباتە /udid
- /udid دەکاتە پەڕەی Extract UDID وەک SeeYouIOS flow:
  1. Install Profile
  2. Install from Settings
  3. UDID displayed
- profile route:
  /api/udid/profile
- callback route:
  /api/udid/callback
- status route:
  /api/udid/status

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

پاشان:
http://localhost:3000/udid

گرنگ:
UDID profile بە شێوەی ڕاستەقینە باشترین کات کار دەکات کە website ـەکە HTTPS بێت، وەک Vercel/domain.
لە localhost/IP هەندێ iPhone profile install ناکات.
