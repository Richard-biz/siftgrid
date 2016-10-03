using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyClassLibrary.Interface
{
  public  interface IUser : IService
    {
        Task<IEnumerable<User>> GetUser();
        Task<User> GetUserID(string id);
    }
}
