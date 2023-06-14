

const cl = console.log ;
const postcontainer = document.getElementById('postcontainer'),
formconatiner =document.getElementById('formconatiner'),
titlecontrol =document.getElementById('title'),
submitbtn =document.getElementById("submitbtn"),
Updatebtn =document.getElementById('Updatebtn'),
contentcontrol =document.getElementById('content');

let baseUrl = `http://localhost:3000/posts`;





const templating = (arr)=>{
    let result ='';
    arr.forEach(ele => {
        result += 
        ` 
                <div class="card mb-4" id="${ele.id}">
                    <div class="card-header bg-dark text-white lead">
                        ${ele.title}
                    </div>
                    <div class="card-body  bg-light">
                        ${ele.content}
                    </div>
                    <div class="card-footer text-right lead  bg-dark">
                    <button class="btn btn-primary" onclick="onEdit(this)" >
                            Edited
                    </button>
                     <button class="btn btn-danger " onclick="onDelete(this)" >
                          Delete
                    </button>
                </div>
            </div>
        
        
        `
    });
    postcontainer.innerHTML =result 

}

const Makeapicall =(method ,url,body)=>{
    return new Promise((resolve, reject) => {
         let xhr =new XMLHttpRequest;
         xhr.open(method,url)
         xhr.setRequestHeader('Auth',"Bearer Token Form localStorage")
         xhr.setRequestHeader('Content-Type' ,"application/json")
         xhr.onload= function(){
            if(xhr.status === 200 || xhr.status === 201){
                resolve(xhr.response)
                cl(xhr.response)
            }else{
                reject(`Somthin Went Wrong !!!!!`)
            }
         }
         xhr.send(body)
     })
}
Makeapicall("GET" , baseUrl)
        .then(res =>{
            cl(res)
            templating(JSON.parse(res))
        })
        .catch(rej =>{
           cl(rej)
        })


const onposthandler =(eve) =>{
    eve.preventDefault()
    cl('I Am Here')
    let post ={
        title :titlecontrol.value,
        content: contentcontrol.value,
       
    }
    Makeapicall("POST" ,baseUrl,JSON.stringify(post))
     .then(res =>{
     cl(res)
     })
     .catcth(cl)
}
const onclikUpdate =(ele)=>{
    let updateid =localStorage.getItem('editId')
    cl(updateid)
    let updatetedid = `${baseUrl}/${updateid}`
    let o = {
        title :titlecontrol.value,
        content: contentcontrol.value
    }
    Makeapicall("PATCH" , updatetedid ,JSON.stringify(o))
    .then(cl)
    .catch(cl)
}

const onEdit = (ele) =>{
    let editid =ele.closest(".card").id;
    localStorage.setItem("editId", editid)
    let editUrl =`${baseUrl}/${editid}`

   Makeapicall("GET" , editUrl)
   .then(res =>{
    let data = JSON.parse(res)
    titlecontrol.value =data.title;
   contentcontrol.value =data.content;
   })
   .catch(rej =>{
    cl(rej)
   });
   Updatebtn.classList.remove('d-none')
   submitbtn.classList.add('d-none')
}
const onDelete =(e) =>{
    let Deleteid =e.closest(".card").id
    let deletedid =`${baseUrl}/${Deleteid}`
    Makeapicall("DELETE" ,deletedid)
     .then(cl)
     .catch(cl)
}
formconatiner.addEventListener("submit" , onposthandler);
Updatebtn.addEventListener('click' , onclikUpdate)
