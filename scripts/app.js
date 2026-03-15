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

if (isMobile()) {
    function updateActiveOnScroll() {
        const windowCenter = window.innerHeight / 2
        let closestElement = null
        let minDistance = Infinity
        
        let isAtTop = false
        let isAtBottom = false
        
        if (window.scrollY < 100) {
            isAtTop = true
        }
        
        const lastAccordionItem = accordionCol[accordionCol.length - 1]
        const lastItemRect = lastAccordionItem.getBoundingClientRect()
        if (lastItemRect.bottom <= window.innerHeight) {
            isAtBottom = true
        }
        
        if (isAtTop) {
            accordionCol.forEach(c => c.classList.remove('active'))
            accordionCol[0].classList.add('active')
            return
        }
        
        if (isAtBottom) {
            accordionCol.forEach(c => c.classList.remove('active'))
            accordionCol[accordionCol.length - 1].classList.add('active')
            return
        }

        accordionCol.forEach(col => {
            const rect = col.getBoundingClientRect()
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const elementCenter = rect.top + rect.height / 2
                const distance = Math.abs(windowCenter - elementCenter)
                
                const adjustedDistance = distance * (1 - (rect.top / window.innerHeight) * 0.3)
                
                if (adjustedDistance < minDistance) {
                    minDistance = adjustedDistance
                    closestElement = col
                }
            }
        })

        if (closestElement) {
            accordionCol.forEach(c => c.classList.remove('active'))
            closestElement.classList.add('active')
        }
    }

    let isScrolling = false
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveOnScroll()
                isScrolling = false
            })
            isScrolling = true
        }
    })

    window.addEventListener('resize', updateActiveOnScroll)
    
    updateActiveOnScroll()
    
    setTimeout(updateActiveOnScroll, 100)
} else {
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

    