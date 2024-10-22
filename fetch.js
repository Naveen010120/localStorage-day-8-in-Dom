let btn=document.getElementById('btn');
let output=document.getElementById('para');
let electronics=document.getElementById('categoryE');
let mens=document.getElementById('categoryM');


btn.addEventListener('click',async()=>{
 let res=await fetch("https://fakestoreapi.com/products");
 let data=await res.json();
 alert("data is fetched");
 localStorage.setItem("fakeStore",JSON.stringify(data));
 displayWindow(data);

})
//elctronics items
electronics.onclick=()=>{
    let storedData=JSON.parse(localStorage.getItem("fakeStore"))||[];
    if(storedData==0)
    output.innerHTML="no data to fetech.."
    else
    filterFunction(storedData)
}
function filterFunction(storeData){
   let filterData= storeData.filter(ele=>ele["category"]=="electronics")
    displayWindow(filterData);
}
//men's cloth
mens.onclick=()=>{
    let storedData=JSON.parse(localStorage.getItem("fakeStore"))||[];
    if(storedData==0){
        output.innerHTML="no data is present to fetch"
    }else{
        menFilterFunction(storedData);
    }
}
function menFilterFunction(data){
    let filterData=data.filter(ele=>ele["category"]=="men's clothing");
    displayWindow(filterData);
}

//display function
function displayWindow(data){
    output.innerHTML=""
    data.forEach((ele,index)=>{
        let div=document.createElement('div');
        div.className="container"
        div.innerHTML=
        `<p><b>id:</b>${ele["id"]}</p>
        <p><b>title:</b>${ele["title"]}</p>
        <p><b>price:</b>${ele["price"]}</p>
        <p><b>description:</b>${ele["description"]}</p>
        <p><b>category:</b>${ele["category"]}</p>
        `
        // if(ele=="image"){
        //     let image=document.createElement('img');
        //     image.src=ele["image"];
        //     div.append(img);
        // }
        let button=document.createElement('button');
        button.innerHTML='Delete';
        button.onclick=()=>{
         deleteFunction(index);
        }
        
        div.append(button);
        output.append(div);
    })
}
function deleteFunction(index){
    let stored=JSON.parse(localStorage.getItem("fakeStore"));
    stored.splice(index,1);
    localStorage.setItem("fakeStore",JSON.stringify(stored));
    displayWindow(stored)

}
window.onload=()=>{
    let stored=JSON.parse(localStorage.getItem("fakeStore"))||[];
    if(stored.length==0){
        output.innerHTML="data not available"
    }else{
        displayWindow(stored);
    }
}