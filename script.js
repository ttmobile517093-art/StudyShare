import {
  auth,
  db,
  onAuthStateChanged,
  doc,
  getDoc
} from "./firebase.js";

console.log("StudyShare script loaded");


onAuthStateChanged(auth, async (user) => {

  console.log("Firebase user:", user);

  const loginButton =
    document.querySelector(".login-btn");

  if (!loginButton) {
    console.log("ไม่พบ .login-btn ในหน้าเว็บ");
    return;
  }


  // ยังไม่ได้เข้าสู่ระบบ
  if (!user) {

    loginButton.textContent = "เข้าสู่ระบบ";
    loginButton.href = "login.html";

    return;
  }


  // เข้าสู่ระบบแล้ว
  loginButton.textContent = "กำลังโหลด...";


  try {

    const userRef =
      doc(db, "users", user.uid);

    const userSnap =
      await getDoc(userRef);


    if (userSnap.exists()) {

      const data = userSnap.data();

      console.log("ข้อมูลผู้ใช้:", data);

      loginButton.textContent =
        data.name || "โปรไฟล์";

    } else {

      console.log(
        "พบ Firebase Account แต่ไม่พบข้อมูลใน Firestore"
      );

      loginButton.textContent = "โปรไฟล์";
    }


    loginButton.href = "profile.html";


  } catch (error) {

    console.error(
      "เกิดข้อผิดพลาดในการโหลดข้อมูล:",
      error
    );

    loginButton.textContent = "โปรไฟล์";
    loginButton.href = "profile.html";
  }

});


// ปีปัจจุบัน
const year =
  document.querySelector("#year");

if (year) {
  year.textContent =
    new Date().getFullYear();
}
