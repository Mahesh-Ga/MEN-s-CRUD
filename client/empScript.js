var emps;
var refTotable = document.getElementById("tableBody");

function fetchData() {
    var hepler = new XMLHttpRequest();

    hepler.onreadystatechange = () => {
        if (hepler.readyState == 4 && hepler.status == 200) {
            emps = JSON.parse(hepler.responseText);

            emps.map((i) => {
                refTotable.innerHTML +=
                    `
                        <td>${i.id}</td>
                        <td>${i.name}</td>   
                        <td>${i.dept}</td>
                        <td>
                        <center><button type="button" class="btn btn-danger" onclick= deleteRow(${i.id})>Delete</button>
                        <button type="button" class="btn btn-outline-info" onclick=edit(${i.id})>Edit</button></center>
                        </td>
                    `
            });
        }
    }
    hepler.open("GET", "http://127.0.0.1:9999/employees");
    hepler.send();
}

function addData(){
    var hepler = new XMLHttpRequest();
    var id = document.getElementById("inputId");
    var name = document.getElementById("inputName");
    var dept = document.getElementById("inputDepartment")
    var a = document.getElementById("aID");

    var JSONdata = {
        "id" : id.value,
        "name" : name.value,
        "dept" : dept.value
    }

    hepler.onreadystatechange = () =>{
        if(hepler.readyState == 4 && hepler.status == 200){
            var r = JSON.parse(hepler.responseText);
            if(r.affectedRows > 0){
                a.style.display = "block";
                a.innerText = "Inserted Successfully ...";
                refTotable.innerText = "";
                fetchData();
            }
            else{
                a.style.display = "block";
                a.innerText = "Something went wrong ...";
            }
            setTimeout(()=>{
                a.style.display = "none";
            },1000);
        } 
    };
    hepler.open("POST","http://127.0.0.1:9999/employees");
    hepler.setRequestHeader("Content-Type","application/json");
    hepler.send(JSON.stringify(JSONdata));
}

function deleteRow(id){
    var hepler = new XMLHttpRequest();
    var a = document.getElementById("aID");

    hepler.onreadystatechange = () =>{
        if(hepler.readyState == 4 && hepler.status == 200){
            var r = JSON.parse(hepler.responseText);
            if(r.affectedRows > 0 && r.affectedRows != undefined){
                a.style.display = "block";
                a.innerText = "Deleted Successfully ...";
                refTotable.innerText = "";
                fetchData();
            }
            else{
                a.style.display = "block";
                    a.innerText = "Something went wrong ...";
            }
            setTimeout(()=>{
                a.style.display = "none";
            },1000);
        } 
    }

    hepler.open("DELETE", "http://127.0.0.1:9999/employees/" + id);
    hepler.send();
}
 function edit(id){
    var i = document.getElementById("inputId");
    var name = document.getElementById("inputName");
    var dept = document.getElementById("inputDepartment");
    var addbtn = document.getElementById("addBtn");
    i.placeholder =  `${id}`;
    name.placeholder =  `Enter updated name`;
    dept.placeholder =  `Enter updated department`;
    i.disabled = "true";
    addbtn.disabled = "true";
}

function Upd(){
    var name = document.getElementById("inputName");
    var dept = document.getElementById("inputDepartment")
    var a = document.getElementById("aID");
    var i = document.getElementById("inputId");
    var addbtn = document.getElementById("addBtn");

    var JSONData = {
        "name" : name.value,
        "dept" : dept.value
     }   

    var hepler = new XMLHttpRequest();
  
    hepler.onreadystatechange = () => {
        if(hepler.readyState == 4 && hepler.status == 200){
            var d = JSON.parse(hepler.responseText);
            if(d.affectedRows > 0){
                a.style.display = "block";
                a.innerText = "Updated Successfully ...";
                refTotable.innerText = "";
                fetchData();
          
            }
            else{
                a.style.display = "block";
                a.innerText = "Something went wrong ...";
            }
            setTimeout(()=>{
                a.style.display = "none";
                i.disabled = false;
                i.placeholder ="Enter ID";
                name.value="";
                name.placeholder="Enter Name";
                dept.placeholder="Enter Dept.";
                dept.value="";
                addbtn.disabled = false;
            },1000);
        }
    }
    hepler.open("PUT","http://127.0.0.1:9999/employees/" + i.placeholder);
    hepler.setRequestHeader("Content-Type","application/json");
    hepler.send(JSON.stringify(JSONData));
}