using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL
{
    [Table("Tasks")]
    public class TodoCard
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string TaskName { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        [StringLength(100)]
        public string UserName { get; set; }

        [Required]
        public int Status { get; set; }

        public DateTime CreateDate { get; set; }
    }
}
