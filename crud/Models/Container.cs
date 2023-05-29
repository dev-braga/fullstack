using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace crud.Models
{
    [Table("Container")]
    public class Container
    {

        [Key]
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public string NumeroConteiner { get; set; }
        public string Tipo { get; set; }
        public string Status { get; set; }
        public string Categoria { get; set; }

        public virtual Cliente Cliente { get; set; }

    }
}
