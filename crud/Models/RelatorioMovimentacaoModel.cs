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
            this.totalMovimentacoes = this.movimentacoes.Count;
            this.totalImportacao = getImportacoes();
            this.totalExportacao = getExportacoes();
        }

        public int getImportacoes()
        {
            int totalImportacao = 0;
            foreach(Movimentacao movimentacao in movimentacoes)
            {
                if (movimentacao.Container.Categoria.Equals("IMPORTACAO"))         
                    totalImportacao++;      
            }
            return totalImportacao;
        }

        public int getExportacoes()
        {
            int totalExportacoes = 0;
            foreach (Movimentacao movimentacao in movimentacoes)
            {
                if (movimentacao.Container.Categoria.Equals("EXPORTACAO"))
                    totalExportacoes++;
            }
            return totalExportacoes;
        }
    }
}
