using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class List
    {
        // Query that returns list of posts
        public class Query : IRequest<Result<List<Post>>> {}

        // Handler for returning list
        public class Handler : IRequestHandler<Query, Result<List<Post>>>
        {
            // Constructor
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            
            // Handle method
            public async Task<Result<List<Post>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Post>>.Success(await _context.allPosts.ToListAsync(cancellationToken));
            }
        }
    }
}