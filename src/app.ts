import { TextSectionInput } from './components/dialog/input/text-input.js';
import {
	InputDialog,
	MediaData,
	TextData,
} from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import {
	Composable,
	PageComponent,
	PageItemComponent,
} from './components/page/page.js';
import { Component } from './components/component.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
	new (): T;
};
class App {
	private readonly page: PageComponent & Composable;
	constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
		this.page = new PageComponent(PageItemComponent);
		this.page.attachTo(appRoot);

		this.bindElementToDialog<MediaSectionInput>(
			'#new-image',
			MediaSectionInput,
			(input: MediaSectionInput) =>
				new ImageComponent(input.title, input.url)
		);

		this.bindElementToDialog<MediaSectionInput>(
			'#new-video',
			MediaSectionInput,
			(input: MediaSectionInput) =>
				new VideoComponent(input.title, input.url)
		);

		this.bindElementToDialog<TextSectionInput>(
			'#new-note',
			TextSectionInput,
			(input: TextSectionInput) =>
				new NoteComponent(input.title, input.body)
		);

		this.bindElementToDialog<TextSectionInput>(
			'#new-todo',
			TextSectionInput,
			(input: TextSectionInput) =>
				new TodoComponent(input.title, input.body)
		);

		// demo
		this.page.addChild(
			new ImageComponent('Image', 'https://picsum.photos/600/300')
		);

		this.page.addChild(new NoteComponent('Note', 'Note Component'));

		this.page.addChild(
			new ImageComponent('Image2', 'https://picsum.photos/600/300')
		);
		this.page.addChild(
			new VideoComponent('Note', 'https://youtu.be/w2UrmIbd5Ow')
		);
		this.page.addChild(
			new ImageComponent('Image3', 'https://picsum.photos/600/300')
		);
		this.page.addChild(new TodoComponent('Note', 'Study Typescript'));
	}

	private bindElementToDialog<T extends (MediaData | TextData) & Component>(
		selector: string,
		InputComponent: InputComponentConstructor<T>,
		makeSection: (input: T) => Component
	) {
		const element = document.querySelector(selector)! as HTMLButtonElement;
		element.addEventListener('click', () => {
			const dialog = new InputDialog();
			const inputSection = new InputComponent();
			dialog.addChild(inputSection);
			dialog.attachTo(this.dialogRoot);

			dialog.setOnCloseListener(() => {
				dialog.removeFrom(this.dialogRoot);
			});

			dialog.setOnSubmitListener(() => {
				const todo = makeSection(inputSection);
				this.page.addChild(todo);
				dialog.removeFrom(this.dialogRoot);
			});
		});
	}
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
