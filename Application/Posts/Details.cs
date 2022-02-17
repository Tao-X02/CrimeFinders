using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        // Query that returns a post from given id
        public class Query : IRequest<Post>
        {
            public Guid Id { get; set; }
        }

        // Handler for returning a post
        public class Handler : IRequestHandler<Query, Post>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Post> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.allPosts.FindAsync(request.Id);
            }
        }
    }
}