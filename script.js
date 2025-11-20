
console.log('Website loaded');
// Visitor info form submission
document.getElementById('submitVisitor').addEventListener('click', function(){
  const name = document.getElementById('visitorName').value.trim();
  const phone = document.getElementById('visitorPhone').value.trim();
  const phonePattern = /^[0-9]{10}$/;
  
  // Basic validation
  if(!name || !phone){
    alert("Please enter your Name and Phone");
    return;
  }
  
  if(!phonePattern.test(phone)){
    alert("Please enter a valid 10-digit phone number");
    return;
  }
  
  // Store the visitor info in localStorage
  localStorage.setItem('visitorName', name);
  localStorage.setItem('visitorPhone', phone);

  // Hide the visitor info form and show the main content
  document.getElementById('visitorInfo').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
});
