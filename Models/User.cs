using System.ComponentModel.DataAnnotations;

namespace API.Models 
{

    public class User 
    {
        public int UserId { get; set; }

        [StringLength(30)]
        public string? FirstName { get; set; }

        [StringLength(30)]
        public string? LastName { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// This method copys non-null properties from userToCopy. Id is not copied.
        /// </summary>
        /// <param name="userToCopy">The user to copy the properties from.</param>
        public void CopyPropertiesFrom(User userToCopy) 
        {
            //TODO: Do this with reflection instead
            this.FirstName = userToCopy.FirstName ?? this.FirstName;
            this.LastName = userToCopy.LastName ?? this.LastName;
            this.PhoneNumber = userToCopy.PhoneNumber ?? this.PhoneNumber;
        }
    }
}