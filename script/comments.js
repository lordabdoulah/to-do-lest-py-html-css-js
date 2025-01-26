const API_URL = "https://api.jsonbin.io/v3/b/6795d08fe41b4d34e47ecd72";
const API_KEY = "$2a$10$HDh0avQF5oat.XdbYnx9peX0ee23BjxiQSnlSAgG8TqnOhlZInbnC";
const feedbackInput = document.getElementById("floatingTextarea");
const submitButton = document.getElementById("save-changes");
let last = [];
var myModal = ''
// تحميل الملاحظات من JSONBin
async function loadFeedback() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "X-Master-Key": API_KEY },
    });
    const data = await response.json();
    last = data.record || [];
    console.log(last);
  } catch (error) {
    console.error("خطأ أثناء تحميل الملاحظات:", error);
  }
}

// إرسال الملاحظة إلى JSONBin
submitButton.addEventListener("click", async () => {
  const feedback = feedbackInput.value.trim();
  if (feedback && feedback.length > 0) {
    await loadFeedback(); // انتظر تحميل الملاحظات القديمة قبل إرسال الجديدة
    // أضف الملاحظة إلى القائمة
    fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify([...last, feedback]),
    })
      .then((response) => response.json())
      .then(() => {
        feedbackInput.value = "";
      })
      .catch((error) => console.error("خطأ أثناء إرسال الملاحظة:", error));
  }
  myModal.hide();

});

// تحميل الملاحظات عند فتح الصفحة
window.onload = function () {
    myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
}
