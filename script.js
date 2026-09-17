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

// เปลี่ยนปุ่ม Login เป็น Profile

// ===============================


onAuthStateChanged(auth, async (user) => {


const loginButton =

document.querySelector(".login-btn");


if (!loginButton) return;


if (!user) {


loginButton.textContent =  
  "เข้าสู่ระบบ";  

loginButton.href =  
  "login.html";  

return;  



}


try {


const userRef =  
  doc(db, "users", user.uid);  

const userSnap =  
  await getDoc(userRef);  


if (userSnap.exists()) {  

  const data =  
    userSnap.data();  

  loginButton.textContent =  
    data.name || "โปรไฟล์";  

} else {  

  loginButton.textContent =  
    "โปรไฟล์";  

}  


loginButton.href =  
  "profile.html";  



} catch (error) {


console.error(  
  "โหลดข้อมูลผู้ใช้ไม่ได้:",  
  error  
);  

loginButton.textContent =  
  "โปรไฟล์";  

loginButton.href =  
  "profile.html";  



}


});


// ===============================

// โหลดสถิติ

// ===============================


async function loadStats() {


try {


console.log(  
  "กำลังโหลดสถิติ StudyShare..."  
);  


// ===============================  
// นับหนังสือ + ชีท  
// ===============================  

const postsSnapshot =  
  await getDocs(  
    collection(db, "posts")  
  );  


let bookCount = 0;  
let noteCount = 0;  


postsSnapshot.forEach((post) => {  

  const data =  
    post.data();  


  if (data.type === "book") {  

    bookCount++;  

  }  


  if (data.type === "note") {  

    noteCount++;  

  }  

});  


// ===============================  
// นับสมาชิกจาก publicUsers  
// ===============================  

const publicUsersSnapshot =  
  await getDocs(  
    collection(db, "publicUsers")  
  );  


const userCount =  
  publicUsersSnapshot.size;  


// ===============================  
// แสดงผลบนหน้าเว็บ  
// ===============================  

const bookElement =  
  document.getElementById("bookCount");  

const noteElement =  
  document.getElementById("noteCount");  

const userElement =  
  document.getElementById("userCount");  


if (bookElement) {  

  bookElement.textContent =  
    bookCount;  

}  


if (noteElement) {  

  noteElement.textContent =  
    noteCount;  

}  


if (userElement) {  

  userElement.textContent =  
    userCount;  

}  


console.log(  
  "📚 หนังสือ:",  
  bookCount  
);  

console.log(  
  "📝 ชีท:",  
  noteCount  
);  

console.log(  
  "👤 สมาชิก:",  
  userCount  
);  



} catch (error) {


console.error(  
  "❌ โหลดสถิติไม่สำเร็จ:",  
  error  
);  



}


}


// ===============================

// เริ่มโหลดสถิติ

// ===============================


loadStats();


// ===============================

// ปี Footer

// ===============================


const year =

document.getElementById("year");


if (year) {


year.textContent =

new Date().getFullYear();


}

