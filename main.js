
var newAnimeBtn=document.getElementById("new-anime-btn");
var newAnimeForm=document.getElementById("new-anime-form");
var newAnimeTitle=document.getElementById("new-anime-title");
var newAnimeAuthor=document.getElementById("new-anime-author");
var newAnimeYear=document.getElementById("new-anime-year");
var newAnimeCategory=document.getElementById("new-anime-category");
var addAnimeBtn=document.getElementById("add-anime-btn");
var errorMessageDiv=document.getElementById("error-message");
var animeList=document.getElementById("anime-list");
var intro=document.getElementById("intro");
var text="With this app you can create a list of animes. Click 'New anime 'to create a new anime, then fill the form with animes information (title, author, year and category). The  new anime will be display on the list.If  you want to know more information about an anime, just click the circle icon on the right side . To remove an anime just click the red cross ";

var pos=-1;
var t=setInterval(moveText,150);
function moveText(){
    pos++;
    intro.innerHTML+=text.charAt(pos);
if(pos==text.length){
        clearInterval(t);
        intro.innerHTML="";
    }
}

class Anime{
    constructor(title,author,year,category){
        this.title=title;
        this.author=author;
        this.year=year;
        this.category=category;
    }
}

if(localStorage.getItem("animes") !=null){
    showAnimeList()
}

//display the anime list
function showAnimeList(){
    //fetch data from localestorage
    var animes=JSON.parse(localStorage.getItem("animes"));
    //the data is an array of animes object
    for(var i=0; i<animes.length;i++){
        createListItem(animes[i])
    }
}

newAnimeBtn.addEventListener('click',function(){
    if(newAnimeForm.style.display==="block"){
        newAnimeForm.style.display="none";
        newAnimeBtn.textContent="New Anime";
        newAnimeBtn.setAttribute('class','newAnimeButn');
        resetForm();
    }else{
        newAnimeForm.style.display="block";
        newAnimeBtn.textContent="Cancel";
        newAnimeBtn.setAttribute('class',"cancel-btn");
        resetForm();
    }
    
});

// resetting form values
function resetForm(){
    newAnimeTitle.value = '';
    newAnimeAuthor.value = '';
    newAnimeYear.value = '';
    newAnimeCategory.value = '';
    errorMessageDiv.textContent = '';
}
//validate form and save anime
addAnimeBtn.addEventListener('click',function(e){
    var errorMessage="";
    var invalidFields="";

    if(newAnimeTitle.value==""){
        invalidFields+="<p> The anime title is missing!</p>"
    }
    if(newAnimeAuthor.value==""){
        invalidFields+="<p> The anime's Author is missing!</p>"
    }
    if(newAnimeYear.value==""){
        invalidFields+="<p>The publication year of the anime is missing!</p>"
    }else if(newAnimeYear.value !="" && isNaN(newAnimeYear.value)){
        invalidFields+="<p> The year inputed is not a number! Try to fix it.</p>"
    }else if(newAnimeYear.value!="" && isNaN(newAnimeYear.value) && Number(newAnimeYear.value) < 1900 || Number(newAnimeYear.value) >2021){
        invalidFields+="<p>Invalid Year value!</p>"
    }
    
    if(newAnimeCategory.value==""){
        invalidFields+="<p> The category is missing!</p>"
    }

    if(invalidFields!=""){
       errorMessage+=invalidFields;
    }

    if(errorMessage===""){
        saveAnime();
        newAnimeForm.style.display="none";
        newAnimeBtn.textContent="New Anime";
        newAnimeBtn.setAttribute('class','newAnimeBtn');
    }else{
        errorMessageDiv.innerHTML=errorMessage;
    }
    e.preventDefault();
});

//Create new anime object and save it to localeStorage

function saveAnime(){
    var title=newAnimeTitle.value;
    var author=newAnimeAuthor.value;
    var year=newAnimeYear.value;
    var category=newAnimeCategory.options[newAnimeCategory.selectedIndex].text;

    // Create new anime object with those value
    
   var  newAnime= new Anime(title,author,year,category);

    //verify if the localestorage animes has  data
    if(localStorage.getItem("animes")==="null"){
        var animes=[];
        animes.push(newAnime);
        localStorage.setItem('animes',JSON.stringify(animes));
    }else{
        //otherwise add a new anime object to the existing dats
        var animes=JSON.parse(localStorage.getItem("animes"));
        animes.push(newAnime);
        localStorage.setItem('animes',JSON.stringify(animes));
    }
    createListItem(newAnime);
}

function createListItem(anime){
    var listItem=document.createElement("li");
    listItem.setAttribute('class','anime-item');
    var div1=document.createElement("div");
    div1.setAttribute('class','anime-item-content');
    var p=document.createElement('p');
    p.setAttribute('class','anime-item-text');
    p.textContent=anime.author+',';
    var it=document.createElement('i');
    it.textContent=anime.title;
    var div2=document.createElement('div');
    div2.setAttribute('class','anime-item-buttons');

    var button1=document.createElement('button');
    button1.setAttribute('class','details-btn');
    button1.innerHTML='<i class="fas fa-info"></i>';

    var button2=document.createElement('button');
    button2.setAttribute('class','remove-btn');
    button2.innerHTML='<i class="fas fa-times"></i>';

    var ul=document.createElement('ul');
    ul.setAttribute('class','anime-item-details');
    ul.style.display='none';

    var li1=document.createElement('li');
    li1.innerHTML='<b>Year: </b>'+anime.year;

    var li2=document.createElement('li');
    li2.innerHTML="<b>Category: </b>"+anime.category;

    div2.appendChild(button1);
    div2.appendChild(button2);
    p.appendChild(it);

    div1.appendChild(p);
    div1.appendChild(div2);

    ul.appendChild(li1);
    ul.appendChild(li2);

    listItem.appendChild(div1);
    listItem.appendChild(ul);

    animeList.insertBefore(listItem,animeList.firstChild);

    // 
    button1.addEventListener('click',function(){
        if(ul.style.display==="none"){
            ul.style.display='block';
        }else{
            ul.style.display='none';
        }
    });

    button2.addEventListener('click',function(){
        animeList.removeChild(listItem);
        removeAnime(anime);
    })

    //remove anime list from the localeStorage

    function removeAnime(anime){
        var animes=JSON.parse(localStorage.getItem(animes));

        if(animes.length==10){
            localStorage.removeItem(animes)
        }
    }

}



