namespace crud.Models
{
    public class RelatorioMovimentacaoModel
    {
        public int totalMovimentacoes { get; set; }
        public int totalImportacao { get; set; }
        public int totalExportacao { get; set; }

        public List<Movimentacao> movimentacoes { get; set; }

        public RelatorioMovimentacaoModel(List<Movimentacao> movimentacoes)
        {
            this.movimentacoes = new List<Movimentacao>(movimentacoes);
            this.Count();
        }

        public void Count()
        {
            foreach(Movimentacao movimentacao in movimentacoes)
            {
                if (movimentacao.Container.Categoria.Equals('IMPORTACAO'))
                    this.totalImportacao++;  

                if (movimentacao.Container.Categoria.Equals('EXPORTACAO'))
                    this.totalExportacao++;        
            }
            this.totalMovimentacoes = movimentacoes.Count;
        }
    }
}
