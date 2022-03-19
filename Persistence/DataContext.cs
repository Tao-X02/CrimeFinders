using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<WebUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Post> allPosts { get; set; }
        public DbSet<PostMember> PostMembers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<PostMember>(x => x.HasKey(a => new { a.UserId, a.PostId }));

            // For user
            builder.Entity<PostMember>()
                .HasOne(u => u.WebUser)
                .WithMany(a => a.Posts)
                .HasForeignKey(aa => aa.UserId);

            // For post
            builder.Entity<PostMember>()
                .HasOne(u => u.Post)
                .WithMany(a => a.Members)
                .HasForeignKey(aa => aa.PostId);
        }
    }
}