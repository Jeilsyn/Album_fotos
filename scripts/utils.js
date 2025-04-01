document.addEventListener('DOMContentLoaded', function() {
    // Configuración del carrusel
    const carousel = document.getElementById('carousel');
    const audio = document.getElementById('audio');
    const lyrics = document.getElementById('lyrics');
    const totalImages = 35;
    let currentIndex = 0;
    let autoPlayInterval;

    // Datos de las letras
    const lyricsData = [
        { text: "Dame tu dedo índice, ponlo detrás de mi oído", time: 21 },
        { text: "Dime, ¿sientes el latido?", time: 27 },
        { text: "Tantas personas llegaron, pero nadie con tu estilo", time: 32 },
        { text: "Eres un laberinto", time: 37 },
        { text: "Mi manantial, mi voz, mi ritmo, mi raíz", time: 40 },
        { text: "Mi rato de felicidad", time: 44 },
        { text: "Devoto, por la eternidad, a ti,", time: 45},
        { text: "a ti", time: 51 },
        { text: "Estórbame, moléstame,", time: 55 },
        { text: "por na' dejo de quererte", time: 56},
        { text: "Eres tan especial,", time: 61 },
        { text: "tú eres tan especial", time: 62 },
        { text: "Te amo,", time: 65 },
        { text: "ya tengo rato,", time: 67 },
        { text: "pero no quería apresurarlo", time: 71 },
        { text: "Obsesionado,", time: 72 },
        { text: "tanto que quiero pedir por tu mano", time: 75 },
        { text: "Vernos casados, agarrados", time: 77 },
        { text: "En el vals, tomando la champaña que tanto odiamos", time: 80 },
        { text: "Y mirarnos a los ojos profundos y nunca más incomodarnos", time: 85 },
        { text: "Porque somos pareja perfecta desde que lo iniciamos", time: 90 },
        { text: "De novatos, como legos tú y yo embonamos", time: 96 },
        { text: "Somos extraños, de tantas maneras, tú y yo empatamos", time: 97 },
        { text: "Somos extraños, de tantas maneras, tú y yo empatamos", time: 100 },
        { text: "Te amo", time: 113 },
        { text: "Te amo", time: 120 }
    ];
    // Inicializar el carrusel
    function initializeCarousel() {
        if (!carousel) return;
        
        carousel.innerHTML = '';
        
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'indicators';
        
        for (let i = 0; i < totalImages; i++) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'carousel-item';
            
            const img = document.createElement('img');
            img.src = `./images/img_${i}.jpg`;
            img.alt = `Imagen ${i + 1}`;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.objectFit = 'contain';
            
            imgContainer.appendChild(img);
            carousel.appendChild(imgContainer);
            
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.dataset.index = i;
            indicator.addEventListener('click', () => goToImage(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        const controls = document.querySelector('.controls');
        if (controls) {
            controls.parentNode.insertBefore(indicatorsContainer, controls.nextSibling);
        }
        
        updateCarousel();
    }

    //Mover las fotos del carrusel en función de la dirección
    function rotateCarousel(direction) {
        currentIndex = (currentIndex + direction + totalImages) % totalImages;
        updateCarousel();
    }

        //Al hacer click en un control llamamos a esta funcion 
    function goToImage(index) {
        currentIndex = index;
        updateCarousel();
    }

    //Actualizamos el carrusel ante algun cambio 

    function updateCarousel() {
        if (!carousel) return;
        
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        const counter = document.getElementById('counter');
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${totalImages}`;
        }
    }

    //Actualizamos letras
    function updateLyrics() {
        if (!audio || !lyrics) return;
        
        const time = Math.floor(audio.currentTime);
        const currentLine = lyricsData.find(
            line => time >= line.time && time < line.time + 6
        );

        if (currentLine) {
            const fadeInDuration = 0.5;
            const opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);
            lyrics.style.opacity = opacity;
            lyrics.textContent = currentLine.text;
        } else {
            lyrics.style.opacity = 0;
        }
    }

    //Carrusel cuando para y cuando empieza 
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            rotateCarousel(1);
        }, 3000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    //Audio
    function startAudio() {
        audio.volume = 0.7;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                lyrics.textContent = "EMMMMMMMMMM--->Click anywhere to start music";
                lyrics.style.opacity = 1;
                document.body.addEventListener('click', () => {
                    audio.play();
                    lyrics.style.opacity = 0;
                }, { once: true });
            });
        }
    }

    initializeCarousel();
    startAutoPlay();
    startAudio();
    
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    setInterval(updateLyrics, 1000);

    window.rotateCarousel = rotateCarousel;
});