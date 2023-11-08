
const chatContainer = document.getElementById("chat-container");
const elements = {
    messageInput: message_form.querySelector('input[name="Message"]'),
    message_btn: message_form.querySelector('input[type="submit"]'),
}
elements.message_btn.addEventListener('click', on_SendMessage);
async function on_SendMessage(e) {
    try {
        if (e.target && message_form.checkValidity()) {
            e.preventDefault();
            const data = {
                message: elements.messageInput.value
            }
            await axios.post('user/post-message', data);
            message_form.reset();
            refresh();

        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }

}

function showOnScreen(chatHistory, userId) {
    chat_body.innerHTNL = "";
    let messageText = "";
    chatHistory.forEach((ele) => {
        const date = new Date(ele.date_time);
        const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        if (ele.userId == userId) {
            messageText += `
            <div class="row">
                <div class="col-9 col-lg-10 text-warning">
                    <strong>Me:</strong> ${ele.message}
                </div>
                <div class="col-3 col-lg-2 text-end text-muted">
                    <sub>${formattedTime}</sub>
                </div>
            </div>`
        } else {
            messageText += `
            <div class="row">
                <div class="col-9 col-lg-10">
                    <strong>${ele.name}:</strong> ${ele.message}
                </div>
                <div class="col-3 col-lg-2 text-end text-muted">
                    <sub>${formattedTime}</sub>
                </div>
            </div>`
        }

    })
    chat_body.innerHTML = messageText;
}

async function refresh() {
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
        showOnScreen(savingChats,userId)  
        chatContainer.scrollTop = chatContainer.scrollHeight;

    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        // window.location = '/';
    }
}
refresh();