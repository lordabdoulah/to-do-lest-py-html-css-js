// الاعدادات العامه
const task_storage_key = "data";              // اسم المتغير الذي سوف يحتوي على قائمة المهام
const mintask_length = 5;                   // الحد الأدنى لطول المهام  
let mode_stat = 1                           // مركب وغير مركب                  1 تعني عادي
let was_note = 0
let length_note = 0
const dark_mode_color = "#008080"   
version = "1.1.0"   
let vtext = `---

🎉 الإصدار الثاني من [اسم موقعك] جاهز الآن! 🚀

مرحبًا بكم جميعًا! أنا سعيد جدًا بمشاركتكم الإصدار الثاني من الموقع الخاص بي. عملت بجهد على تحسين التجربة وإضافة ميزات جديدة بناءً على التعليقات والاقتراحات. 💡

الجديد في هذا الإصدار:

✅ قائمة مهام (To-Do List) بسيطة وسهلة الاستخدام، عشان تساعدك في تنظيم يومك.

✅ تصميم جديد وجذاب باستخدام Bootstrap، يوفر مظهرًا مريحًا وسريع التصفح.

✅ تحسين الأداء لجعل التفاعل مع الموقع أسرع وأسهل.


ملاحظات مهمة:

1. هذا الإصدار لا يزال في مرحلة التمرين والتطوير، لذلك أتمنى منكم إرسال أي تعليقات أو اقتراحات لتحسين الموقع.


2. إذا واجهتم أي مشكلة أثناء الاستخدام، أرجو إبلاغي فورًا لحلها في التحديثات القادمة.


3. هدفي الأساسي أن أتعلم وأطور مهاراتي من خلال هذا المشروع، وكل دعم منكم يعني لي الكثير. 🙏



🌐 جرب الموقع الآن: [رابط الموقع]

شكرًا لكل شخص دعمني أو شاركني رأيه في الإصدارات السابقة، وأتمنى أن تستمتعوا بهذا الإصدار! ❤️


---


ازاي اخلي الرموز تظهر في الصفحه.... 

`



// العناصر الي هستخدمها علطول
const maindiv = document.querySelector(".mainddiv .content .taskes");
const note = document.querySelector(".mainddiv .content .note")


// 


// دالة لحفظ المصفوفة في localStorage
function saveArrayToLocalStorage(array, key) {
    // تحويل المصفوفة إلى نص باستخدام JSON.stringify وتخزينها في localStorage
    localStorage.setItem(key, JSON.stringify(array));
}

// دالة لاسترجاع المصفوفة من localStorage
function getArrayFromLocalStorage(key) {
    // استرجاع النص من localStorage وتحويله إلى مصفوفة باستخدام JSON.parse
    const storedArray = localStorage.getItem(key);
    
    // إذا كانت البيانات موجودة، قم بتحويلها إلى مصفوفة، وإذا كانت غير موجودة، قم بإرجاع مصفوفة فارغة
    return storedArray ? JSON.parse(storedArray) : [];
}

// دالة لإنشاء تأثير أوراق زينة تسقط من أعلى الشاشة
function createFallingDecorations() {
    let interval = setInterval(() => {
        for (let i = 0; i < 20; i++) { // عدد أوراق الزينة
            let decoration = document.createElement("div");
            decoration.classList.add("falling-decoration");

            // وضع الورقة في مكان عشوائي على الشاشة
            decoration.style.left = Math.random() * 100 + "vw";
            decoration.style.animationDuration = Math.random() * 3 + "s"; // مدة السقوط العشوائية
            decoration.style.opacity = Math.random();

            document.body.appendChild(decoration);

            // إزالة الورقة بعد انتهاء الأنيميشن
            decoration.addEventListener("animationend", () => {
                decoration.remove();
            });
        }
    }, 300);

    // إيقاف تأثير أوراق الزينة بعد 3 ثوانٍ
    setTimeout(() => clearInterval(interval), 3000);
}

// دالة لإنشاء مهمة جديدة وإضافتها إلى الصفحة
function ceation(task_text, done = "fal") {
    // let maindiv = document.querySelector(".mainddiv .content .taskes");

    // إنشاء عنصر النص الخاص بالمهمة
    let task = document.createTextNode(task_text);
    let prgraph = document.createElement("p");
    prgraph.appendChild(task);

    // إنشاء الصف الخاص بالمهمة
    let row_div = document.createElement("div");
    maindiv.appendChild(row_div);
    row_div.classList.add("row_div", "myrow");
    // row_div.id = `t${list_of_taskes.length}`;

    // إنشاء قسم النص والعناصر الأخرى
    let labul_div = document.createElement("div");
    row_div.appendChild(labul_div);
    labul_div.appendChild(prgraph);
    labul_div.classList.add("lup");

    // إنشاء زر الإنهاء
    let done_button = document.createElement("button");
    labul_div.appendChild(done_button);
    done_button.classList.add("done");

    let stat = 1;
    if (done === "tru") {
        done_fun();
    }

    done_button.appendChild(document.createTextNode("done"));
    done_button.addEventListener("click", function () {
        stat *= -1;
        if (stat === -1) {
            // عند وضع المهمة كمنتهية
            done_button.classList.add("done-done");
            prgraph.classList.add("p-done");
            labul_div.classList.add("lup-done"); 
            window.localStorage[prgraph.textContent] = "tru";     

            // تشغيل أوراق الزينة
            createFallingDecorations();
        } else {
            // عند إلغاء حالة الانتهاء
            done_button.classList.remove("done-done");
            prgraph.classList.remove("p-done");
            labul_div.classList.remove("lup-done");
            window.localStorage[prgraph.textContent] = "fal";  
        }
    });

    function done_fun() {
        stat *= -1;
        if (stat === -1) {
            done_button.classList.add("done-done");
            prgraph.classList.add("p-done");
            labul_div.classList.add("lup-done"); 
            window.localStorage[prgraph.textContent] = "tru";     
        } else {
            done_button.classList.remove("done-done");
            prgraph.classList.remove("p-done");
            labul_div.classList.remove("lup-done");
            window.localStorage[prgraph.textContent] = "fal";  
        }
    }

    // إنشاء زر الحذف
    let delet_button = document.createElement("button");
    labul_div.appendChild(delet_button);
    delet_button.classList.add("delet");
    delet_button.appendChild(document.createTextNode("delete"));
    // delet_button.id = `d${list_of_taskes.length}`;


// ديناميكية حذف المهمه 
    delet_button.addEventListener("click", ()=> main_delet(delet_button))
}
// دالة لبدء تحميل المهام المخزنة
function ReloadTasks() {

    // المهام التي تم الانتهاء منها
    let list_of_taskes = getArrayFromLocalStorage(task_storage_key);
    console.log(list_of_taskes)
    for (let i = 0; i < list_of_taskes.length; i++) {
        const element = list_of_taskes[i];
        if ( typeof element === "object" ) {
            // console.log(`${i} = >  object`)
            createComplexTask(element[0], element[1])
        }else{
            // console.log(`${i} = >  ${typeof element}`)
            if (window.localStorage[element] === "tru") {
                ceation(element, "tru");
            } else {
                ceation(element); 
            }
        }

    } 


    // الدارك مود   $$$$$$$$$$$$$$$$$$$$ 
    if ( Number(window.localStorage.dark)  !== 1 && Number(window.localStorage.dark ) !== -1 ) {
        // console.log(window.localStorage.dark)
        // console.log(1)
        window.localStorage.dark = 1
    }else{
        darkcheek(Number(window.localStorage.dark) )
    }
    let  dark = document.querySelector(".dark")
    dark.addEventListener("click",function (){
        let stat = Number(window.localStorage.dark) 
        window.localStorage.dark = stat*-1
        stat *= -1
        darkcheek(stat)
    } );

    // الوضع المعقد 
    if ( Number(window.localStorage.transform)  !== 1 && Number(window.localStorage.transform ) !== -1 ) {
        // console.log(window.localStorage.transform)
        // console.log(1)
        window.localStorage.transform = 1
    }else{
        transformer(Number(window.localStorage.transform) )
    }
    document.querySelector(".transform").addEventListener("click" ,function (){
        let stat_transform = Number(window.localStorage.transform)
        stat_transform *= -1 
        window.localStorage.transform =stat_transform
        transformer(stat_transform)

    } )
}


// التاكد من ان المهمه صالحه
function check_task(task_text) {
    let list_of_taskes = getArrayFromLocalStorage(task_storage_key);
    if (task_text.length <= mintask_length){
        if (length_note === 0){
            note.innerHTML=""
            note.appendChild(document.createTextNode(" ادخل نص من فضلك لا يقل عن 3 احرف"))
            note.style.opacity =1 
            length_note = 1 
        }
        return false
    }else{
        if (list_of_taskes.indexOf(task_text) !== -1) {
            if (was_note === 0){
                note.appendChild(document.createTextNode(" المهمه موجوده بالفعل في القائمه يمكنك محاولة اضافة مهمه اخرى"))
                note.style.opacity =1
                was_note = 1   
            }
            return false;
        } else {  
            was_note = 0
            length_note = 0
            note.style.opacity = 0
            note.textContent = ""
            return true;
        }
    }        
}



// دالة للتعامل مع إضافة مهمة جديدة
function OnclickAction() {
    let list_of_taskes = getArrayFromLocalStorage(task_storage_key);
    let main_task_input = document.querySelector(".mainddiv .content .form input");
    let main_task_text = main_task_input.value;
    
    if (mode_stat === 1) {
        if (check_task(main_task_text)) {
            // إضافة المهمة الجديدة وتخزينها
            list_of_taskes.push(main_task_text);
            saveArrayToLocalStorage(list_of_taskes, task_storage_key);
            ceation(main_task_text, list_of_taskes);
        }           
    }else if (mode_stat === -1 && check_task(main_task_text)) {
        let small_taskes = document.querySelectorAll(".mainddiv .content .form .smaltask_input")
        let small_taskes_text = []
        small_taskes.forEach(element => {
            if (check_task(element.value)) {
                small_taskes_text.push(element.value)
            }else{
                return false
            }
        });
        if (small_taskes_text.length > 0) {
            // إضافة المهمة الجديدة وتخزينها
            createComplexTask(main_task_text, small_taskes_text)
            // تخزين المهمه                         *************************
            let ComplexTask = [main_task_text ,small_taskes_text]
            list_of_taskes.push(ComplexTask);
            saveArrayToLocalStorage(list_of_taskes, task_storage_key);
        }
    }
    // مسح النص من حقل الإدخال بعد إضافة المهمة
    main_task_input.value = "";
    // مسح باقي الحقول                             ************************
}


function darkcheek(stat){
    if (stat === -1){
        document.querySelector(".dark i").classList.remove("fa-regular")
        document.querySelector(".dark i").classList.add("fa-solid")
    }else{
        document.querySelector(".dark i").classList.remove("fa-solid")
        document.querySelector(".dark i").classList.add("fa-regular")
    }
}


// دالة لتغير الوضع الى معقد وغير معقد
function transformer(stat_transform){
    if (stat_transform === -1){
        document.querySelector(".transform").classList.add("transform-onclick")
        document.querySelector(".transform").classList.remove("transform-onclick-simbel")
    }else{
        document.querySelector(".transform").classList.remove("transform-onclick")
        document.querySelector(".transform").classList.add("transform-onclick-simbel")
    } 
}


// تغير الوضع العادي الى مركب وغير مركب
function ChangeMode(){
    // console.log("mode is changing")
    if (mode_stat === 1) {
        creatsmallinputtask()
        creatsmallinputtask()
    }else{
        let smalltaskes = document.querySelectorAll(".mainddiv .content .form .smaltask")
        for (let i = 0; i < smalltaskes.length; i++) {
            smalltaskes[i].remove()
            
        }
    }


    mode_stat *=-1
    // console.log("mode has been changed")
}

// دالة لإنشاء حقل لإدخال المهام الصغيرة
function creatsmallinputtask(){
    let mainform = document.querySelector('.mainddiv .content .form')


    let smaltask = document.createElement('div')
    mainform.appendChild(smaltask)
    smaltask.classList.add('smaltask')


    let smaltask_input = document.createElement('input')
    smaltask.appendChild(smaltask_input)
    smaltask_input.classList.add('smaltask_input')
    let plus_button_i = document.createElement("i")
    plus_button_i.classList.add("fa-solid",'fa-plus')
    let minus_button_i = document.createElement("i")
    minus_button_i.classList.add("fa-solid",'fa-minus')


    let plus_button = document.createElement('div')
    plus_button.classList.add("add-remov", "plus")
    plus_button.appendChild(plus_button_i)
    let minus_button = document.createElement('div')
    minus_button.classList.add("add-remov", "minus")
    minus_button.appendChild(minus_button_i)
    smaltask.appendChild(minus_button)
    smaltask.appendChild(plus_button)
    minus_button.addEventListener("click",function(event){
        this.parentNode.remove()
        felterAddAndRemoveButtons()
        // console.log("done")
    })

    plus_button.addEventListener("click",function(){
        creatsmallinputtask()
        // console.log("done")
    })
    felterAddAndRemoveButtons()
}
// عمل هندل لازرار الإضافة والإزالة
function felterAddAndRemoveButtons(){
    let allsmalltaskes = document.querySelectorAll(".mainddiv .content .form .smaltask")
    // console.log(allsmalltaskes)
    for (let i = 0; i < allsmalltaskes.length; i++) {
        const element = allsmalltaskes[i];
        // console.log(element)
        let pluselement = element.querySelector(".plus")
        // console.log(pluselement)
        pluselement.style.opacity = "0"
        pluselement.style.pointerEvents = 'none';
        if (i === (allsmalltaskes.length - 1)){
            let lastpluselement = element.querySelector(".plus")
            lastpluselement.style.opacity = "1" 
            lastpluselement.style.pointerEvents = "all"
        }
        if (allsmalltaskes.length < 3){
            let minuselement = element.querySelector(".minus");
            minuselement.style.opacity = "0"
            minuselement.style.pointerEvents = 'none';
        }else{
            let minuselement = element.querySelector(".minus");
            minuselement.style.opacity = "1"
            minuselement.style.pointerEvents = "all";
        }
    }
}

// انشاء مهمه مركبة
function createComplexTask(task_text, small_taskes, done = "fal") {
    // إنشاء عنصر النص الخاص بالمهمة
    let task = document.createTextNode(task_text);
    let prgraph = document.createElement("p");
    prgraph.appendChild(task);

    // إنشاء الصف الخاص بالمهمة
    let row_div = document.createElement("div");
    maindiv.appendChild(row_div);
    row_div.classList.add("row_div", "myrow");
    // row_div.id = `t${list_of_taskes.length}`;

    // إنشاء قسم النص والعناصر الأخرى
    let labul_div = document.createElement("div");
    row_div.appendChild(labul_div);
    labul_div.appendChild(prgraph);
    labul_div.classList.add("lup");

    // انشاء ايكون للقائمه المنسدله
    let done_button = document.createElement("button");
    labul_div.appendChild(done_button);
    done_button.classList.add("duone");
    done_button.innerHTML = '<i class="fa-solid fa-bars"></i>'
    done_button.addEventListener("click", function (event) {
        // الحصول علي جميع ابناء التاسكس
        let all_in_taskes = Array.from(maindiv.children)
        // الحصول علي موقع المهمه الحاليه 
        let selfindix = Array.from(maindiv.children).indexOf(this.parentNode.parentNode)
        // اظهار العنصر الذي يليها والتاكج من كونه خاص بالمهام الصغيره
        let small_task_div = all_in_taskes[selfindix + 1]
        if (small_task_div.classList.contains("smale-taskes")) {
            if (small_task_div.classList.contains("smale-taskes-hide")) {
                small_task_div.classList.remove("smale-taskes-hide")
            }else {
                small_task_div.classList.add("smale-taskes-hide")
            }
        }
    })

    // إنشاء زر الحذف
    let delet_button = document.createElement("button");
    labul_div.appendChild(delet_button);
    delet_button.classList.add("delet");
    delet_button.appendChild(document.createTextNode("delete"));
    delet_button.addEventListener("click", ()=> main_delet(delet_button))




    // اضافة المهام الفرعية
    if (small_taskes.length > 0) {
        let small_task_div = document.createElement("div");
        maindiv.appendChild(small_task_div);
        small_task_div.classList.add("smale-taskes", "smale-taskes-hide");
        small_taskes.forEach(element => {
            let smale_row = document.createElement("div");
            small_task_div.appendChild(smale_row);
            smale_row.classList.add("myrow", "smale-row");
            let smale_minus = document.createElement("i");
            smale_minus.classList.add("fa-solid", "fa-minus");
            smale_row.appendChild(smale_minus);
            let smale_lup = document.createElement("div");
            smale_row.appendChild(smale_lup);
            smale_lup.classList.add("lup");
            let smale_p = document.createElement("p");
            smale_lup.appendChild(smale_p);
            smale_p.textContent = element;

            // 
            let smale_done = document.createElement("button");
            smale_done.appendChild(document.createTextNode("done"));
            smale_lup.appendChild(smale_done);
            smale_done.classList.add("done");
            smale_done.addEventListener("click", ()=>small_done_fun(smale_done))
            


            // إنشاء زر الحذف
            let smale_delet = document.createElement("button");
            smale_lup.appendChild(smale_delet);
            smale_delet.classList.add("delet");
            smale_delet.appendChild(document.createTextNode("delete"));
            smale_delet.addEventListener("click", ()=> main_delet(smale_delet))

            // اذا كان العنصر كان مكتملاً
            
        })
        Array.from(small_task_div.children).forEach(element => {if (window.localStorage[element.querySelector("p").textContent] === "tru") small_done_fun(element.querySelector(".done") ,false) })
            


    }
}
// دالة تميز مهمه صغيره كمنتهية
function small_done_fun(self ,withclipriast= true) {
    // اعادة تعريف بعض المتغيرا
    let smale_done = self
    let smale_lup = smale_done.parentNode
    let smale_p = smale_lup.querySelector("p")

    if (smale_lup.classList.contains("lup-done")) {
        // عند إلغاء حالة الانتهاء
        smale_done.classList.remove("done-done");
        smale_p.classList.remove("p-done");
        smale_lup.classList.remove("lup-done");
        window.localStorage[smale_p.textContent] = "fal";

    } else {
        // عند وضع المهمة كمنتهية
        smale_done.classList.add("done-done");
        smale_p.classList.add("p-done");
        smale_lup.classList.add("lup-done"); 
        window.localStorage[smale_p.textContent] = "tru";     

        // تشغيل أوراق الزينة

        if (withclipriast)createFallingDecorations();  
    }
    // تحديث قائمة المهام بعد وضع المهمة كمنتهية     *******************************************

    // تحديث شريط تقدم المهمه الرايسيه
    // الحصول علي جميع ابناء التاسكس
    let all_in_taskes = Array.from(maindiv.children)
    // console.log(all_in_taskes)
    // الحصول علي موقع المهمه الحاليه 
    let selfindix = all_in_taskes.indexOf(self.parentNode.parentNode.parentNode)
    // اظهار العنصر الذي يليها والتاكج من كونه خاص بالمهام الصغيره
    let main_task_div = all_in_taskes[selfindix - 1]
    // console.log(main_task_div)
    if (main_task_div.classList.contains("myrow")) {
        let number_of_done = 0
        let number_of_all = 0
        let all_small_taskes = Array.from(self.parentNode.parentNode.parentNode.children)
        all_small_taskes.forEach(element => {
            if (element.querySelector(".lup").classList.contains("lup-done")) {
                number_of_done += 1
            }
            number_of_all += 1
        })
        let progrsv = number_of_done / number_of_all * 100
        main_task_div.style.setProperty("--progrsv", `${progrsv}%`)
        if (progrsv === 100) {
            // عند وضع المهمة كمنتهية
            main_task_div.querySelector("p").classList.add("p-done");
            main_task_div.querySelector(".lup").classList.add("lup-done");    
            // تحديث الحاله العامه للمهمه  
            window.localStorage[main_task_div.querySelector("p").textContent] = "tru";

            // تشغيل أوراق الزينة
            if (withclipriast)createFallingDecorations(); 
        } else {
            // عند إلغاء حالة الانتهاء
            main_task_div.querySelector("p").classList.remove("p-done");
            main_task_div.querySelector(".lup").classList.remove("lup-done");
            // تحديث الحاله العامه للمهمه  😂😂
            window.localStorage[main_task_div.querySelector("p").textContent] = "fal";
        }
    }
}
function main_delet(self) {
    // حذف المهمه الفرعيه
        // الحصول علي جميع ابناء التاسكس
        let rows = Array.from(maindiv.children)
        // الحصول علي موقع المهمه الحاليه 
        let selfindix = Array.from(maindiv.children).indexOf(self.parentNode.parentNode)
        // اظهار العنصر الذي يليها والتاكج من كونه خاص بالمهام الصغيره
        let small_task_div = rows[selfindix + 1]
        if (small_task_div) {
            if (small_task_div.classList.contains("smale-taskes")) {
                small_task_div.remove()
            }
        }
    // تحديث قائمة المهام بعد حذف المهمة                                        ***********************   
    self.parentNode.parentNode.remove(); // حذف الصف والمهمة  
    let list_of_taskes = [];
    rows = Array.from(maindiv.children)
    rows.forEach((element, index) => {
        // console.log(rows)
        if (element.classList.contains("smale-taskes") === false){
            if (rows[index + 1]){
                // console.log(rows[index + 1])
                if(rows[index + 1].classList.contains("smale-taskes")){
                    // console.log("1 step")
                    let smalltaskes = []
                    Array.from(rows[index + 1].querySelectorAll("p") ).forEach(element => {
                        smalltaskes.push(element.textContent)
                    })
                    let ComplexTask = [ element.querySelector("p").textContent ,smalltaskes]
                    list_of_taskes.push(ComplexTask)
                
                }else{
                    // console.log("11 step")
                    list_of_taskes.push(element.querySelector("p").textContent)
                }
            }else{
                // console.log(element)
                // console.log("2 step")
                list_of_taskes.push(element.querySelector(".lup p").textContent);
            }
        }
    });
    // console.log(list_of_taskes)
    saveArrayToLocalStorage(list_of_taskes, "data");            



    // تحديث قائمة المهام بعد حذف المهمة                                        ***********************     
    // console.log("removing ...")
}


window.onload = function () {
    ReloadTasks();
    // createComplexTask("feacktask 1", ["task1", "task2", "task3"])
    // createComplexTask("feacktask 2", ["task1", "task2", "task3"])
        document.querySelector(".version").innerHTML = `v ${version}`

}



