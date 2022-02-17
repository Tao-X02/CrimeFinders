using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class List
    {
        // Query that returns list of Events
        public class Query : IRequest<List<Post>> {}

        // Handler for returning list
        public class Handler : IRequestHandler<Query, List<Post>>
        {
            // Constructor
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            
            // Handle method
            public async Task<List<Post>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.allPosts.ToListAsync(cancellationToken);
            }
        }
    }
}