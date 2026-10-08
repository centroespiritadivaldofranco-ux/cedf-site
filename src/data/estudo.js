// Material de estudo e consulta. Os PDFs ficam no site da FEB (febnet.org.br); aqui só
// listamos e apontamos o link. Para incluir um material, acrescente um item em `itens`
// do grupo desejado (ou crie um grupo novo).

const FEB = "https://www.febnet.org.br/portal/wp-content/uploads/";
const FEB_ANTIGO = "https://www.febnet.org.br/wp-content/uploads/";

export const PAGINA_FEB = "https://www.febnet.org.br/portal/2022/02/28/orientacao-ao-centro-espirita/";

export const grupos = [
  {
    id: "oce",
    titulo: "Orientação ao Centro Espírita",
    descricao: "Documentos orientadores da FEB para o estudo, a prática e a divulgação da Doutrina Espírita na casa espírita.",
    itens: [
      { titulo: "Orientação ao Centro Espírita", link: FEB + "2021/01/WEB-Orientação-ao-Centro-Espírita.pdf" },
      { titulo: "Orientação à Ação Evangelizadora Espírita da Infância", link: FEB + "2019/07/WEB-Orientação-AEE-Infância-1.pdf" },
      { titulo: "Orientação à Ação Evangelizadora Espírita da Juventude", link: FEB + "2019/07/WEB-Orientação-à-Ação-Evangelizadora-Espírita-da-Juventude.pdf" },
      { titulo: "Orientação para a prática mediúnica no Centro Espírita", link: FEB + "2019/07/WEB-Orientação-para-a-prática-mediúnica-no-Centro-Espírita-1.pdf" },
      { titulo: "Orientação à Assistência e Promoção Social Espírita", link: FEB + "2019/07/WEB-Orientação-a-Assistencia-e-Promocao-Social-Espirita.pdf" },
      { titulo: "Orientação para o Atendimento Espiritual no Centro Espírita", link: FEB + "2019/07/Orientação-para-o-Atendimento-Espiritual-no-Centro-Espírita.pdf" },
      { titulo: "Orientação à Comunicação Social Espírita", link: FEB + "2019/07/WEB-Orientação-a-comunicação-social-espirita.pdf" },
      { titulo: "O livro espírita e a sustentabilidade do Movimento Espírita", link: FEB + "2019/07/WEB-O-livro-espirita-e-a-sustentabilidade-do-movimento-espirita-2.pdf" },
      { titulo: "Orientação para a assistência espírita nos sistemas penais", link: FEB + "2019/07/WEBOrientacaoparaassistenciaespiritanossistemaspenais-2.pdf" },
    ],
  },
  {
    id: "virtuais",
    titulo: "Atividades virtuais",
    descricao: "Recomendações para reuniões e atividades on-line na casa espírita.",
    itens: [
      { titulo: "Recomendações para a organização de reuniões virtuais", link: FEB + "2021/01/Recomendações-para-organização-de-reuniões-virtuais-1.pdf" },
      { titulo: "Recomendações para os participantes de reuniões", link: FEB + "2021/01/Recomendações-para-os-participantes-de-reuniões.pdf" },
      { titulo: "Check-list de segurança em reuniões virtuais (Zoom)", link: FEB + "2021/01/Check-List-para-segurança-em-Reuniões-Virtuais-zoom.pdf" },
      { titulo: "Check-list de segurança em reuniões virtuais (Jitsi)", link: FEB + "2021/01/Check-List-para-segurança-em-Reuniões-Virtuais-Jitsi.pdf" },
    ],
  },
  {
    id: "gestao",
    titulo: "Legislação, gestão e modelos",
    descricao: "Para quem cuida da administração da casa: legislação, estatuto e termos prontos.",
    itens: [
      { titulo: "Alterações no Código Civil e as Instituições Espíritas", link: FEB + "2019/07/Alterações-no-codigo_civil.pdf" },
      { titulo: "Manual de Administração", link: FEB + "2020/05/Manual-de-Administração.pdf" },
      { titulo: "Modelo de Estatuto", link: FEB + "2019/07/Modelo-de-Estatuto-convertido.pdf" },
      { titulo: "Relação de Legislações e Links para a Área do APSE", link: FEB + "2021/01/Legislacao-APSE-OCE.pdf" },
      { titulo: "Termo de adesão ao serviço voluntário", link: FEB + "2021/01/Termo-de-Adesão-ao-Serviço-Voluntário-OCE-2020.pdf" },
      { titulo: "Termo de uso de imagem e som (adulto)", link: FEB + "2021/01/Termo-autorizacao_uso_imagem_adulto.pdf" },
      { titulo: "Termo de uso de imagem e som (menor)", link: FEB + "2021/01/Termo-autorizacao_uso_imagem_menor.pdf" },
    ],
  },
  {
    id: "opusculos",
    titulo: "Opúsculos e livretos",
    descricao: "Textos curtos, ótimos para ler com calma ou distribuir na casa.",
    itens: [
      { titulo: "Família, vida e paz", link: FEB + "2019/07/WEB-Familia-vida-e-paz.pdf" },
      { titulo: "Consciência ecológica", link: FEB + "2022/12/WEB-conscienciaecologica-26-06-23.pdf" },
      { titulo: "O Evangelho no Lar e no Coração", link: FEB_ANTIGO + "2012/11/O-Evangelho-no-Lar-e-no-Coracao-Livreto.pdf" },
      { titulo: "Viver em família", link: FEB_ANTIGO + "2012/11/Viver-em-familia-Livreto.pdf" },
      { titulo: "Construamos a Paz", link: FEB_ANTIGO + "2012/11/Construamos-a-Paz-Livreto.pdf" },
      { titulo: "Aborto (livreto)", link: FEB_ANTIGO + "2012/11/Livreto-Aborto.pdf" },
      { titulo: "Aborto (cartilha)", link: FEB_ANTIGO + "2019/04/CARTILHA-ABORTO-A4-FEB.pdf" },
      { titulo: "Drogas", link: FEB_ANTIGO + "2012/11/Livreto-Drogas.pdf" },
      { titulo: "Eutanásia", link: FEB_ANTIGO + "2012/11/Livreto-Eutanasia.pdf" },
      { titulo: "Suicídio", link: FEB_ANTIGO + "2012/11/Livreto-Suicidio.pdf" },
      { titulo: "Violência", link: FEB_ANTIGO + "2012/11/Livreto-Violencia.pdf" },
    ],
  },
];
