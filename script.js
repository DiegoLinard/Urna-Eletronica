let quadrado1 = document.getElementById("quadrado1");
let quadrado2 = document.getElementById("quadrado2");
const txt1 = document.getElementById("txt1");
const txt2 = document.getElementById("txt2");
const nome = document.getElementById("nome");
const partido = document.getElementById("partido");
const imagemCandidato = document.getElementById("imagemCandidato");
const final = document.getElementById("final");
const votoNulo = document.getElementById("votoNulo");
const votoBranco = document.getElementById("votoBranco");

function clicar(n) {
  if (n === "BRANCO") {
    branco();
    console.log("Voto branco");
  } else if (n === "CORRIGE") {
    quadrado1.innerHTML = "";
    quadrado2.innerHTML = "";
    comecarVotacao();
    console.log("Voto corrigido.");
  } else if (n === "CONFIRMA") {
    if (quadradosPreenchidos()) {
      terminarVotacao();
      console.log(
        `Voto confirmado: ${quadrado1.innerHTML + quadrado2.innerHTML}.`
      );
    } else {
      console.log("Preencha os campos requisitados");
    }
  } else {
    if (quadrado1.innerHTML === "") {
      quadrado1.innerHTML = n;
    } else if (quadrado2.innerHTML === "") {
      quadrado2.innerHTML = n;
    } else {
      console.log("Os dois quadrados já estão preenchidos.");
    }
  }

  if (quadradosPreenchidos()) {
    exibirDadosCandidato();
  }
}

function comecarVotacao() {
  nome.style.display = "none";
  partido.style.display = "none";
  imagemCandidato.style.display = "none";
  final.style.display = "none";
  votoNulo.style.display = "none";
  votoBranco.style.display = "none";
}

function terminarVotacao() {
  nome.parentNode.removeChild(nome);
  partido.parentNode.removeChild(partido);
  imagemCandidato.parentNode.removeChild(imagemCandidato);
  final.parentNode.removeChild(final);
  votoNulo.parentNode.removeChild(votoNulo);
  votoBranco.parentNode.removeChild(votoBranco);
  quadrado1.parentNode.removeChild(quadrado1);
  quadrado2.parentNode.removeChild(quadrado2);
  txt1.parentNode.removeChild(txt1);
  txt2.parentNode.removeChild(txt2);
  const fim = document.getElementById("fim");
  fim.style.display = "block";
  fim.innerHTML = "FIM";
}

function branco() {
  if (quadrado1 !== "" || quadrado2 !== "") {
    votoBranco.style.display = "block";
    final.style.display = "block";
    votoBranco.innerHTML = "VOTO BRANCO";
    console.log("teste2");
  } else {
    console.log("teste");
  }
}

function confirma() {
  let confirmado = false;

  if(voto) {}
}

function quadradosPreenchidos() {
  return quadrado1.innerHTML !== "" && quadrado2.innerHTML !== "";
}

function exibirDadosCandidato() {
  nome.style.display = "block";
  partido.style.display = "block";
  imagemCandidato.style.display = "block";
  final.style.display = "block";

  fetch("./dat.json")
    .then((response) => response.json())
    .then((data) => {
      const numeroVoto = quadrado1.innerHTML + quadrado2.innerHTML;

      const candidato = data.candidatos.find(
        (candidatos) => candidatos.numero === numeroVoto
      );
      if (candidato) {
        nome.innerHTML = `Nome: ${candidato.nome}.`;
        partido.innerHTML = `Partido: ${candidato.partido}.`;
        imagemCandidato.src = `imgs/${candidato.imagem}`;
        //fim.style.display = "none";
      } else {
        votoNulo.style.display = "block";
        nome.style.display = "none";
        partido.style.display = "none";
        imagemCandidato.src = "imgs/votonulo.png";
        votoNulo.innerHTML = "VOTO NULO";
        //fim.style.display = "none";
      }
    })
    .catch((error) => {
      console.log("Erro ao ler o arquivo JSON:", error);
    });
}
