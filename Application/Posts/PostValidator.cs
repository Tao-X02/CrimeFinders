using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Posts
{
    public class PostValidator : AbstractValidator<Post>
    {
        public PostValidator()
        {
            // Check each individual field to be not empty
            RuleFor(p => p.Type).NotEmpty();
            RuleFor(p => p.Description).NotEmpty();
            RuleFor(p => p.City).NotEmpty();
            RuleFor(p => p.Region).NotEmpty();
            RuleFor(p => p.Location).NotEmpty();
            RuleFor(p => p.Date).NotEmpty();
        }
    }
}