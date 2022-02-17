using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Posts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class PostsController : BaseController
    {
        [HttpGet] // List of all posts
        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // Get post by ID
        public async Task<ActionResult<Post>> GetPost(Guid id) 
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost] // Create new post
        public async Task<IActionResult> CreatePost(Post newPost)
        {
            return Ok(await Mediator.Send(new Create.Command {Post = newPost}));
        }

        [HttpPut("{id}")] // Update existing post
        public async Task<IActionResult> UpdatePost(Guid id, Post newPost)
        {
            newPost.Id = id;
            return Ok(await Mediator.Send(new Update.Command{Post = newPost}));
        }

        [HttpDelete("{id}")] // Delete a post
        public async Task<IActionResult> DeletePost(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}