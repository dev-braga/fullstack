using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace crud.Models
{
    [Table("Movimentacao")]   
    
    public class Movimentacao
    {
        [Key]
        public int Id { get; set; }

        public int ClienteId { get; set; }
        public int ContainerId { get; set; }
        public string TipoMovimentacao { get; set; }

        public DateTime DataHoraInicio { get; set; }

        public DateTime DataHoraFim { get; set; }

        // Atributo utilizado para usar o include no retorno da consulta.
        public virtual Cliente Cliente { get; set; }
        public virtual Container Container { get; set; }
    }
}
