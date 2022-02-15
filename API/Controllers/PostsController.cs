using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class PostsController : BaseController
    {
        private readonly DataContext _context;
        public PostsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] // List of all posts
        public async Task<ActionResult<List<Post>>> GetActivities()
        {
            return await _context.allPosts.ToListAsync();
        }

        [HttpGet("{id}")] // Get event by ID
        public async Task<ActionResult<Post>> GetActivity(Guid id) 
        {
            return await _context.allPosts.FindAsync(id);
        }
    }
}