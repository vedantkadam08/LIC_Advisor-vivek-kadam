// Show main content after visitor info
document.getElementById('submitVisitor').addEventListener('click', function(){
    const name = document.getElementById('visitorName').value.trim();
    const phone = document.getElementById('visitorPhone').value.trim();
    const phoneRegex = /^[6-9]\d{9}$/; // Valid Indian phone number
    if(!name || !phone){
        alert("Please enter your Name and Phone Number.");
        return;
    }
    if(!phoneRegex.test(phone)){
        alert("Please enter a valid 10-digit Indian phone number.");
        return;
    }
    localStorage.setItem('visitorName', name);
    localStorage.setItem('visitorPhone', phone);
    document.getElementById('visitorInfo').style.display='none';
    document.getElementById('mainContent').style.display='block';
});

// Language toggle
document.getElementById('langToggle').addEventListener('change', function(){
    const lang = this.value;
    if(lang === 'marathi') translateToMarathi();
    else translateToEnglish();
});

function translateToMarathi(){
    document.querySelector('#about h2').innerText = "वेदांत कन्सल्टन्सी बद्दल";
    document.querySelector('#about p:nth-of-type(1)').innerHTML = "<strong>नाव:</strong> विवेक सर";
    document.querySelector('#about p:nth-of-type(2)').innerHTML = "<strong>अनुभव:</strong> 26 वर्षे (1999–2025)";
    document.querySelector('#about p:nth-of-type(3)').innerText = "ज्या गोष्टी महत्त्वाच्या आहेत त्या संरक्षित करण्यासाठी वैयक्तिकृत विमा उपाय प्रदान करणे.";
    document.querySelector('#plans h2').innerText = "उपलब्ध LIC योजना";
    document.querySelector('#planSearch').placeholder = "योजनेचे नाव किंवा कीवर्ड शोधा...";
    document.querySelector('#reviews h2').innerText = "ग्राहक काय म्हणतात";
    document.querySelector('#contact h2').innerText = "संपर्क करा";
    document.querySelector('#book h2').innerText = "मीटिंग बुक करा";
    document.querySelector('#book p').innerText = "खालील बटणावर क्लिक करून आपल्या तपशीलांसह WhatsApp वर Vivek Sir ला संदेश पाठवा:";
    document.getElementById('bookWhatsApp').innerText = "💬 WhatsApp वर बुक करा";
}

function translateToEnglish(){
    document.querySelector('#about h2').innerText = "About Vedant Consultancy";
    document.querySelector('#about p:nth-of-type(1)').innerHTML = "<strong>Name:</strong> Vivek Sir";
    document.querySelector('#about p:nth-of-type(2)').innerHTML = "<strong>Experience:</strong> 26 Years (1999–2025)";
    document.querySelector('#about p:nth-of-type(3)').innerText = "Providing personalized insurance solutions to protect what matters most.";
    document.querySelector('#plans h2').innerText = "Available LIC Plans";
    document.querySelector('#planSearch').placeholder = "Search plan name or keyword...";
    document.querySelector('#reviews h2').innerText = "Clients Say";
    document.querySelector('#contact h2').innerText = "Contact Me";
    document.querySelector('#book h2').innerText = "Book a Meeting";
    document.querySelector('#book p').innerText = "Click the button below to send your details via WhatsApp to Vivek Sir:";
    document.getElementById('bookWhatsApp').innerText = "💬 Book via WhatsApp";
}

// Plan Search
document.getElementById('planSearch').addEventListener('input', function(){
    const q = this.value.trim().toLowerCase();
    document.querySelectorAll('#planTable tbody tr').forEach(tr=>{
        tr.style.display = (q === '' || tr.innerText.toLowerCase().includes(q)) ? '' : 'none';
    });
});

// PDF Download
document.getElementById('pdfBtn').addEventListener('click', function(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({unit:'pt',format:'a4'});
    doc.setFontSize(14); doc.setTextColor(20,40,80);
    doc.text('LIC Plans - Vedant Consultancy', 40, 40);
    const rows = [];
    document.querySelectorAll('#planTable tbody tr').forEach(tr=>{
        if(tr.style.display==='none') return;
        const cols = tr.querySelectorAll('td');
        rows.push([cols[0].innerText, cols[1].innerText, cols[2].innerText]);
    });
    doc.autoTable({head:[['Plan Name','Type','Brief']], body:rows, startY:70, styles:{fontSize:10,cellPadding:6}, headStyles:{fillColor:[0,74,173]}});
    doc.save('LIC_Plans_Vedant_Consultancy.pdf');
});

// WhatsApp Meeting Button
document.getElementById('bookWhatsApp').addEventListener('click', function(){
    const name = localStorage.getItem('visitorName') || 'Visitor';
    const phone = localStorage.getItem('visitorPhone') || '';
    const msg = `Hello Vivek Sir, this is ${name} (${phone}). I want to book a meeting.`;
    const url = `https://api.whatsapp.com/send?phone=+919664999797&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
});

// Chatbot Toggle
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotWindow = document.getElementById('chatbotWindow');
chatbotBtn.addEventListener('click', ()=>{ 
  chatbotWindow.style.display = chatbotWindow.style.display==='block'?'none':'block';
});

// Simple Chatbot Logic
const chatbotInput = document.getElementById('chatbotInput');
const chatbotBody = document.getElementById('chatbotBody');
chatbotInput.addEventListener('keypress', function(e){
  if(e.key==='Enter' && this.value.trim()!==''){
    const text = this.value.trim();
    const name = localStorage.getItem('visitorName') || 'Visitor';
    appendMsg('user', text);
    this.value='';
    // simple fallback response
    setTimeout(()=>appendMsg('bot', `Sorry ${name}, I didn't understand. Please contact via WhatsApp.`), 500);
  }
});
function appendMsg(who, text){
  const el = document.createElement('div');
  el.className = who==='user'?'msg-user':'msg-bot';
  el.textContent = text;
  chatbotBody.appendChild(el);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}
