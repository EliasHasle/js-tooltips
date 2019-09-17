class Tooltip extends HTMLParagraphElement {
	constructor(tooltips={}, style={}) {
		super();
		const defaultStyle = {
			display: "none",
			position: "absolute",
			top: "52vh",
			left: "4vw",
			padding: "2px",
			"z-index": "100",
			width: "60vw",
			height: "auto",
			//overflow: "visible",
			"font-size": "4vh",
			"font-face": "bold",
			"font-family": "sans-serif",
			"background-color": "rgba(0.17,0.17,0.17,0.8)",//#2C2C2C
			color: "white",
			"border-left": "2px solid #2FA1D6",
			"pointer-events": "none"
		};
		
		Object.assign(this.style, defaultStyle, style);
		this.styleBackup = {};
		Object.assign(this.styleBackup, this.style);
		
		this.tooltips = tooltips;
		this.tooltipIsEmptyError = false;
	}
	
	clear() {
		this.style.display = "none";
		if (this.tooltipTimeout !== undefined) {
			clearTimeout(this.tooltipTimeout);
		}
		this.tooltipTimeout = undefined;
	}
	
	show(s, time=6000) {
		if (s in this.tooltips) {
			tip = this.tooltips[s];
		} else if (s==="Emptyset") {
			this.tooltipIsEmptyError = true;
		} else {
			tip = {text: "s"}
			this.tooltips[s] = tip;
		}
		
		if (this.tooltipTimeout !== undefined) {
			this.clear();
		}
		
		this.innerHTML = tip.text;
		this.style = {};
		Object.assign(this.style, this.styleBackup);
		if (tip.style) {
			Object.assign(this.style, tip.style);
		}
		this.style.display = "block";
		this.tooltipTimeout = setTimeout(this.clear.bind(this), time);
	}
}

customElements.define("tooltip", Tooltip, {extends: "p"});