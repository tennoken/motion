import { InputDialog } from './components/dialog/dialog.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import {
	Composable,
	PageComponent,
	PageItemComponent,
} from './components/page/page.js';

class App {
	private readonly page: PageComponent & Composable;
	constructor(appRoot: HTMLElement) {
		this.page = new PageComponent(PageItemComponent);
		this.page.attachTo(appRoot);

		const image = new ImageComponent(
			'Image Title',
			'https://picsum.photos/600/300'
		);
		this.page.addChild(image);

		const youtube = new VideoComponent(
			'Youtube Video',
			'https://www.youtube.com/embed/80xMeEOBu0Q'
		);
		this.page.addChild(youtube);

		const note = new NoteComponent('Note', 'Description');
		this.page.addChild(note);

		const todo = new TodoComponent('Todo', 'Driving a car');
		this.page.addChild(todo);

		const imageBtn = document.querySelector(
			'#new-image'
		)! as HTMLButtonElement;
		imageBtn.addEventListener('click', () => {
			console.info('imageBtn clicked');
			const dialog = new InputDialog();

			dialog.setOnCloseListener(() => {
				dialog.removeFrom(document.body);
			});

			dialog.setOnSubmitListener(() => {
				dialog.removeFrom(document.body);
			});

			dialog.attachTo(document.body);
		});
	}
}

new App(document.querySelector('.document')! as HTMLElement);
