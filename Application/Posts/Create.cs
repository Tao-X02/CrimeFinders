using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Create
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

        // Handler for creating a new post
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            // Interface
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.allPosts.Add(request.Post); // Add post

                // Handle errors
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create post");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}