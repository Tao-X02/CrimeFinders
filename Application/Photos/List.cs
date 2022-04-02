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

namespace Application.Photos
{
    public class List
    {
        // Query that returns list of posts
        public class Query : IRequest<Result<List<Photo>>> {}

        // Handler for returning list
        public class Handler : IRequestHandler<Query, Result<List<Photo>>>
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
            public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Get list of all photos in posts using SQL methods in Entity framework
                var photos = await _context.allPosts
                    .Include(p => p.Photos)
                    .Where(p => p.Photos.ToArray().Length > 0)
                    .Select(p => new Photo()
                    {
                        Id = p.Photos.ToArray()[0].Id,
                        Url = p.Photos.ToArray()[0].Url
                    })
                    .ToListAsync(cancellationToken);
                
                return Result<List<Photo>>.Success(photos);
            }
        }
    }
}