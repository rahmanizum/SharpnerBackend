const slotPlaceholder = document.querySelector('#slotPlaceholder');
const detailsPlaceholder = document.querySelector('#detailsPlaceholder');

function showSlots(response) {
    slotPlaceholder.innerHTML = "";
    response.data.forEach(ele => {
        const currentDate = new Date(`2000-01-01T${ele.time}`);        
        const formattedTime = currentDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
        if(ele.noOfslot>0){
            const htmlText = ` 
            <div class="col-md-8 mb-2">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center m-2">
                            <p>${formattedTime}</p>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#schedule-form${ele.id}"><span class="text-success">${ele.noOfslot} Slots Available</span></button>
                        </div>
                    </div>
                </div>
            </div>
                `;
                    slotPlaceholder.innerHTML += htmlText;
        }



    })
}
function showmeetings(response) {
    detailsPlaceholder.innerHTML = "";
    response.data.forEach(ele => {
        const currentDate = new Date(`2000-01-01T${ele.Slot.time}`);        
        const formattedTime = currentDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
        const htmltext = `           
    <div class="col-md-4 col-lg-3 mb-4">
      <div class="card">
          <div class="card-header bg-warning text-center">
              <h4>Hi ${ele.Name}</h4>
          </div>
          <div class="card-body meeting">
              <div class="text-center m-2">
                  <p class="fs-5">
                  Please Join the meeting via 
                  this <a href="https://meet.google.com/abc-defg-hij">Join Google Meet</a> at ${formattedTime}
                  using </p>
                  <p class="fs-5"><a href="mailto:${ele.emailId}">${ele.emailId}</a></p>
                  <button class="btn btn-outline-danger m-2 r-btn" id="${ele.id}">Delete</button>
              </div>
          </div>
      </div>
  </div>` ;
        detailsPlaceholder.innerHTML += htmltext;
    })
}
async function onDelete(e){
    const btnId = e.target.id;  
    if(e.target && e.target.classList.contains("r-btn")){
        console.log(btnId);
        e.preventDefault();
        try{           
            await axios.get(`http://192.168.29.221:9393/user/increase/${btnId}`);
            await axios.get(`http://192.168.29.221:9393/user/delete/${btnId}`);
            refresh();
        }catch(err){
            console.log(err);
        }
    }
}
async function refresh() {
    try {
        let url1 = 'http://192.168.29.221:9393/user/slotData';
        const response1 = await axios.get(url1);
        showSlots(response1);
        const url2 = 'http://192.168.29.221:9393/user/meetingData'
        const response2 = await axios.get(url2);
        showmeetings(response2);
    } catch (err) {
        console.log(err);
    }
}
refresh();

detailsPlaceholder.addEventListener('click',onDelete);

