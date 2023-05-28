﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace crud.Models
{

    [Table("Cliente")]
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public string? Telefone { get; set; }
        public string Email { get; set; }
        public string? Endereco { get; set; }
    }
}

