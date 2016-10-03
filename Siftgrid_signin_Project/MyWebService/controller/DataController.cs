using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyClassLibrary.Interface;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using Microsoft.ServiceFabric.Services.Client;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MyWebService.controller
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        readonly IUser iuser = ServiceProxy.Create<IUser>(new Uri(uriString: "fabric:/Siftgrid_signin_Project/MyStateful"), new ServicePartitionKey(0));
        // GET api/values

        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {

            IEnumerable<User> list = null ;
            try
            {
                list = await iuser.GetUser();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return list;

        }

        // GET api/values/5 
        [HttpGet("{id}")]
        public async Task<string> GetEmployeeById(string id)
        {
            User user = await iuser.GetUserID(id);
            if (user == null)
            {
                return "NotFound";
            }
            else
            {
                return JsonConvert.SerializeObject(user);
            }
        }


    }
}
