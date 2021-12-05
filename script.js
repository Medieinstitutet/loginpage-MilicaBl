//Koppla til header, main, footer
let header=document.getElementById("header");
let main=document.getElementById("main");
let footer=document.getElementById("footer");

//Text till footern
let footerText=document.createElement("p");
footerText.innerText="Tack för att du besöker vår sida!";
footerText.id="footerText";
footer.append(footerText);

//Vår "Logo"
let logo=document.createElement("h1");
logo.innerText="Bästa sidan";
logo.id="logo";


//Fyra olika main innehåll
let mainInloggad=document.createElement("p");
mainInloggad.innerText="Välkommen till Bästa sidan!";
let mainEjInloggad=document.createElement("p");
mainEjInloggad.innerText="Välkommen! Vänligen logga in!";
let mainFel=document.createElement("p");
mainFel.innerText="Du har skrivit fel namn eller lösenord! Försök igen!";
mainFel.style.color="red";
let mainNew=document.createElement("p");
mainNew.innerText="Grattis! Nu är du registrerad. Vänligen logga in!"
let failed=document.createElement("p");
failed.innerText="Du måste fylla i både namn och lösenord!";
failed.style.color="red";
failed.className="mainText";
mainNew.className="mainText";
mainEjInloggad.className="mainText";
mainFel.className="mainText";
mainInloggad.className="mainText";

//Skapa inloggnings formulär
let loginText=document.createElement("p");
loginText.innerText="Har du ett konto? Logga in!";

let nameInput=document.createElement("input");
nameInput.setAttribute("type","text");
nameInput.setAttribute("placeholder","namn");

let keyInput=document.createElement("input");
keyInput.setAttribute("type","text");
keyInput.setAttribute("placeholder","lösenord");

let loginBtn=document.createElement("button");
loginBtn.innerHTML="Logga in";

//Skapa konto formulär
let makeAccountText=document.createElement("p");
makeAccountText.innerText="Inte registrerad? Skapa konto!";

let newNameInput=document.createElement("input");
newNameInput.setAttribute("type","text");
newNameInput.setAttribute("placeholder","namn");

let newKeyInput=document.createElement("input");
newKeyInput.setAttribute("type","text");
newKeyInput.setAttribute("placeholder","lösenord");

let saveBtn=document.createElement("button");
saveBtn.innerHTML="Skapa konto";

//Logga ut knapp
let logoutBtn=document.createElement("button");
logoutBtn.innerHTML="Logga ut";

//Välkommen användaren text
let welcomeUser=document.createElement("p");
welcomeUser.className="welcomeUser";

//Vad som visas om man inte är inloggad
function ejInloggad(){
    header.innerHTML="";
    main.innerHTML="";
    main.append(mainEjInloggad);
    header.append(logo);
    header.append(loginText, nameInput, keyInput, loginBtn);
    header.append(makeAccountText, newNameInput, newKeyInput, saveBtn);
}
//Vad som visas när man är inloggad
function inloggad(){
    main.innerHTML="";
    header.innerHTML="";
    main.append(mainInloggad);
    header.append(logo, logoutBtn);
}
//Vad som visas när man skriver fel namn eller lösenord
function fel(){
    header.innerHTML="";
    main.innerHTML="";
    main.append(mainFel);
    header.append(logo);
    header.append(loginText, nameInput, keyInput, loginBtn);
    header.append(makeAccountText, newNameInput, newKeyInput, saveBtn);
}

//Skapa en array med objekt
let accounts=[
    {
    name:"janne",
    password:"test"
    },{
    name:"lena", 
    password:"jagtestar"
    },{
    name:"erik",
    password:"erikerik"
    }
];
//Spara listan i local storage

saveBtn.addEventListener("click",(newUserList));
//Funktion som lägger till ny användare
function newUserList(){
    let newUser={
        name:newNameInput.value,
        password:newKeyInput.value
    }
    let newList=localStorage.getItem("accounts");
    
    if(newList){
    accounts=JSON.parse(newList);
    }
    
    accounts.push(newUser);
    
    localStorage.setItem("accounts",JSON.stringify(accounts));

    //Sida som visas endast när ny användare skapas
    main.innerHTML="";
    if(newNameInput.value && newKeyInput.value){
    main.append(mainNew);
    }
    else{
        main.append(failed);
    }
}

loginBtn.addEventListener("click",(login))
//Inloggningen
function login (){
    let listNow=localStorage.getItem("accounts")
    if(listNow){
        accounts=JSON.parse(listNow);
    }
    //Spara input värde
    var inputName=nameInput.value;
    var inputPassword=keyInput.value;
    //Kolla om inputet stämmer med någon av våra users
    let validUser=accounts.find(attr =>{
        return(attr.name==inputName && attr.password==inputPassword);
    })
    //Om det finns objekt visa inloggningssida och spara objektet i localstorage
    if(validUser){
        inloggad();
        localStorage.setItem("inloggad",JSON.stringify(validUser));
        window.location.reload();
    }else{
        fel();
    }
}  
//När man klickar på logga ut ska objektet tas bort från ls("inloggad") och ej inloggad sidan ska visas
logoutBtn.addEventListener("click",()=>{
    ejInloggad();
    localStorage.removeItem("inloggad");
})
//Detta är vad som händer om vi har någon sparad i ls("inloggad")
if(localStorage.getItem("inloggad")){
    inloggad();
    //Spara namnet från inloggade personen och visa i main
    let userName=(localStorage.getItem("inloggad"));
     if (userName){
         userName=JSON.parse(userName);
         welcomeUser.innerText="Hej "+ userName.name+" !";
         main.append(welcomeUser);
       }   
}else{
    ejInloggad();
}
