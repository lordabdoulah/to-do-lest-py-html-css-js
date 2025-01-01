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
function ceation(task_text, list_of_taskes, done = "fal") {
    let maindiv = document.querySelector(".mainddiv .content .taskes");

    // إنشاء عنصر النص الخاص بالمهمة
    let task = document.createTextNode(task_text);
    let prgraph = document.createElement("p");
    prgraph.appendChild(task);

    // إنشاء الصف الخاص بالمهمة
    let row_div = document.createElement("div");
    maindiv.appendChild(row_div);
    row_div.classList.add("row_div", "row");
    row_div.id = `t${list_of_taskes.length}`;

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
    delet_button.id = `d${list_of_taskes.length}`;

    delet_button.addEventListener("click", function () {
        delet(this.id); // استدعاء دالة الحذف مع تمرير المعرف المناسب
    });

    function delet(id_name) {
        let num = id_name.slice(1);
        row_div.remove();

        let parentElement = document.querySelector(".taskes");
        list_of_taskes = [];

        // تحديث قائمة المهام بعد حذف المهمة
        let children = parentElement.children;
        for (let i = 0; i < children.length; i++) {
            const element = children[i].querySelector(".lup p").textContent;
            list_of_taskes.push(element);
        }

        saveArrayToLocalStorage(list_of_taskes, "data");
    }
}

// دالة لبدء تحميل المهام المخزنة
function start() {
    let list_of_taskes = getArrayFromLocalStorage("data");

    for (let i = 0; i < list_of_taskes.length; i++) {
        const element = list_of_taskes[i];
        if (window.localStorage[element] === "tru") {
            ceation(element, list_of_taskes, "tru");
        } else {
            ceation(element, list_of_taskes); 
        }
    } 
}
start();

let length_note = 0
let was_note = 0
// دالة للتعامل مع إضافة مهمة جديدة
function OnclickAction() {
    let list_of_taskes = getArrayFromLocalStorage("data");

    event.preventDefault();

    let task_input = document.querySelector(".mainddiv .content form input");
    let task_text = task_input.value;
    let note = document.querySelector(".mainddiv .content .note")
    if (task_text.length > 3) {
        if (list_of_taskes.indexOf(task_text) !== -1) {
            if (was_note === 0){
                note.appendChild(document.createTextNode(" المهمه موجوده بالفعل في القائمه يمكنك محاولة اضافة مهمه اخرى"))
                note.style.opacity =1
                was_note = 1   
            }

        } else {
            was_note = 0 
            length_note = 0
            note.style.opacity = 0
            note.textContent = ""
            // إضافة المهمة الجديدة وتخزينها
            list_of_taskes.push(task_text);
            saveArrayToLocalStorage(list_of_taskes, "data");
            ceation(task_text, list_of_taskes);

            // مسح النص من حقل الإدخال بعد إضافة المهمة
            task_input.value = "";
        } 
    }else{
        if (length_note === 0) {
            note.appendChild(document.createTextNode(" ادخل نص من فضلك لا يقل عن 3 احرف"))
            note.style.opacity =1 
            length_note = 1 
        }

    } 
}
