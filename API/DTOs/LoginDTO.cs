using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    // Data Transfer Object (DTO) for information entered when user logs in
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}