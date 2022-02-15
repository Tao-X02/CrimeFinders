using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            // Check if there's any post already in database
            if (context.allPosts.Any()) 
            {
                return;
            }

            // Create new list of posts
            var posts = new List<Post>
            {
                new Post
                {
                    Type = "Person of Interest",
                    Description = "Break and enter",
                    City = "Kitchener",
                    Region = "Ontario",
                    Location = "City of Kitchener Enforcement Office, Ontario Street North",
                    Date = new DateTime(2022, 2, 10)
                },
                new Post
                {
                    Type = "Person of Interest",
                    Description = "Robbery",
                    City = "Cambridge",
                    Region = "Ontario",
                    Location = "Concession Road and Langs Drive",
                    Date = new DateTime(2022, 2, 9)
                },
                new Post
                {
                    Type = "Person of Interest",
                    Description = "Assault",
                    City = "Cambridge",
                    Region = "Ontario",
                    Location = "Walmart on Pinebush Road",
                    Date = new DateTime(2022, 1, 25)
                },
                new Post
                {
                    Type = "Person of Interest",
                    Description = "Commercial robbery",
                    City = "Kitchener",
                    Region = "Ontario",
                    Location = "Highland Road West and Westforest Trail",
                    Date = new DateTime(2022, 1, 18)
                }
            };

            // Save changes
            await context.allPosts.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }
    }
}