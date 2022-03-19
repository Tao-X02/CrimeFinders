using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class WebUser : IdentityUser
    {
        // Additional properties
        public string ScreeName { get; set; }
        public ICollection<PostMember> Posts { get; set; }
    }
}