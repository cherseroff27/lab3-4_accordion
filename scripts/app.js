const burgerMenu = document.querySelector('.mnu-button__menu')
if (burgerMenu) {
    const menuBackground = document.querySelector('.main-menu-background')
    const mainMenu = document.querySelector('.main-menu')

    burgerMenu.addEventListener('click', menu => {
        burgerMenu.classList.toggle('active')

        if (burgerMenu.classList.contains('active')) {
            lenis.stop()
            menuBackground.classList.add('active')
            mainMenu.classList.add('active')
        } else {
            lenis.start()
            menuBackground.classList.remove('active')
            mainMenu.classList.remove('active')
        }
    })
}

gsap.utils.toArray('[data-parallax-wrapper]').forEach(container => {
    const img = container.querySelector('[data-parallax-target]')

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            scrub: true,
        }
    })

    tl.fromTo(img, {
        yPercent: -15,
        ease: 'none'
    }, {
        yPercent: 15,
        ease: 'none'
    })
})

const accordionCol = document.querySelectorAll('.accordion__col')

function isMobile() {
    return window.innerWidth <= 767.98
}

// Функция для активации карточки
function activateAccordionItem(element) {
    accordionCol.forEach(c => {
        c.classList.remove('active')
    })
    element.classList.add('active')
}

if (isMobile()) {
    function updateActiveOnScroll() {
        const windowCenter = window.innerHeight / 2
        let closestElement = null
        let minDistance = Infinity

        accordionCol.forEach(col => {
            const rect = col.getBoundingClientRect()
            const elementCenter = rect.top + rect.height / 2
            const distance = Math.abs(windowCenter - elementCenter)
            
            // Учитываем только видимые элементы
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (distance < minDistance) {
                    minDistance = distance
                    closestElement = col
                }
            }
        })

        if (closestElement) {
            accordionCol.forEach(c => c.classList.remove('active'))
            closestElement.classList.add('active')
        }
    }

    // Запускаем при скролле
    window.addEventListener('scroll', updateActiveOnScroll)
    // И при загрузке
    updateActiveOnScroll()
} else {
    // Для десктопа - оставляем hover
    accordionCol.forEach(col => {
        col.addEventListener('mouseenter', () => {
            accordionCol.forEach(c => {
                c.classList.remove('active')
                col.classList.add('active')
            })
        })
    })
}

// accordionCol.forEach(col => {
//     col.addEventListener('mouseenter', () => {
//         accordionCol.forEach(c => {
//             c.classList.remove('active')
//             col.classList.add('active')
//         })
//     })
// })

// accordionCol.forEach(col => {
//     if (isMobile()) {
//         col.addEventListener('click', () => {
//             accordionCol.forEach(c => {
//                 if (c === col) {
//                     c.classList.add('active')
//                 } else {
//                     c.classList.remove('active')
//                 }
//             })
//         })
//     } else {
//         col.addEventListener('mouseenter', () => {
//             accordionCol.forEach(c => {
//                 c.classList.remove('active')
//                 col.classList.add('active')
//             })
//         })
//     }
// })

// window.addEventListener('resize', () => {
//     accordionCol.forEach(col => {
//         const newCol = col.cloneNode(true)
//         col.parentNode.replaceChild(newCol, col)
//     })
    
//     location.reload()
// })

const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

function globalGradient() {
    const interBubble = document.querySelector('.interactive')

    let curX = 0, curY = 0, tgX = 0, tgY = 0

    function move() {
        curX += (tgX - curX) / 20 
        curY += (tgY - curY) / 20

        gsap.set(interBubble, {
            x: Math.round(curX),
            y: Math.round(curY)
        })

        requestAnimationFrame(() => {
            move()
        })
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX
        tgY = event.clientY
    })

    move()
}

globalGradient()

    