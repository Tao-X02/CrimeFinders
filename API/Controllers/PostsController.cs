using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Posts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] // Get post by ID
        public async Task<IActionResult> GetPost(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost] // Create new post
        public async Task<IActionResult> CreatePost(Post newPost)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Post = newPost}));
        }

        [HttpPut("{id}")] // Update existing post
        public async Task<IActionResult> UpdatePost(Guid id, Post newPost)
        {
            newPost.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command{Post = newPost}));
        }

        [HttpDelete("{id}")] // Delete a post
        public async Task<IActionResult> DeletePost(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/join")] // Update members on a post
        public async Task<IActionResult> Join(Guid id, String email)
        {
            return HandleResult(await Mediator.Send(new UpdateMembers.Command{Id = id, Email = email}));
        }

    }
}