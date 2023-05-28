using crud.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

public class PortuarioContext : DbContext
{
    public DbSet<Container> Containers { get; set; }

	public DbSet<Cliente> Clientes { get; set; }

	public DbSet<Movimentacao> Movimentacaos { get; set; }

    public PortuarioContext( DbContextOptions<PortuarioContext> options ) : base( options )
	{
	
	}

}
