import Circle from './circle.js'

module.exports = {
	draw_background: function() {
		console.log("drawing")
		const query = uni.createSelectorQuery()
		query.select('#myCanvas')
		  .fields({ node: true, size: true })
		  .exec((res) => {
			const canvas = res[0].node
			const ctx = canvas.getContext('2d')
			const sysInfo = uni.getSystemInfoSync()
			const dpr = sysInfo.pixelRatio
			canvas.width = res[0].width * dpr
			canvas.height = res[0].height * dpr
			ctx.scale(dpr, dpr)
				
			let circles = []
			let width = sysInfo.windowWidth
			let height = sysInfo.windowHeight
			let num = 50
			
			for (let i = 0; i < num; i++) {
			    let circle = new Circle(Math.random() * width, Math.random() * height, width, height)
			    circles.push(circle)
			}
			function draw(num) {
				ctx.clearRect(0, 0, width, height)
				for (let i = 0; i < num; i++) {
					circles[i].drawCircle(ctx)
					for (let j = i + 1; j < num; j++) {
						circles[i].drawLine(ctx, circles[j])
					}
					circles[i].move()
				}
			}
			setInterval(()=> {
				draw(num)
			}, 33)
		 })
	}
}