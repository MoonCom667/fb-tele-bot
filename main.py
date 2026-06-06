import os
import telebot
import requests

# 1. إعداد المفاتيح السرية (الرموز)
# سيتم قراءة هذه المفاتيح بشكل آمن من إعدادات السيرفر
TELEGRAM_TOKEN = os.environ.get('TELEGRAM_TOKEN')
FB_PAGE_ID = os.environ.get('FB_PAGE_ID')
FB_ACCESS_TOKEN = os.environ.get('FB_ACCESS_TOKEN')

# تشغيل بوت التليجرام
bot = telebot.TeleBot(TELEGRAM_TOKEN)

print("البوت يعمل الآن ومستعد لاستقبال الأوامر...")

# 2. استقبال الروابط أو النصوص من التليجرام ونشرها في فيسبوك
@bot.message_handler(func=lambda message: True)
def handle_messages(message):
    user_text = message.text
    
    # التحقق من أن المرسل هو أنت فقط (لحماية البوت)
    # يمكنك وضع رقم معرف التليجرام الخاص بك هنا لاحقاً
    
    bot.reply_to(message, "⏳ جاري نشر هذا المحتوى على صفحة الفيسبوك الخاصة بك...")
    
    # رابط واجهة فيسبوك البرمجية (Facebook Graph API) للنشر
    fb_url = f"https://graph.facebook.com/v18.0/{FB_PAGE_ID}/feed"
    
    # البيانات المرسلة لفيسبوك
    payload = {
        'message': f"مشاركة جديدة من مكتب القمر للحاسبات 🌟:\n\n{user_text}",
        'access_token': FB_ACCESS_TOKEN
    }
    
    try:
        # إرسال الطلب لفيسبوك
        response = requests.post(fb_url, data=payload)
        result = response.json()
        
        if "id" in result:
            bot.reply_to(message, f"✅ تم النشر بنجاح على فيسبوك!\nرقم المنشور: {result['id']}")
        else:
            bot.reply_to(message, f"❌ فشل النشر. خطأ من فيسبوك: {result.get('error', {}).get('message', 'خطأ غير معروف')}")
            
    except Exception as e:
        bot.reply_to(message, f"⚠️ حدث خطأ أثناء الاتصال بالخادم: {str(e)}")

# استمرار تشغيل البوت دون توقف
bot.infinity_polling()