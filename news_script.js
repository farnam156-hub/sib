const slider = document.getElementById("newsSlider");


/* حرکت اسلایدر اخبار */

function moveSlider(direction){

    slider.scrollBy({

        left: direction * 350,

        behavior:"smooth"

    });

}



/* اطلاعات کامل اخبار */

const newsData = [

{

title:"آغاز فصل برداشت محصولات",

text:
"فصل برداشت محصولات کشاورزی در روستای چای‌باغ آغاز شده است. کشاورزان با تلاش فراوان و استفاده از تجربه‌های سنتی و روش‌های جدید، آماده برداشت محصولات خود هستند. این فعالیت نقش مهمی در اقتصاد خانوارهای روستا دارد."

},


{

title:"رونق گردشگری روستا",

text:
"طبیعت زیبا، چشم‌اندازهای سرسبز و فرهنگ بومی روستای چای‌باغ باعث افزایش حضور گردشگران شده است. برنامه‌هایی برای معرفی جاذبه‌های طبیعی، مسیرهای گردشگری و ظرفیت‌های فرهنگی روستا در حال توسعه است."

},


{

title:"بهسازی معابر روستا",

text:
"عملیات بهسازی و ساماندهی برخی از معابر روستا با هدف افزایش رفاه ساکنان و بهبود مسیرهای عبور آغاز شده است. این پروژه شامل اصلاح مسیرها و بهبود زیرساخت‌های عمومی خواهد بود."

},


{

title:"جشنواره فرهنگ محلی",

text:
"جشنواره فرهنگ و آداب محلی با هدف معرفی سنت‌ها، غذاهای بومی، صنایع دستی و موسیقی محلی برگزار خواهد شد. این برنامه فرصتی برای آشنایی نسل جدید با فرهنگ ارزشمند منطقه است."

}

];



/* باز کردن خبر */

function openNews(index){

    document.getElementById("modalTitle").innerText =
    newsData[index].title;


    document.getElementById("modalText").innerText =
    newsData[index].text;


    document.getElementById("newsModal").style.display="flex";

}



/* بستن خبر */

function closeNews(){

    document.getElementById("newsModal").style.display="none";

}



/* بستن با کلیک بیرون پنجره */

window.onclick=function(event){

    const modal=document.getElementById("newsModal");

    if(event.target === modal){

        closeNews();

    }

}



/* حرکت با کلیدهای کیبورد */

document.addEventListener("keydown",function(event){

    if(event.key==="Escape"){

        closeNews();

    }

});
