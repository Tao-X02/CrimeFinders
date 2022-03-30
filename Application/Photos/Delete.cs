using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        // Handler
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _context = context;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Find post with photo of id
                var post = await _context.allPosts
                    .Include(a => a.Photos)
                    .FirstOrDefaultAsync(x => x.Photos.Any(p => p.Id == request.Id));

                if (post == null) return null;

                // Find photo from post
                var photo = post.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                var result = await _photoAccessor.DeletePhoto(photo.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting photo from Cloudinary");

                // Delete from post
                post.Photos.Remove(photo);

                // // Return result
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem deleting photo from API");
            }
        }
    }
}