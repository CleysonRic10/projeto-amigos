// gsap.com: scroll suave, animacoes, animacoes com rolagem, animacoes de texto
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true
});

function animarPagina(){
  // Animação de entrada da página
  //Secao hero ------------------------------------------------.
  gsap.from(".hero", {
    opacity: 0,
    duration: 1
  });

  gsap.from("picture:nth-child(2)", {
    y: 60,
    duration: 1
  });

  gsap.from("picture:nth-child(1)", {
    y: -60,
    duration: 1
  });

  //Secao secaoCidades ----------------------------------------.
  gsap.from(".card", {
    opacity: 0,         //transparencia inicial
    //duration: 1,        //tempo total da animacao
    //y: 30,              //distancia do movimento
    filter: "blur(10px)", //efeito de desfoque
    stagger: .3,          //Sao 3 cards, cada um com atraso de 0.3s para nao surjir todos juntos!
    //Problema: Os cards ja foram animados ao carregar a pagina.
    scrollTrigger: {
      trigger: ".cards", //elemento que aciona a animacao
    //markers: true,  //mostra os marcadores de inicio e fim da animacao
      start: "0% 80%",  //quando o topo do gatilho atingir 80% da altura da viewport
      end: "100% 70%",  //quando o fundo do gatilho atingir 60% da altura da viewport
      scrub: true //true: anima conforme rola a pagina, sem tempo fixo.
    }
  });

  //Secao secaoObrigado ---------------------------------------.
  gsap.from(".secaoObrigado ul li", {
    opacity: 0,
    x: 40,
    //duration: 1,
    filter: "blur(10px)",
    stagger: .1,
    scrollTrigger: {
      trigger: ".secaoObrigado ul",
      // markers: true,
      start: "0% 80%",
      end: "100% 50%",
      scrub: 2      //tempo de suavizacao do scrub( 3 extremamente sutil!)
    }

  });

  //ANIMACOES Footer ------------------------------------------.
  //scrollTrigger.refresh(); //Nao funciona nessa situacao y: -200
  //Devido a renderizacao, o start esta muito fora da area do footer.
  //Recarrega o posicionamento dos gatilhos (start e end) do ScrollTrigger.

  gsap.from("footer", {
    y: -200,                  //gsap lê em Pixel. Nesse caso deve ser porcentagem
    y: "-30%",                //Animacao inicial de cima para baixo. (30% coberto quando visualizado)
    immediateRender: false,   //Ativa/Desativa a renderizacao imediata.
    scrollTrigger: {
      trigger: "footer",
      scrub: true,
      // markers: true,
      invalidateOnRefresh: true,  //Recalcula o 'BUG' de gatilho ao recarregar 
                                  // a pagina em qualquer parte do site.
      //end:"100% 60%"            //Sobra do bug na base do footer.
      end:"100% 100%"             //Quando o fundo do gatilho atingir o fundo da viewport, evitando o bug de sobra no fundo do footer.
    }
  });

  //ANIMACOES DOS CARACTERES DE TEXTOS ------------------------.

  //Selecione TODOS os elementos com a classe .textoSplit <p> e <h2>
  const grupoTextoSplit = document.querySelectorAll(".textoSplit");

  //Animar cada elemento do grupo individualmente.

  grupoTextoSplit.forEach( (textoUnicoSplit) => { 

    const split = SplitText.create(textoUnicoSplit, { 
      type: "lines, words, chars", 
      mask: "lines", 
    });
    
    // const split = new SplitText(".textoUnicoSplit", { 
    //   type: "lines, words, chars", 
    //   mask: "lines" 
    // });

    gsap.from(split.chars, {
      y: 40,
      opacity: 0,
      duration: 0.3,
      stagger: 0.03,
      scrollTrigger: {
        trigger: textoUnicoSplit,
        // markers: true
      }
    });
  });

}; //Function animarPagina.

//PreLoader -----------------------------------------------.
const TL = gsap.timeline({
  // Sumir preLoader
  onComplete(){
    
    animarPagina(); //Chama a funcao de animacao da pagina.

    gsap.to("#preLoader", {
      opacity: 0,
      display: "none"
      // onComplete(){
      //   gsap.to("#preLoader", {
      //     display: "none"
      //   })
      // }
    })
  }
});

TL.to("#preLoader path", {
  duration: 1,
  // strokeDasharray: 0,
  strokeDashoffset: 0
});

TL.to("#preLoader path", {
  fill: "rgb(168, 19, 19)",
  duration: .5,
  strokeDashoffset: 0
});

