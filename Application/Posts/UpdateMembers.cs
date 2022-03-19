using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class UpdateMembers
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<WebUser> _userManager;
            public Handler(DataContext context, IUserAccessor userAccessor, UserManager<WebUser> userManager)
            {
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await _context.allPosts
                    .Include(a => a.Members).ThenInclude(u => u.WebUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (post == null) return null;

                var user = await _userManager.FindByEmailAsync("Hello@hotmail.com");

                if (user == null) return null;

                var posterName = post.Members.FirstOrDefault(x => x.Poster)?.WebUser?.UserName;

                var membership = post.Members.FirstOrDefault(x => x.WebUser.UserName == user.UserName);

                if (membership != null && posterName == user.UserName) 
                {
                    post.IsCancelled = !post.IsCancelled;
                }

                if (membership != null && posterName != user.UserName)
                {
                    post.Members.Remove(membership);
                }

                if (membership == null) 
                {
                    membership = new PostMember
                    {
                        WebUser = user,
                        Post = post,
                        Poster = false
                    };

                    post.Members.Add(membership);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}