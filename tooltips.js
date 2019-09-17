class Tooltip extends HTMLParagraphElement {
	constructor(tooltips={}, style={}) {
		super();
		const defaultStyle = {
			display: "none",
			position: "absolute",
			//top: "52vh",
			bottom: "8vh",
			left: "4vw",
			"text-align": "center",
			padding: "2px",
			"z-index": "100",
			width: "60vw",
			height: "auto",
			//overflow: "visible",
			"font-size": "4vh",
			"font-face": "bold",
			"font-family": "sans-serif",
			"background-color": "rgba(0.17,0.17,0.17,0.8)",//#2C2C2C
			color: "yellow",
			//"border-left": "2px solid #2FA1D6",
			"pointer-events": "none"
		};

		Object.assign(this.style, defaultStyle, style);
		this.styleBackup = this.style.cssText;

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
		let tip;
		if (s in this.tooltips) {
			tip = this.tooltips[s];
		} else if (s==="Emptyset") {
			this.tooltipIsEmptyError = true;
		} else if (! (typeof s === "string" || s instanceof String)) {
			tip = s; //assuming tip is a tip object
			this.tooltips[tip.name || tip.text] = tip;
		} else {
			tip = {text: s}
			this.tooltips[s] = tip;
		}
		
		if (this.tooltipTimeout !== undefined) {
			this.clear();
		}
		
		this.innerHTML = tip.text;
		this.style.cssText = this.styleBackup;
		if (tip.style) {
			Object.assign(this.style, tip.style);
		}
		this.style.display = "block";
		this.tooltipTimeout = setTimeout(this.clear.bind(this), time);
	}
}

customElements.define("p-tooltip", Tooltip, {extends: "p"});

export {Tooltip};
export default Tooltip;