import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent } from './components/page/page.js';

class App {
	private readonly page: PageComponent & Composable;
	constructor(appRoot: HTMLElement) {
		this.page = new PageComponent();
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
	}
}

new App(document.querySelector('.document')! as HTMLElement);
