using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace crud.DTO
{
    public class MovimentacaoDTO
    {
        [Required]
        public int ClienteId { get; set; }
        public int ContainerId { get; set; }
        public string TipoMovimentacao { get; set; }
        public DateTime DataHoraInicio { get; set; }
        public DateTime DataHoraFim { get; set; }
    }
}
