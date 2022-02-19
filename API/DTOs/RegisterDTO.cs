using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    // Data Transfer Object (DTO) for information required when user registers
    public class RegisterDTO
    {
        public string UserName { get; set; }
        public string ScreeName { get; set; }
        
        [Required]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$", ErrorMessage = "Password must meet requirement")] // Use Regex
        public string Password { get; set; }
    }
}