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
    public class Details
    {
        // Query that returns a post from given id
        public class Query : IRequest<Result<PostDTO>>
        {
            public Guid Id { get; set; }
        }

        // Handler for returning a post
        public class Handler : IRequestHandler<Query, Result<PostDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PostDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var selectedPost = await _context.allPosts
                    .ProjectTo<PostDTO>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<PostDTO>.Success(selectedPost);
            }
        }
    }
}