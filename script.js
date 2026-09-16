import {
  auth,
  db,
  onAuthStateChanged,
  doc,
  getDoc,
  collection,
  getDocs
} from "./firebase.js";

console.log("StudyShare script loaded");

// ===============================
// เปลี่ยนปุ่มเข้าสู่ระบบเป็นโปรไฟล์
// ===============================
onAuthStateChanged(auth, async (user) => {
  console.log("Firebase user:", user);

  const loginButton = document.querySelector(".login-btn");

  if (!loginButton) {
    console.log("ไม่พบ .login-btn ในหน้าเว็บ");
    return;
  }

  if (!user) {
    loginButton.textContent = "เข้าสู่ระบบ";
    loginButton.href = "login.html";
    return;
  }

  loginButton.textContent = "กำลังโหลด...";

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      console.log("ข้อมูลผู้ใช้:", data);

      loginButton.textContent = data.name || "โปรไฟล์";
    } else {
      loginButton.textContent = "โปรไฟล์";
    }

    loginButton.href = "profile.html";

  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้:", error);

    loginButton.textContent = "โปรไฟล์";
    loginButton.href = "profile.html";
  }
});


// ===============================
// โหลดจำนวนสถิติหน้าแรก
// ===============================
async function loadStats() {

  console.log("เริ่มโหลดสถิติ...");

  try {

    // -------------------------------
    // โหลด Posts
    // -------------------------------

    const postsSnapshot = await getDocs(
      collection(db, "posts")
    );

    console.log(
      "จำนวนเอกสารใน posts:",
      postsSnapshot.size
    );

    let bookCount = 0;
    let noteCount = 0;

    postsSnapshot.forEach((docSnap) => {

      const data = docSnap.data();

      console.log("Post:", data);

      if (data.type === "book") {
        bookCount++;
      }

      if (data.type === "note") {
        noteCount++;
      }

    });


    // -------------------------------
    // โหลด Users
    // -------------------------------

    const usersSnapshot = await getDocs(
      collection(db, "users")
    );

    console.log(
      "จำนวนเอกสารใน users:",
      usersSnapshot.size
    );

    let userCount = usersSnapshot.size;


    // -------------------------------
    // แสดงตัวเลขบนหน้าแรก
    // -------------------------------

    const bookElement =
      document.querySelector("#bookCount");

    const noteElement =
      document.querySelector("#noteCount");

    const userElement =
      document.querySelector("#userCount");


    console.log("bookElement:", bookElement);
    console.log("noteElement:", noteElement);
    console.log("userElement:", userElement);


    if (bookElement) {
      bookElement.textContent = bookCount;
    }

    if (noteElement) {
      noteElement.textContent = noteCount;
    }

    if (userElement) {
      userElement.textContent = userCount;
    }


    // -------------------------------
    // แสดงผลใน Console
    // -------------------------------

    console.log("================================");
    console.log("📚 จำนวนหนังสือ:", bookCount);
    console.log("📝 จำนวนชีท:", noteCount);
    console.log("👤 จำนวนสมาชิก:", userCount);
    console.log("================================");


  } catch (error) {

    console.error(
      "❌ โหลดสถิติไม่สำเร็จ:",
      error
    );

  }
}


// ===============================
// เรียกโหลดสถิติ
// ===============================

loadStats();


// ===============================
// ปีปัจจุบัน
// ===============================

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}
