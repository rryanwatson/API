using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Context;

namespace API.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DBContext _dbContext;

        public UsersController(DBContext dbContext) 
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            //TODO: Add pagination
            return _dbContext.Users;
        }

        [HttpGet("{userId:int}", Name = "user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<User>> GetUserById(int userId)
        {
            try 
            {
                return Ok(_dbContext.Users.Single(user => user.UserId == userId));
            } 
            catch(InvalidOperationException e) 
            {
                return NotFound();
            }
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult CreateUser([FromBody]User user)
        {
            //Check to see if user exists
            if( _dbContext.Users.Any(
                u => u.FirstName == user.FirstName &&
                u.LastName == user.LastName &&
                u.PhoneNumber == user.PhoneNumber)) 
            {
                return Conflict();
            }
            
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return CreatedAtRoute("user", new { user.UserId }, user);
        }

        [HttpPut()]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateUser(int id, [FromBody]User user)
        {
            User updatedUser;
            try 
            {
                updatedUser = _dbContext.Users.Single(user => user.UserId == id);
            } 
            catch (InvalidOperationException e) 
            {
                return NotFound();
            }

            updatedUser.CopyPropertiesFrom(user);
            _dbContext.SaveChanges();
            user.UserId = updatedUser.UserId;
            return CreatedAtRoute("user", new {updatedUser.UserId}, updatedUser);
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteUser(int id) 
        {
            User userToDelete;
            try 
            {
                userToDelete = _dbContext.Users.Single(u => u.UserId == id);
            } 
            catch(InvalidOperationException e) {
                return NotFound();
            }
            
            _dbContext.Users.Remove(userToDelete);
            _dbContext.SaveChanges();
            return Ok(userToDelete);
        } 
    }
}