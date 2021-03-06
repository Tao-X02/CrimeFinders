using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Update
    {
        // Command that takes a post as input
        public class Command : IRequest<Result<Unit>>
        {
            public Post Post { get; set; }
        }

        // Middleware to validate user input
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(e => e.Post).SetValidator(new PostValidator());
            }
        }

        // Handler for updating an existing post
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            // Interface
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentPost = await _context.allPosts.FindAsync(request.Post.Id);

                // Use AutoMapper to update post
                _mapper.Map(request.Post, currentPost);

                // Handle errors
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update post");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}