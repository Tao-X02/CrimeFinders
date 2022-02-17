using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Delete
    {
        // Command that takes a post id as input
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        // Handler for deleting a post
        public class Handler : IRequestHandler<Command>
        {
            // Constructor
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentPost = await _context.allPosts.FindAsync(request.Id);
                _context.Remove(currentPost); // Delete post

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}