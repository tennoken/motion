import { BaseComponent } from '../../component.js';

export class NoteComponent extends BaseComponent<HTMLElement> {
	constructor(title: string, description: string) {
		super(`<section class="note">
                <h2 class="note__title"></h3>
                <p class="note__description"></p>
            </section>`);
		const noteTitle = this.element.querySelector(
			'.note__title'
		)! as HTMLHeadingElement;
		noteTitle.textContent = title;

		const noteDescription = this.element.querySelector(
			'.note__description'
		)! as HTMLParagraphElement;
		noteDescription.textContent = description;
	}
}
