using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyClassLibrary.Interface
{
   public class User
    {
        [Key]
        public string id { get; set; }
        public string tennatid { get; set; }
        public string company { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
