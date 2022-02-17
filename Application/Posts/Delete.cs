using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Delete
    {
        // Command that takes a post id as input
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        // Handler for deleting a post
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            // Constructor
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentPost = await _context.allPosts.FindAsync(request.Id);
                if (currentPost == null)
                {
                    return null; // handled in BaseController.cs
                }

                _context.Remove(currentPost); // Delete post

                // Handle errors
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete post");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}