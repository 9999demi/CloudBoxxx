class Circle {
	constructor(x, y, width, height) {
		this.x = x
		this.y = y
		this.r = Math.random() * 10
		this._mx = Math.random()
		this._my = Math.random()
		this.width = width
		this.height = height
	}
	drawCircle(ctx) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
		ctx.fillStyle = 'rgba(204, 204, 204, 0.3)'
		ctx.fill()
		ctx.closePath()
	}
	drawLine(ctx, _circle) {
		let dx = this.x - _circle.x
		let dy = this.y - _circle.y
		let d = Math.sqrt(dx * dx + dy * dy)
		if (d < 70) {
			ctx.beginPath()
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(_circle.x, _circle.y)
			//ctx.strokeStyle = 'rgba(204, 204, 204, 0.5)'
			//ctx.strokeStyle = 'rgba(64, 224, 208, 0.5)'
			ctx.strokeStyle = 'rgba(147, 112, 219, 0.5)'
			
			ctx.stroke()
			ctx.closePath()
		}
	}
	move() {
		this._mx = (this.x < this.width && this.x > 0) ? this._mx : (-this._mx)
		this._my = (this.y < this.height && this.y > 0) ? this._my : (-this._my)
		this.x += this._mx
		this.y += this._my
	}
}

export default Circle

