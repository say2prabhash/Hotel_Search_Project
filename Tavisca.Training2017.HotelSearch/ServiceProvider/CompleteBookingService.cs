﻿using Logger;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TripEngine;
using TripEngineServices;

namespace ServiceProvider
{
    class CompleteBookingService : IHotelService
    {
        public async Task<string> GetRequestedDataAsync(string requestData)
        {
            try
            {
                var request = JsonConvert.DeserializeObject<TripFolderBookRS>(requestData);
                HotelCompleteBooking hotelCompleteBooking = new HotelCompleteBooking();
                var response = await hotelCompleteBooking.CompleteHotelBooking(request);
                return JsonConvert.SerializeObject(response);
            }
            catch(Exception ex)
            {
                Log.LogError(ex);
                throw ex;
            }
        }
    }
}
