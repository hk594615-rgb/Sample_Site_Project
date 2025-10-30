document.addEventListener('DOMContentLoaded', function() {
    // 1. وظيفة تبديل الوضع الليلي/النهاري (Dark Mode Toggle)
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // تحديث الأيقونة
        modeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    
    // 2. العناصر الرئيسية للتحكم بالفيديو
    const mainVideo = document.getElementById('main-video');
    const videoSourceMp4 = document.getElementById('video-source-mp4');
    const videoSourceWebm = document.getElementById('video-source-webm');
    const choiceButtons = document.querySelectorAll('.choice-btn'); // يتم الآن التقاط جميع الأزرار الـ 5
    const videoInfo = document.getElementById('video-info');
    
    // وظيفة تبديل الفيديو الرئيسية
    function switchVideo(videoPath, videoTitle) {
        // تحديث مصادر الفيديو (MP4 و WEBM)
        videoSourceMp4.src = videoPath;
        // هنا نفترض أن ملف WEBM موجود بنفس اسم ملف MP4 (مع استبدال اللاحقة)
        videoSourceWebm.src = videoPath.replace('.mp4', '.webm');
        
        // إعادة تحميل وتشغيل الفيديو الجديد
        mainVideo.load();
        mainVideo.play().catch(e => {
            console.warn('Autoplay prevented:', e);
            // قد يحتاج المستخدم إلى الضغط على زر التشغيل يدوياً
        });
        
        // تحديث رسالة المعلومات التي تظهر للمستخدم
        videoInfo.textContent = `قيد التشغيل حالياً: ${videoTitle}`;
        
        // تحديث حالة الزر النشط بصرياً
        choiceButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.video === videoPath) {
                btn.classList.add('active');
            }
        });
    }

    // ربط وظيفة تبديل الفيديو بجميع الأزرار
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoPath = this.dataset.video;
            const videoTitle = this.dataset.title;
            switchVideo(videoPath, videoTitle);
        });
    });

    // 3. وظيفة الميزة المخفية (Easter Egg)
    const easterEggZone = document.getElementById('easter-egg-zone');
    let clickCount = 0;
    const REQUIRED_CLICKS = 7; 
    const secretAudio = new Audio('media/description.mp3'); 
    
    easterEggZone.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount >= REQUIRED_CLICKS) {
            // تشغيل الملف الصوتي الذي أنشأته
            secretAudio.play();
            
            // رد فعل بصري لمدة 4 ثوانٍ
            easterEggZone.style.backgroundColor = '#e74c3c'; 
            easterEggZone.innerHTML = '<h3>!لقد نجحت في الاكتشاف</h3><p>المقطع الصوتي يعمل الآن!</p>'; 
            
            setTimeout(() => {
                // استعادة المظهر والنص الأصلي
                easterEggZone.style.backgroundColor = '';
                easterEggZone.innerHTML = '<h3>هل أنت مستكشف ماهر؟</h3><p>حاول النقر على هذه المنطقة عدة مرات. قد تكتشف شيئاً غير متوقع!</p>'; 
            }, 4000); 

            // إعادة تعيين عداد النقرات
            clickCount = 0;
        } else if (clickCount === 1) {
            // مؤقت لإعادة تعيين العداد إذا كانت النقرات بطيئة جداً
            setTimeout(() => {
                 if (clickCount < REQUIRED_CLICKS) {
                    clickCount = 0;
                }
            }, 2500); 
        }
    });

    // 4. تهيئة الحالة الافتراضية
    // تعيين زر المقدمة كنشط عند تحميل الصفحة لأول مرة
    document.querySelector('.choice-btn[data-video="media/video-intro.mp4"]').classList.add('active');
});