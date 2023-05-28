using crud.DTO;
using crud.Models;
using Microsoft.AspNetCore.Mvc;

namespace crud.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClienteController
    {
        private readonly PortuarioContext _portuarioContext;
        public ClienteController(PortuarioContext portuarioContext) {
            _portuarioContext = portuarioContext;
        }

        [HttpGet]
        public List<Cliente> Listar()
        {
            return _portuarioContext.Clientes.ToList();
        }

        [HttpPost]
        public void Create([FromBody] ClienteDTO cliente)
        {
            Cliente clienteEntity = new Cliente();
            // Convertendo a classe clienteDTO em cliente para permitir que o banco persista os dados
            clienteEntity.Nome = cliente.Nome;
            clienteEntity.Email = cliente.Email;
            _portuarioContext.Clientes.Add(clienteEntity);
            _portuarioContext.SaveChanges();
        }

        [HttpPut("{id:int}")]
        public void Update([FromBody] ClienteDTO cliente, int id)
        {
            var clienteAtual = _portuarioContext.Clientes.Find(id);

            if (clienteAtual is not null)
            {
                if (!String.IsNullOrEmpty( cliente.Nome ))
                    clienteAtual.Nome = cliente.Nome;
                if (!String.IsNullOrEmpty( cliente.Email ))
                    clienteAtual.Email = cliente.Email;

                _portuarioContext.SaveChanges();
            }

        }

        // Recuperar cliente por id 
        [HttpGet("{id}")]
        public Cliente? ListarPorId(int id)
        {
            return _portuarioContext.Clientes.Find(id);
        }

        // Excluir cliente
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                var cliente = _portuarioContext.Clientes.Find(id);

                if (cliente is not null)
                {
                    _portuarioContext.Clientes.Remove( cliente );
                    _portuarioContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
