using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace crud.DTO
{
    public class ContainerDTO
    {
        public int ClienteId { get; set; }
        public string Tipo { get; set; }
        public string Status { get; set; }
        public string Categoria { get; set; }
    }

}
