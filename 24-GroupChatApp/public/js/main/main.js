$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
  });


const chatContainer = document.getElementById("chat-container");
const elements = {
    messageInput: message_form.querySelector('input[name="Message"]'),
    message_btn: message_form.querySelector('input[type="submit"]'),
}
elements.message_btn.addEventListener('click', on_SendMessage);
create_groupBtn.addEventListener('click',showingAllUser)
search_bar.addEventListener('keyup',searchUser);
create_group_Submibtn.addEventListener('click',createGroup)
group_body.addEventListener('click',showGroupChat)

function showChatOnScreen(chatHistory, userId) {
    chat_body.innerHTNL = "";
    let messageText = "";
    chatHistory.forEach((ele) => {
        const date = new Date(ele.date_time);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = date.toLocaleString('en-US', options);
        
        if (ele.userId == userId) {
            messageText += `                            
        <div class="col-12 mb-2 pe-0">
            <div class="card p-2 float-end rounded-4 self-chat-class">
                <p class="text-primary my-0"><small>${ele.name}</small></p>
                <p class="my-0">${ele.message}</p>
                <small class="text-muted text-end">${formattedDate}</small>
            </div>
        </div>`
        } else {
            messageText += `                            
        <div class="col-12 mb-2 pe-0">
            <div class="card p-2 float-start rounded-4 chat-class">
                <p class="text-danger my-0"><small>${ele.name}</small></p>
                <p class="my-0">${ele.message}</p>
                <small class="text-muted">${formattedDate}</small>
            </div>
        </div>`
        }

    })
    chat_body.innerHTML = messageText;
}
function searchUser(e){
    const text= e.target.value.toLowerCase();
    const items=user_list.querySelectorAll('li');
    const usersArr=Array.from(items);
    usersArr.forEach(blockdisplay);
    function blockdisplay(value){
       const userName=value.querySelector('h6').textContent;
       if(userName.toLowerCase().indexOf(text)!=-1){
        value.classList.add('d-flex');
        value.style.display='block';
       }
       else{
        value.classList.remove('d-flex');
        value.style.display='none';
       }
    }
}
async function ShowGroup(){
    try {
        const groupsResponse = await axios(`user/get-mygroups`);
        const {groups} = groupsResponse.data;
        group_body.innerHTML=`
        <button class="list-group-item list-group-item-action py-2" 
            data-bs-toggle="list">
            <div class="d-flex w-100 align-items-center justify-content-between" id="0">
                <img src="https://picsum.photos/seed/common/200" alt="Profile Picture" class="rounded-circle"
                    style="width: 50px; height: 50px;">
                <strong class="mb-1">Common-group</strong>
                <small>All Members</small>
            </div>
        </button>
        `
        let html="";
        groups.forEach((ele)=>{
            const date = new Date(ele.date);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDate = date.toLocaleString('en-US', options);
            html+=`               
        <button class="list-group-item list-group-item-action py-2" 
            data-bs-toggle="list">
            <div class="d-flex w-100 align-items-center justify-content-between" id="${ele.id}">
                <img src="https://picsum.photos/seed/${ele.id}/200" alt="Profile Picture" class="rounded-circle"
                    style="width: 50px; height: 50px;">
                <strong class="mb-1">${ele.name}</strong>
                <small>${ele.membersNo} Members</small>
            </div>
        </button>`
        })
        group_body.innerHTML+=html;
        
    } catch (error) {
        console.log(error);
    }
    }
async function on_SendMessage(e) {
    try {
        if (e.target && message_form.checkValidity()) {
            e.preventDefault();
            const groupId= e.target.id;
            const data = {
                message: elements.messageInput.value,
                GroupId: groupId
            }
            await axios.post('user/post-message', data);
            message_form.reset();
            if(groupId==0){
                ShowCommonChats();

            }else{
                const APIresponse = await axios(`user/get-group-messages?groupId=${groupId}`);
                const apiChats = APIresponse.data.chats
                const getUserResponse = await axios.get('/user/get-user');
                const userId = getUserResponse.data.userId  
                showChatOnScreen(apiChats,userId) 
            }


        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }

}

async function ShowCommonChats() {
    try {
        let savingChats
        const chats = localStorage.getItem('chatHistory');
        if(chats){
            const parsedChatHistory = JSON.parse(chats);
            const lastMessageId = parsedChatHistory[parsedChatHistory.length-1].messageId;
            const APIresponse = await axios(`user/get-messages?lastMessageId=${lastMessageId}`);
            const apiChats = APIresponse.data.chats
            const mergedChats = [...parsedChatHistory, ...apiChats];
            savingChats = mergedChats.slice(-1000);
        }else{
            const APIresponse = await axios(`user/get-messages?lastMessageId=0`);
            const apiChats = APIresponse.data.chats
            savingChats = apiChats.slice(-1000);
        }  
        const getUserResponse = await axios.get('/user/get-user');
        const userId = getUserResponse.data.userId   
        localStorage.setItem("chatHistory",JSON.stringify(savingChats));
        showChatOnScreen(savingChats,userId)  
        chatContainer.scrollTop = chatContainer.scrollHeight;

    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        window.location = '/';
    }
}
async function showingAllUser(){
    try {
        user_list.parentElement.classList.remove('d-none');
        const usersResponse = await axios.get('user/get-users');
        user_list.innerHTML="";
        let text=""
        const {users} = usersResponse.data;
        users.forEach((user)=>{
            text += `                                    
        <li class="list-group-item  d-flex  justify-content-between">
            <div class="d-flex  align-items-center justify-content-between">
                <img src="https://picsum.photos/seed/${user.imageUrl}/200" alt="Profile Picture"
                    class="rounded-circle me-3" style="width: 35px; height: 35px;">
                <h6><strong class="mb-1">${user.name}</strong></h6>
            </div>
            <input type="checkbox" class="form-check-inline" name="users" value="${user.id}">
        </li>`
        })
        user_list.innerHTML = text;

        
    } catch (error) {
        console.log(error);
        alert(error.response.data.message);   
    }
}

async function createGroup(e){
    try {
        if(create_group_form.checkValidity()){
            console.log("success");
            e.preventDefault();
            const groupName = create_group_form.querySelector('#group_name').value;
            const selectedUsers = Array.from(user_list.querySelectorAll('input[name="users"]:checked'))
            .map(checkbox => checkbox.value);
            const data = {
              name:groupName,
              membersNo:selectedUsers.length+1,
              membersIds:selectedUsers
            }
            await axios.post('user/create-group',data);
            create_group_form.reset();
            alert("Group successfully created")
            $('#create_group_model').modal('hide');
            ShowGroup();
        }else{
            alert('fill all details ')
        }
        
    } catch (error) {
        console.log(error);
        alert(error.response.data.message); 
    }
}

async function showGroupChat(e) {
    try {
        const groupId = e.target.id 
        if(groupId){
            setupGroup(groupId)
            if(groupId==0){
                ShowCommonChats();
            }else{
                const APIresponse = await axios(`user/get-group-messages?groupId=${groupId}`);
                const apiChats = APIresponse.data.chats
                const getUserResponse = await axios.get('/user/get-user');
                const userId = getUserResponse.data.userId  
                showChatOnScreen(apiChats,userId) 
            }
 
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }else{
            console.log("no group id");
        }

    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        // window.location = '/';
    }
}

async function setupGroup(groupId){
    try {
        if(groupId==0){
            group_img.src = `https://picsum.photos/seed/common/200`;
            group_heading.innerHTML= `Common Group`;
            group_members.innerHTML=` All Members`;
            elements.message_btn.id = groupId;

        }else{
            const APIresponse = await axios(`user/get-group?groupId=${groupId}`);
            const {group} = APIresponse.data;
            group_img.src = `https://picsum.photos/seed/${groupId}/200`;
            group_heading.innerHTML= `${group.name}`;
            group_members.innerHTML=` ${group.membersNo} Members`;
            const memberApi = await axios(`user/get-group-members?groupId=${groupId}`);
            const {users} = memberApi.data;
            const usersString = users.map(item => item.name.trim()).join(',');
            group_members.setAttribute("data-bs-original-title", `${usersString}`);
            elements.message_btn.id = groupId
        }

        
    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }
}
ShowGroup();
ShowCommonChats();

