document.addEventListener('DOMContentLoaded', () => {
    carregarPosts();
    carregarEventos();
    carregarMembros();

    async function carregarPosts() {
        try {
            const res = await fetch('https://estante-jacomel.onrender.com/posts');
            const data = await res.json();

            data.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');
                postCard.id = post.titulo;
                postCard.innerHTML = `
                <div class="post-header">
                    <div class="post-category">Aviso/postagem</div>
                    <div class="post-date">
                        <i data-lucide="calendar"></i>
                        <span>${post.dataPost}</span>
                    </div>
                </div>
                <h3 class="post-title">${post.titulo}</h3>
                <p class="post-excerpt">${post.conteudo}</p>
                <div class="post-footer">
                    <div class="post-author">
                        <span>${post.autorPost}</span>
                    </div>
                </div>
                `
                document.querySelector('.posts-grid').appendChild(postCard);
                lucide.createIcons();
            });

            document.querySelectorAll('.btn-read-more').forEach(button => {
                button.addEventListener('click', (e) => {
                    const postTitle = e.currentTarget.dataset.title;
                    console.log(postTitle);
                });
            });

            const postCount = data.length;
            document.querySelector('.stat-number-posts').textContent = postCount;

            if (postCount == 0) {
                document.querySelector('.no-posts').style.display = 'block';
            } else {
                document.querySelector('.no-posts').style.display = 'none';
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    async function carregarEventos() {
        try {
            const res = await fetch('https://estante-jacomel.onrender.com/events');
            const data = await res.json();

            data.forEach(evento => {
                const dataFormatada = new Date(evento.data_evento).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                });

                const horaFormatada = evento.hora_evento.toString().slice(0, 5);

                const eventCard = document.createElement('div');
                eventCard.classList.add('event-item');
                eventCard.innerHTML = `
                <div class="event-content">
                    <div class="event-type">${evento.descricao}</div>
                    <div class="event-title">${evento.titulo}</div>
                    <div class="event-details">
                        <div class="event-detail">
                            <i data-lucide="calendar"></i>
                            <span>${dataFormatada} - ${horaFormatada}</span>
                        </div>
                        <div class="event-detail">
                            <i data-lucide="map-pin"></i>
                            <span>${evento.local_evento}</span>
                        </div>
                    </div>
                </div>
                `
                document.querySelector('.events-timeline').appendChild(eventCard);
                lucide.createIcons();
            });

            const eventCount = data.length;
            document.querySelector('.stat-number-events').textContent = eventCount;

            if (eventCount == 0) {
                document.querySelector('.no-events').style.display = 'block';
            } else {
                document.querySelector('.no-events').style.display = 'none';
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    async function carregarMembros() {
        try {
            const res = await fetch('https://estante-jacomel.onrender.com/members');
            const data = await res.json();



            data.forEach(member => {
                let lucideData;
                let memberAvatar

                if (member.memberFunction == 'Pastor') {
                    lucideData = 'UserRoundCheck'
                    memberAvatar = '⛪'
                }

                if (member.memberFunction == 'Diácono') {
                    lucideData = 'HandHelping'
                    memberAvatar = '🤝'
                }

                if (member.memberFunction == 'Presbítero') {
                    lucideData = 'ScrollText'
                    memberAvatar = '📜'
                }

                if (member.memberFunction == 'Evangelista') {
                    lucideData = 'Megaphone'
                    memberAvatar = '📢'
                }

                if (member.memberFunction == 'Missionário') {
                    lucideData = 'MapPin'
                    memberAvatar = '🗺️'
                }

                if (member.memberFunction == 'Cantor') {
                    lucideData = 'Mic2'
                    memberAvatar = '🎤'
                }

                if (member.memberFunction == 'Músico') {
                    lucideData = 'MapPin'
                    memberAvatar = '🎵'
                }

                if (member.memberFunction == 'Instrumentista') {
                    lucideData = 'Music'
                    memberAvatar = '🎸'
                }

                if (member.memberFunction == 'Corista') {
                    lucideData = 'Users'
                    memberAvatar = '👥'
                }

                if (member.memberFunction == 'Líder do coral') {
                    lucideData = 'Music4'
                    memberAvatar = '🎼'
                }

                if (member.memberFunction == 'Líder de grupo') {
                    lucideData = 'UserGroup'
                    memberAvatar = '👥'
                }

                if (member.memberFunction == 'Mídia') {
                    lucideData = 'Camera'
                    memberAvatar = '📷'
                }


                const memberCard = document.createElement('div');
                memberCard.classList.add('team-member');
                memberCard.innerHTML = `
                <div class="member-header">
                <div class="member-avatar">${memberAvatar}</div>
                    <i data-lucide="${lucideData}"></i>
                </div>
                <div class="member-info">
                    <h3 class="member-name">${member.memberName}</h3>
                    <p class="member-role">${member.memberFunction}</p>
                </div>
                `
                document.querySelector('.team-grid').appendChild(memberCard);
            });

            const memberCount = data.length;
            document.querySelector('.stat-number-members').textContent = memberCount;
        } catch (error) {
            console.log('Error: ', error);
        }
    }


    // ========================================
    // NAVEGAÇÃO SUAVE (SMOOTH SCROLL)
    // ========================================

    // Pegar todos os links de navegação
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Pegar o href do link (ex: #avisos)
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll suave até a seção
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Adicionar efeito visual temporário ao link clicado
                navLinks.forEach(l => l.style.color = '');
                link.style.color = 'var(--color-primary)';

                // Voltar cor normal após 2 segundos
                setTimeout(() => {
                    link.style.color = '';
                }, 1000);
            }
        });
    });

    // ========================================
    // ADICIONAR ANIMAÇÃO CSS DINAMICAMENTE
    // ========================================

    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animated {
        animation: fadeIn 0.5s ease-out;
    }
`;
    document.head.appendChild(style);

    // ========================================
    // FILTRAR MEMBROS POR FUNÇÃO
    // ========================================

    document.querySelector('#search').addEventListener('input', () => {
        const searchValue = document.querySelector('#search').value;
        const memberCard = document.querySelectorAll('.team-member');

        memberCard.forEach(member => {
            if(member.textContent.toLowerCase().includes(searchValue.toLowerCase())) {
                member.style.display = 'block';
            } else {
                member.style.display = 'none';
            }
        });
    });
});
