import { BaseComponent, Component } from '../component.js';

export interface Composable {
	addChild(child: Component): void;
}

interface SectionContainer extends Component, Composable {
	setOnCloseListener(listener: onCloseListener): void;
	setOnDragStateListener(
		listener: onDragStateListener<SectionContainer>
	): void;
}

type SectionContainerConstructor = {
	new (): SectionContainer;
};

type onCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type onDragStateListener<T extends Component> = (
	target: T,
	state: DragState
) => void;

export class PageItemComponent
	extends BaseComponent<HTMLElement>
	implements SectionContainer
{
	private closeListener?: onCloseListener;
	private dragStateListener?: onDragStateListener<PageItemComponent>;
	constructor() {
		super(`<li class="page-item" draggable="true">
				<section class="page-item__body"></section>
					<div class="page-item__controls">
						<button class="close">&times;</button>
					</div>
			</li>`);
		const closeBtn = this.element.querySelector(
			'.close'
		)! as HTMLButtonElement;
		closeBtn.onclick = () => {
			this.closeListener && this.closeListener();
		};

		this.element.addEventListener('dragstart', (event: DragEvent) => {
			this.onDragStart(event);
		});

		this.element.addEventListener('dragend', (event: DragEvent) => {
			this.onDragEnd(event);
		});
		this.element.addEventListener('dragenter', (event: DragEvent) => {
			this.onDragEnter(event);
		});

		this.element.addEventListener('dragleave', (event: DragEvent) => {
			this.onDragLeave(event);
		});
	}

	onDragStart(_: DragEvent) {
		this.notifyDragObservers('start');
	}

	onDragEnd(_: DragEvent) {
		this.notifyDragObservers('stop');
	}

	onDragEnter(_: DragEvent) {
		this.notifyDragObservers('enter');
	}

	onDragLeave(_: DragEvent) {
		this.notifyDragObservers('leave');
	}

	notifyDragObservers(state: DragState) {
		this.dragStateListener && this.dragStateListener(this, state);
	}

	addChild(child: Component) {
		const container = this.element.querySelector(
			'.page-item__body'
		)! as HTMLElement;
		child.attachTo(container);
	}

	setOnCloseListener(listener: onCloseListener) {
		this.closeListener = listener;
	}

	setOnDragStateListener(listener: onDragStateListener<PageItemComponent>) {
		this.dragStateListener = listener;
	}
}

export class PageComponent
	extends BaseComponent<HTMLUListElement>
	implements Composable
{
	constructor(private pageItemConstructor: SectionContainerConstructor) {
		super(`<ul class='page'></ul>`);

		this.element.addEventListener('dragover', (event: DragEvent) => {
			this.onDragOver(event);
		});

		this.element.addEventListener('drop', (event: DragEvent) => {
			this.onDrop(event);
		});
	}

	onDragOver(event: DragEvent) {
		event.preventDefault();
		console.log('onDragOver');
	}

	onDrop(event: DragEvent) {
		event.preventDefault();
		console.log('onDrop');
	}

	addChild(section: Component) {
		const item = new this.pageItemConstructor();
		item.addChild(section);
		item.attachTo(this.element, 'beforeend');
		item.setOnCloseListener(() => {
			item.removeFrom(this.element);
		});
		item.setOnDragStateListener(
			(target: SectionContainer, state: DragState) => {
				console.log(target, state);
			}
		);
	}
}
