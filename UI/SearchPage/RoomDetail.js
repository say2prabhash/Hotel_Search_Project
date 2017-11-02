
$(document).ready(function(){
                
    var data=sessionStorage.getItem('RoomListing');
    var roomData=JSON.parse(data);
   var roomItinerary= roomData.HotelRoomList;

        var typeOfRooms= new Array();
         var commonData= new Array();
    for(var i=0;i<roomItinerary.length;i++)
       {
 if(roomItinerary[i].SupplierName=="TouricoTGSTest"||roomItinerary[i].SupplierName=="HotelBeds Test")
           {

               typeOfRooms.push({
                roomType:roomItinerary[i].RoomName,
                roomDescription:roomItinerary[i].Description,
                roomFare:roomItinerary[i].CurrencyType+" "+roomItinerary[i].Price,
                latitude:roomItinerary[i].Latitude,
                longitude:roomItinerary[i].Longitude
            });

           }
      }
  var temp = $("#common-item");
    var cmp = Handlebars.compile(temp.html());
    var htm = cmp({
      image:roomItinerary[0].ImageUrl,
        hotelname: roomItinerary[0].HotelName,
        latitude:roomItinerary[0].Latitude,
        longitude:roomItinerary[0].Longitude
    });

         // }
      
      

   

  var template = $('#room-item');

  var compiledTemplate = Handlebars.compile(template.html());

  var html = compiledTemplate(typeOfRooms);

  $('#roomlist-container').html(htm);
  $('#roomlist-container').append(html);

$(".room-button").click(function()
                       {
    var roomName=this.value;
    var pricingRequest={
                    sessionId:roomItinerary[0].SessionId,
                    roomName:roomName
    }
    var numOfRooms=roomItinerary.NoOfRooms;
    var data=JSON.stringify(pricingRequest);
                    sendRequest("http://localhost:59865/index/HotelListing/search/GetRoomPricing",data,function(result){
                      var dynamicPricing;
                      if(result==null)
                      {
                         alert("Cannot connect to the server at this moment to get the updated price.Please try again later or select some other room");
                         return;
                      }
                      else
                      {
                        
                        sessionStorage.setItem('UpdatedRoomListing',JSON.stringify(result));
                        window.location="guest-details.html";
                    }
                });      
});
});



  