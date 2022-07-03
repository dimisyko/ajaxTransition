import { homeLeave, aboutLeave, homeEnter, aboutEnter } from './tlGsap.js'

(function transitionPage() {
	eventClk()
	window.addEventListener('load', enterPage)

	function eventClk() {
		document.addEventListener('click', (e) => {
			let el = e.target
			while (el && !el.href) {
				el = el.closest('a')
			}
			if (el.getAttribute('href').indexOf("mailto:") > -1) return
			if (el) {
				e.preventDefault()
				window.history.pushState('', '', el.getAttribute('href'))
				ajax(el.getAttribute('href'))
			}
		})
	}

	function enterPage() {
		const currentContent = document.querySelector('.content')
		const dataPage = currentContent.getAttribute('data-page')
		switch (dataPage) {
			case 'home':
				homeEnter()
				break
			case 'about':
				aboutEnter()
			default:
				break
		}
	}

	async function leavePage(newContent) {
		const dataNextPage = newContent.getAttribute('data-page')
		document.querySelector('section').style.pointerEvents = 'none'
		switch (dataNextPage) {
			case 'home':
				await homeLeave()
				break
			case 'about':
				await aboutLeave()
				break
		}
	}

	window.addEventListener('popstate', (e) => {
		ajax(e.state)
	})

	function ajax(url) {
		const div = {
			app: document.querySelector('.app'),
			content: document.querySelector('.content'),
		}
		let xml = new XMLHttpRequest()
		xml.open('GET', url, true)
		xml.addEventListener('load', async function () {
			if (this.status === 200 && this.readyState === 4) {
				const dom = new DOMParser().parseFromString(this.response, 'text/html')
				await leavePage(dom.querySelector('.content'))

				document.title = dom.title
				div.content.remove()
				div.app.appendChild(dom.querySelector('.content'))
				document.querySelector('section').style.pointerEvents = 'auto'
				enterPage()
			} else {
				window.location.reload()
			}
		})
		xml.setRequestHeader('Accept', 'text/html')
		xml.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
		xml.setRequestHeader('Pragma', 'no-cache')
		xml.setRequestHeader('Expires', '0')
		xml.send()
	}
})()
