using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Domain;

namespace Application.Posts
{
    public class PostDTO
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string Location { get; set; }
        public string posterName { get; set; }
        public DateTime Date { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<Profile> Members { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public string PosterEmail { get; set; }
    }
}