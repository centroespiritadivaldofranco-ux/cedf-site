// Livraria virtual do CEDF (Nuvemshop). A compra, o pagamento e o frete acontecem lá;
// esta página só apresenta os livros. Para incluir um livro, acrescente um item em `livros`.

export const LOJA_URL = "https://cedflivraria.lojavirtualnuvem.com.br/";

export const livros = [
  {
    id: "o-holandes",
    titulo: "O Holandês",
    genero: "Romance mediúnico",
    subtitulo: "Seu reerguimento começou nas sombras do umbral",
    autoria: "Pelos espíritos Michele e Fréderic · Médium Claudia Almeida",
    capa: "/livraria/o-holandes.webp",
    // Atenção: o preço é digitado aqui — se mudar na loja, atualize também neste valor.
    preco: "R$ 67,90",
    link: "https://cedflivraria.lojavirtualnuvem.com.br/produtos/o-holandes/",
    sinopse: [
      "Um romance que mergulha em uma narrativa de descobertas e transformações, centrada na figura de um protagonista cujas experiências de vida se entrelaçam com temas de persistência e superação.",
      "A obra acompanha a jornada de um homem que, diante de desafios significativos, busca redescobrir a própria identidade e o seu propósito. Uma história que equilibra momentos de profunda reflexão emocional com uma narrativa envolvente, focada na força do espírito humano.",
    ],
  },
];
