/*=========================================================
FILE : screenshots.js
MODULE : Screenshot Manager
VERSION : V3.1
=========================================================*/

/*=========================================================
SCREENSHOTS
=========================================================*/

async function uploadImage(file){

    const formData = new FormData();

    formData.append("image", file);

    const res = await fetch("/api/upload-image",{
        method:"POST",
        body:formData
    });

    const data = await res.json();

    if(!data.success){
        throw new Error(data.error);
    }

    return data.url;

}

function imageUpload(inputId,key,imageId){

const input=document.getElementById(inputId);

const img=document.getElementById(imageId);

const zone=input.closest(".drop-zone");

const removeBtn=zone.querySelector(".remove-image");

/* ---------- SAVE IMAGE ---------- */

function saveImage(file){

    if(!file) return;

   (async()=>{

    try{

        const imageUrl = await uploadImage(file);

        journal[currentDate].screenshots[key] = imageUrl;

        img.src = imageUrl;

        img.style.display = "block";

        img.style.pointerEvents = "auto";

        await saveDatabase();

    }catch(err){

        alert("Image upload failed!");

        console.error(err);

    }

})();

}

/* ---------- CHOOSE FILE ---------- */

input.addEventListener("change",()=>{

    if(input.files.length){

        saveImage(input.files[0]);

    }

});

/* ---------- CLICK EMPTY BOX ---------- */

zone.addEventListener("click",(e)=>{

    if(
        e.target===img ||
        e.target===removeBtn
    ){
        return;
    }

    input.click();

});

/* ---------- IMAGE FULL SCREEN ---------- */

img.addEventListener("click",(e)=>{

    e.preventDefault();

    e.stopPropagation();

    const image=journal[currentDate].screenshots[key];

    if(!image) return;

    const win=window.open();

    win.document.write(`
    <html>
    <head>
    <title>Chart</title>
    <style>
    body{
    margin:0;
    background:#000;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    }
    img{
    max-width:100%;
    max-height:100%;
    object-fit:contain;
    }
    </style>
    </head>
    <body>
    <img src="${image}">
    </body>
    </html>
    `);

});

/* ---------- DRAG ---------- */

zone.addEventListener("dragover",(e)=>{

    e.preventDefault();

    zone.classList.add("drag-over");

});

zone.addEventListener("dragleave",()=>{

    zone.classList.remove("drag-over");

});

zone.addEventListener("drop",(e)=>{

    e.preventDefault();

    zone.classList.remove("drag-over");

    const file=e.dataTransfer.files[0];

    if(file && file.type.startsWith("image/")){

        saveImage(file);

    }

});

/* ---------- CTRL + V ---------- */

zone.setAttribute("tabindex","0");

zone.addEventListener("paste",(e)=>{

    const items=e.clipboardData.items;

    for(const item of items){

        if(item.type.startsWith("image/")){

            saveImage(item.getAsFile());

            e.preventDefault();

            return;

        }

    }

});

/* ---------- DELETE ---------- */

removeBtn.addEventListener("click", async (e)=>{

    e.stopPropagation();

    try{

        const imageUrl = journal[currentDate].screenshots[key];

        if(imageUrl){

            await fetch("/api/delete-image",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    imageUrl
                })

            });

        }

        journal[currentDate].screenshots[key]="";

        img.src="";

        img.style.display="none";

        img.style.pointerEvents="none";

        input.value="";

        await saveDatabase();

    }catch(err){

        console.error(err);

        alert("Image delete failed!");

    }

});

} // imageUpload End

/* ---------- LOAD SCREENSHOTS ---------- */

function loadScreenshots(){

const map=[
["before","beforePreview"],
["after","afterPreview"],
["mistake","mistakePreview"]
];

map.forEach(([key,id])=>{

    const img=document.getElementById(id);

    const data=journal[currentDate].screenshots[key];

    if(data){

        img.src=data;
        img.style.display="block";
        img.style.pointerEvents="auto";

    }else{

        img.src="";
        img.style.display="none";
        img.style.pointerEvents="none";

    }

});

}

/* ---------- INIT ---------- */

imageUpload("beforeChart","before","beforePreview");
imageUpload("afterChart","after","afterPreview");
imageUpload("mistakeChart","mistake","mistakePreview");

