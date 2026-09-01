
const SUBJECTS = [
    {
      id: "geografia",
      nome: "Geografia",
      professor: "Prof. Paulo",
      descricao: "Analisa o espaço em que vivemos, as paisagens e as relações entre sociedade e natureza.",
      icone: "🌍",
      cor: "geografia",
      status: "pendentes",
    },
    {
      id: "ciencias",
      nome: "Ciências",
      professor: "Prof. Rogério",
      descricao: "Estuda a vida, a natureza e o universo, explicando fenômenos e promovendo consciência sobre o nosso planeta.",
      icone: "🔬",
      cor: "ciencias",
      status: "recomendadas",
    },
    {
      id: "historia",
      nome: "História",
      professor: "Prof. Douglas",
      descricao: "Nos ajuda a entender o passado para compreender o presente e construir o futuro.",
      icone: "🏛️",
      cor: "historia",
      status: "assistidas",
    },
    {
      id: "portugues",
      nome: "Língua Portuguesa",
      professor: "Profa. Sônia",
      descricao: "Melhora a comunicação, interpretação de textos e a expressão de ideias de forma clara e eficaz.",
      icone: "📖",
      cor: "portugues",
      status: "pendentes",
    },
    {
      id: "matematica",
      nome: "Matemática",
      professor: "Prof. Pedro",
      descricao: "Desenvolve o raciocínio lógico e a resolução de problemas, essencial no dia a dia.",
      icone: "📐",
      cor: "matematica",
      status: "recomendadas",
    },
    {
      id: "artes",
      nome: "Artes",
      professor: "Profa. Ângela",
      descricao: "Estimula a criatividade, a sensibilidade e a expressão em diferentes linguagens.",
      icone: "🎨",
      cor: "artes",
      status: "assistidas",
    },
  ];
  
  const STATUS_LABEL = {
    recomendadas: "Recomendada",
    pendentes: "Pendente",
    assistidas: "Assistida",
  };
  
  
  const grid = document.getElementById("grid");
  const emptyState = document.getElementById("emptyState");
  const resultCount = document.getElementById("resultCount");
  const tabs = document.querySelectorAll(".tab");
  
  const modal = document.getElementById("modal");
  const modalIcon = document.getElementById("modalIcon");
  const modalStatus = document.getElementById("modalStatus");
  const modalTitle = document.getElementById("modalTitle");
  const modalTeacher = document.getElementById("modalTeacher");
  const modalDesc = document.getElementById("modalDesc");
  const modalAction = document.getElementById("modalAction");
  const modalClose = document.getElementById("modalClose");
  
  let activeFilter = "todas";
  
  
  
  function render() {
    const items = SUBJECTS.filter(
      (s) => activeFilter === "todas" || s.status === activeFilter
    );
  
    grid.innerHTML = "";
    emptyState.hidden = items.length > 0;
    resultCount.textContent = `${items.length} aula${items.length === 1 ? "" : "s"}`;
  
    items.forEach((subject) => {
      grid.appendChild(buildCard(subject));
    });
  }
  
  function buildCard(subject) {
    const card = document.createElement("article");
    card.className = "card";
    card.style.setProperty("--accent", `var(--c-${subject.cor})`);
  
    card.innerHTML = `
      <div class="card__top">
        <div class="card__icon">${subject.icone}</div>
        <span class="card__status card__status--${subject.status}">
          ${STATUS_LABEL[subject.status]}
        </span>
      </div>
      <h2>${subject.nome}</h2>
      <p class="card__desc">${subject.descricao}</p>
      <p class="card__teacher"><strong>${subject.professor}</strong> · ${subject.nome}</p>
      <div class="card__footer">
        <button class="btn btn--primary" type="button">Acessar</button>
      </div>
    `;
  
    card.querySelector(".btn").addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(subject);
    });
    card.addEventListener("click", () => openModal(subject));
  
    return card;
  }
  
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
  
      activeFilter = tab.dataset.filter;
      render();
    });
  });
  
  
  function openModal(subject) {
    modal.style.setProperty("--accent", `var(--c-${subject.cor})`);
    modalIcon.textContent = subject.icone;
    modalStatus.textContent = STATUS_LABEL[subject.status];
    modalTitle.textContent = subject.nome;
    modalTeacher.textContent = subject.professor;
    modalDesc.textContent = subject.descricao;
    modalAction.textContent = `Acessar aula de ${subject.nome}`;
    modal.hidden = false;
  }
  
  function closeModal() {
    modal.hidden = true;
  }
  
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  modalAction.addEventListener("click", closeModal);
  
  
  render();
