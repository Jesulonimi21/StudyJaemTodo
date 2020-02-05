let contractAddress="ct_ZnV3QMmxj5H34XTro9grHEPVGiHSjg2ag1TBN5dVtQ1ahk4hC"
let contractSource=`
contract TodoList=

    record state={
        users:map(address,list(string))
        }
    stateful entrypoint init()={users={}}

    stateful entrypoint initializeList()=
        let newList=[]
        put(state{users[Call.caller]=newList})        

    stateful entrypoint addTodo(todo':string)=
        let oldList=state.users[Call.caller]
        let newList= todo'::oldList
        put(state{users[Call.caller]=newList})
        
    entrypoint getTodo()=
        state.users[Call.caller]
`;
let client=null;
async function contractCall(functionName,args,amount){
  client=await Ae.Aepp();
let contract=await client.getContractInstance(contractSource,{contractAddress});
  let response= await contract.call(functionName,args,{amount:amount}).catch(err=>console.error(e));
  return response;
}

async function callStatic(functionName,args){
    client=await Ae.Aepp();
let contract=await client.getContractInstance(contractSource,{contractAddress});
let response= await contract.call(functionName,args).catch(err=>console.error(err));
let decodedResponse=await response.decode().catch(e=>console.error(e));

return decodedResponse;
}
 async function windowsLoaded(){
  console.log("windows loaded");
   let initializeList=contractCall('initializeList',[],0);
   await contractCall('firstTodo',[]);
   let result=await callStatic('getTodo',[]);
    console.log(result);
 }

 window.addEventListener('load',windowsLoaded);


document.getElementById("add-btn").addEventListener('click',function(){
let myInputValue=document.getElementById("my-input").value;
if(myInputValue.trim()===""){
  alert("youn must write something");
 
}else{
  createNewTodoItem(myInputValue);
}});

function removeItem(event){
  console.log(event);
  console.log(this.parentNode.parentNode);
  let myUl =this.parentNode.parentNode;


  myUl.removeChild(this.parentNode);

  
}

function createNewTodoItem(text){
let myUl=document.getElementById("my-ul");
let newItem=document.createElement('li');
newItem.innerText=text;

let myButton=document.createElement('button');
myButton.addEventListener('click',removeItem)

myButton.innerText="done"
newItem.appendChild(myButton);
myUl.appendChild(newItem);

console.log(text);

}