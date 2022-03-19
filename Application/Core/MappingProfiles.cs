// To be used in startup class to set up automapper

using Application.Posts;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Post, Post>();
            CreateMap<Post, PostDTO>()
                .ForMember(d => d.posterName, o => o.MapFrom(s => s.Members
                    .FirstOrDefault(x => x.Poster).WebUser.UserName));
            CreateMap<PostMember, Profiles.Profile>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.WebUser.UserName))
                .ForMember(d => d.ScreeName, o => o.MapFrom(s => s.WebUser.ScreeName));
        }
    }
}