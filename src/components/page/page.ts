import { BaseComponent } from '../component.js';

export class PageComponent extends BaseComponent<HTMLUListElement> {
	constructor() {
		const html = `<ul class='page'>This is UL Component</ul>`;
		super(html);
	}
}
