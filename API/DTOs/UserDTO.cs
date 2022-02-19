using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    // Data Transfer Object (DTO) for information the API sends back to user after login
    public class UserDTO
    {
        public string ScreeName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
    }
}