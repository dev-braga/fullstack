using crud.DTO;
using crud.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace crud.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovimentacaoController
    {
        private readonly PortuarioContext _portuarioContext;
        public MovimentacaoController(PortuarioContext portuarioContext) {
            _portuarioContext = portuarioContext;
        }

        [HttpGet]
        public List<Movimentacao> Listar()
        {
            return _portuarioContext.Movimentacaos.AsNoTracking()
                .Include(mov => mov.Cliente )
                .Include(mov => mov.Container )
                .ToList();
        }

        [HttpGet("Cliente/{id}")]
        public RelatorioMovimentacaoModel ListarPorCLiente(int id)
        {
            var movimentacoes = _portuarioContext.Movimentacaos.AsNoTracking()
                .Include(mov => mov.Cliente)
                .Include(mov => mov.Container )
                .Where(x => x.ClienteId == id)
                .ToList();

            return new RelatorioMovimentacaoModel(movimentacoes);
        }

        [HttpPost]
        public void Create([FromBody] MovimentacaoDTO Movimentacao)
        {
            Movimentacao MovimentacaoEntity = new Movimentacao();
            
            // Convertendo a classe MovimentacaoDTO em Movimentacao para permitir que o banco persista os dados
            MovimentacaoEntity.TipoMovimentacao = Movimentacao.TipoMovimentacao;
            MovimentacaoEntity.DataHoraInicio = Movimentacao.DataHoraInicio;
            MovimentacaoEntity.DataHoraFim = Movimentacao.DataHoraFim;
            MovimentacaoEntity.ClienteId = Movimentacao.ClienteId;
            MovimentacaoEntity.ContainerId = Movimentacao.ContainerId;

            try
            {
                _portuarioContext.Movimentacaos.Add(MovimentacaoEntity);
                _portuarioContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        [HttpPut("{id:int}")]
        public void Update([FromBody] MovimentacaoDTO Movimentacao, int id)
        {
            var MovimentacaoAtual = _portuarioContext.Movimentacaos.Find(id);

            if (MovimentacaoAtual is not null)
            {
                if (!String.IsNullOrEmpty( Movimentacao.TipoMovimentacao))
                    MovimentacaoAtual.TipoMovimentacao = Movimentacao.TipoMovimentacao;

                if (Movimentacao.DataHoraInicio != DateTime.MinValue)
                    MovimentacaoAtual.DataHoraInicio = Movimentacao.DataHoraInicio;

                if (Movimentacao.DataHoraFim != DateTime.MinValue)
                    MovimentacaoAtual.DataHoraFim = Movimentacao.DataHoraFim;

                _portuarioContext.SaveChanges();
            }

        }

        // Recuperar Movimentacao por id 
        [HttpGet("{id:int}")]
        public Movimentacao? ListarPorId(int id)
        {
            return _portuarioContext.Movimentacaos.Find(id);
        }

        // Excluir Movimentacao
        [HttpDelete("{id:int}")]
        public void Delete(int id)
        {
            var Movimentacao = _portuarioContext.Movimentacaos.Find(id);

            if(Movimentacao is not null)
            {
                _portuarioContext.Movimentacaos.Remove(Movimentacao);
                _portuarioContext.SaveChanges();
            }
        }
    }

}
