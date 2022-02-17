using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Update
    {
        // Command that takes a post as input
        public class Command : IRequest
        {
            public Post Post { get; set; }
        }

        // Handler for updating an existing post
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            // Interface
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentPost = await _context.allPosts.FindAsync(request.Post.Id);

                // Use AutoMapper to update event
                _mapper.Map(request.Post, currentPost);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}