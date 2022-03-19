using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class List
    {
        // Query that returns list of posts
        public class Query : IRequest<Result<List<PostDTO>>> {}

        // Handler for returning list
        public class Handler : IRequestHandler<Query, Result<List<PostDTO>>>
        {
            // Constructor
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            // Handle method
            public async Task<Result<List<PostDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts = await _context.allPosts
                    .ProjectTo<PostDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                
                return Result<List<PostDTO>>.Success(posts);
            }
        }
    }
}