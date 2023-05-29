using crud.DTO;
using crud.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace crud.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContainerController
    {
        private readonly PortuarioContext _portuarioContext;
        public ContainerController(PortuarioContext portuarioContext) {
            _portuarioContext = portuarioContext;
        }

        [HttpGet]
        public List<Container> Listar()
        {
            return _portuarioContext.Containers.AsNoTracking()
                .Include(con => con.Cliente)
                .ToList();
        }

        [HttpGet("Cliente/{id}")]
        public List<Container> ListarPorCLiente(int id)
        {
            return _portuarioContext.Containers.AsNoTracking()
                .Include(con => con.Cliente)
                .Where(con => con.ClienteId == id)
                .ToList();
        }

        [HttpPost]
        public void Create([FromBody] ContainerDTO Container)
        {
            Container ContainerEntity = new();

            // Convertendo a classe ContainerDTO em Container para permitir que o banco persista os dados
            ContainerEntity.NumeroConteiner = GerarNumeroContainer();
            ContainerEntity.Categoria = Container.Categoria.ToUpper();
            ContainerEntity.Tipo = Container.Tipo;
            ContainerEntity.Status = Container.Status;
            ContainerEntity.ClienteId = Container.ClienteId;

            _portuarioContext.Containers.Add( ContainerEntity );

            _portuarioContext.SaveChanges();
        }

        [HttpPut("{id:int}")]
        public void Update([FromBody] ContainerDTO Container, int id)
        {
            var ContainerAtual = _portuarioContext.Containers.Find(id);

            if (ContainerAtual is not null)
            {

                if (!String.IsNullOrEmpty(Container.Categoria))
                    ContainerAtual.Categoria = Container.Categoria.ToUpper();

                if (!String.IsNullOrEmpty(Container.Status))
                    ContainerAtual.Status = Container.Status;

                if (!String.IsNullOrEmpty(Container.Tipo))
                    ContainerAtual.Tipo = Container.Tipo;

                if (!Container.ClienteId.Equals(0))
                    ContainerAtual.ClienteId = Container.ClienteId;

                _portuarioContext.SaveChanges();
            }

        }

        // Recuperar Container por id 
        [HttpGet("{id:int}")]
        public Container? ListarPorId(int id)
        {
            return _portuarioContext.Containers.Find(id);
        }

        // Excluir Container
        [HttpDelete("{id:int}")]
        public void Delete(int id)
        {
            var Container = _portuarioContext.Containers.Find(id);

            if(Container is not null)
            {
                _portuarioContext.Containers.Remove(Container);
                _portuarioContext.SaveChanges();
            }
        }

        // Gerar numero para utilizacao de identificacao
        private string GerarNumeroContainer()
        {
            Random random = new();

            int numLetters = 4;
            int numNumbers = 7;

            StringBuilder sb = new StringBuilder();
            // Gerar letras aleatorias
            for (int i = 0; i < numLetters; i++)
            {
                char letters = (char)random.Next('A', 'Z' + 1);
                sb.Append(letters);
            }
            // Gerar os Numeros aleatorios
            for (int i = 0; i < numNumbers; i++)
            {
                int number = random.Next(0, 9);
                sb.Append(number);
            }

            return sb.ToString();
        }
       
    }
}
