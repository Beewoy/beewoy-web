(function(){
  "use strict";
  const menuButton=document.querySelector(".menu-toggle");
  const navigation=document.querySelector(".primary-nav");
  function setMenu(open){if(!menuButton||!navigation)return;menuButton.setAttribute("aria-expanded",String(open));menuButton.querySelector(".sr-only").textContent=open?"Zavrieť hlavné menu":"Otvoriť hlavné menu";navigation.classList.toggle("is-open",open);document.body.classList.toggle("menu-open",open)}
  if(menuButton&&navigation){menuButton.addEventListener("click",()=>setMenu(menuButton.getAttribute("aria-expanded")!=="true"));navigation.addEventListener("click",event=>{if(event.target.closest("a"))setMenu(false)});document.addEventListener("keydown",event=>{if(event.key==="Escape"&&menuButton.getAttribute("aria-expanded")==="true"){setMenu(false);menuButton.focus()}});window.addEventListener("resize",()=>{if(window.innerWidth>980)setMenu(false)})}

  const form=document.getElementById("inquiry-form");
  const status=document.getElementById("form-status");
  if(form&&status){
    const fields=Array.from(form.querySelectorAll("input, select, textarea"));
    function validateField(field){const valid=field.checkValidity()&&field.value.trim()!=="";field.setAttribute("aria-invalid",String(!valid));return valid}
    fields.forEach(field=>{field.addEventListener("blur",()=>validateField(field));field.addEventListener("input",()=>{if(field.getAttribute("aria-invalid")==="true")validateField(field)});field.addEventListener("change",()=>{if(field.getAttribute("aria-invalid")==="true")validateField(field)})});
    form.addEventListener("submit",event=>{
      event.preventDefault();const invalidFields=fields.filter(field=>!validateField(field));
      if(invalidFields.length){status.textContent="Skontrolujte, prosím, označené polia.";status.classList.add("is-error");invalidFields[0].focus();return}
      const data=new FormData(form);const subject="Dopyt z webu – "+data.get("service");const body=["Meno / firma: "+data.get("name"),"Telefón: "+data.get("phone"),"E-mail: "+data.get("email"),"Služba: "+data.get("service"),"","Požiadavka:",data.get("message")].join("\n");
      status.textContent="Otvárame pripravenú správu vo vašom e-mailovom programe.";status.classList.remove("is-error");window.location.href="mailto:jsservis@jsservis.sk?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body)
    })
  }
  const year=document.getElementById("current-year");if(year)year.textContent=String(new Date().getFullYear())
}());
