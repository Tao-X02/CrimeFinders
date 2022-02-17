using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Create
    {
        // Command that takes a post as input
        public class Command : IRequest
        {
            public Post Post { get; set; }
        }

        // Handler for creating a new post
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            // Interface
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.allPosts.Add(request.Post);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}