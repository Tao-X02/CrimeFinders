using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<PostMember> Members { get; set; } // many-to-many relationship
        public string PosterEmail { get; set; }
        public ICollection<Photo> Photos { get; set; } // one-to-many relationship
    }
}