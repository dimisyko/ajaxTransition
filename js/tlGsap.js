/* Leave timeline */
export function homeLeave() {
	return new Promise((resolve) => {
		const tlLeave = gsap.timeline()
		tlLeave.to('#red', {
            opacity : 0,
			duration: 1,
            onComplete: function () {
				resolve()
			},
		})
	})
}
export function aboutLeave() {
	return new Promise((resolve) => {
		const tlLeave = gsap.timeline()
		tlLeave.to('.txt', {
			x: '50%',
			opacity: 0,
			duration: 1,
		}, "same")
        tlLeave.to('.image', {
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            ease : Power2.easeInOut,
			duration: 1,
		}, "same")
        tlLeave.to('.bg', {
            y : "0%",
            ease : Power3.easeInOut,
			duration: 1,
            onComplete: function () {
				resolve()
			},
		})
	})
}

/* Enter timeline */
export function homeEnter() {
	const tlEnter = gsap.timeline()
	tlEnter.from('.txt', {
		y: '-100%',
		duration: 1,
	}, "same")
    tlEnter.from('.image', {
        clipPath: "polygon(0% 0, 0% 0, 0% 100%, 0% 100%)",
        ease : Power2.easeInOut,
        duration: 1
    }, "same")
}

export function aboutEnter() {
	const tlEnter = gsap.timeline()
	tlEnter.from('.txt', {
        opacity : 0,
        duration: 1.5,
    })
}
