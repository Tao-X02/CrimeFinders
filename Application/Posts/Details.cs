using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        // Query that returns a post from given id
        public class Query : IRequest<Result<Post>>
        {
            public Guid Id { get; set; }
        }

        // Handler for returning a post
        public class Handler : IRequestHandler<Query, Result<Post>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Post>> Handle(Query request, CancellationToken cancellationToken)
            {
                var selectedPost = await _context.allPosts.FindAsync(request.Id);

                return Result<Post>.Success(selectedPost);
            }
        }
    }
}