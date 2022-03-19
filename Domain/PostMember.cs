using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Joint table for Post and WebUser
namespace Domain
{
    public class PostMember
    {
        public string UserId { get; set; }
        public WebUser WebUser { get; set; }
        public Guid PostId { get; set; }
        public Post Post { get; set; }
        public bool Poster { get; set; }
    }
}