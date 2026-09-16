import {
  auth,
  db,
  onAuthStateChanged,
  doc,
  getDoc
} from "./firebase.js";


// ================================
// ตรวจสอบผู้ใช้ที่เข้าสู่ระบบ
// ================================

onAuthStateChanged(auth, async (user) => {

  const loginButton = document.querySelector(".login-btn");

  if (!user) {
    if (loginButton) {
      loginButton.textContent = "เข้าสู่ระบบ";
      loginButton.href = "login.html";
    }

    return;
  }


  // ผู้ใช้เข้าสู่ระบบแล้ว
  if (loginButton) {
    loginButton.textContent = "กำลังโหลด...";
  }


  try {

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);


    if (userSnap.exists()) {

      const userData = userSnap.data();

      console.log("ข้อมูลผู้ใช้:", userData);

      if (loginButton) {
        loginButton.textContent =
          userData.name || "โปรไฟล์";

        loginButton.href = "profile.html";
      }

    } else {

      console.log("ไม่พบข้อมูลผู้ใช้ใน Firestore");

      if (loginButton) {
        loginButton.textContent = "โปรไฟล์";
        loginButton.href = "profile.html";
      }

    }

  } catch (error) {

    console.error("โหลดข้อมูลผู้ใช้ไม่สำเร็จ:", error);

    if (loginButton) {
      loginButton.textContent = "โปรไฟล์";
      loginButton.href = "profile.html";
    }

  }

});


// ================================
// ปีปัจจุบัน
// ================================

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
