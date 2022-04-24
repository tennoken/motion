import { BaseComponent } from '../../component.js';

export class ImageComponent extends BaseComponent<HTMLImageElement> {
	constructor(title: string, url: string) {
		super(`<section class="image">
        			<div class="image__holder">
						<img class="image__thumbnail" />
						<p class="image__title"></p>
        			</div>
				</section>`);
		const imageElement = this.element.querySelector(
			'.image__thumbnail'
		)! as HTMLImageElement;
		imageElement.src = url;
		imageElement.alt = title;

		const textElement = this.element.querySelector(
			'.image__title'
		)! as HTMLParagraphElement;
		textElement.textContent = title;
	}
}
